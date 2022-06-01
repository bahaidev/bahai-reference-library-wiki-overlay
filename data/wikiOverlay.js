const jamilihSource = browser.runtime.getURL(
  '/data/vendor/jamilih/jml-es-noinnerh.js'
);
const tippySource = browser.runtime.getURL(
  '/data/vendor/tippy.js/tippy.esm.js'
);
const getSitesSource = browser.runtime.getURL(
  '/data/getSites.js'
);

(async () => {
const [
  {$, jml, nbsp},
  {default: tippy},
  {getSites}
] = await Promise.all([
  jamilihSource,
  tippySource,
  getSitesSource
].map((source) => {
  // eslint-disable-next-line no-unsanitized/method -- Own files
  return import(source);
}));

const {sites, Site} = await getSites();

const fontSize = '9pt';

const createLink = (href, empty, name, styles) => {
  return jml(
    'a', {
      href,
      className: 'brl-injected-link',
      target: '_blank',
      style: {
        fontSize,
        color: empty ? 'orange' : 'blue',
        textDecoration: 'underline',
        ...styles
      }
    }, [
      name
    ]
  );
};

const createLinkForSite = async (siteInstance, container) => {
  const href = await siteInstance.getCurrentURL(container);
  if (!href) {
    return null;
  }
  const empty = siteInstance.isMissingCurrent(container);
  return createLink(href, empty, siteInstance.name);
};

/**
 * @param {Node} container
 * @returns {Promise<void>}
 */
async function addTitleLinks (container) {
  if (await Site.isHidden()) {
    return;
  }
  /**
   *
   * @param {string} text
   * @returns {void}
   */
  const addSpan = (text) => {
    jml('span', {
      style: {fontSize}
    }, [
      text
    ], titleHolder);
  };

  // e.g., https://www.bahai.org/library/authoritative-texts/bahaullah/
  const titleHolder = Site.getCurrentTitleHolder(container);

  // Hasn't loaded yet but observer should catch
  if (!titleHolder) {
    return;
  }

  addSpan(`${nbsp} ${nbsp} ${nbsp} `);

  const siteLinks = (await Promise.all(sites.map(async (site, i) => {
    if (site.isHidden()) {
      return null;
    }

    return await createLinkForSite(site, container);
  }))).filter(Boolean);

  const itemsPerLine = 5;
  siteLinks.forEach((siteLink, i) => {
    if (i !== 0) {
      titleHolder.append(nbsp.repeat(2));
    }
    if (!(i % itemsPerLine)) {
      titleHolder.append(document.createElement('br'));
    }
    titleHolder.append(siteLink);
  });

  // addSpan(')');
}

/**
 * @param {Node} container
 * @returns {Promise<void>}
 */
async function addAnchorLinks (container) {
  const anchorHolders = Site.getCurrentAnchorHolders(container);
  if (await Site.isHidden()) {
    return;
  }

  const [
    anchorLinksHidden,
    anchorLinkIframesHidden
  ] = await Promise.all([
    Site.areAnchorLinksHidden(),
    Site.areAnchorLinkIframesHidden()
  ]);

  const anchorLinks = (await Promise.all(sites.map(async (site, i) => {
    if (
      site.isHidden() ||
      !site.currentWorkByVerseSupport() || anchorLinksHidden
    ) {
      return null;
    }

    const anchorLink = await site.getCurrentAnchorBaseURL(container);

    return await Promise.all([
      anchorLink,
      site.name
    ]);
  }))).filter(Boolean);

  const anchors = anchorHolders?.map((anchorHolder) => {
    // Also set these (just once)
    anchorHolder.style.marginLeft = '-30px';
    anchorHolder.style.minHeight = '120px';
    anchorHolder.style.minWidth = '65px';

    return anchorHolder.textContent;
  });

  anchorLinks.forEach(([anchorLink, siteName], i) => {
    anchorHolders.forEach((anchorHolder, j) => {
      const {backgroundColor} = anchorHolder.style;
      const url = anchorLink + anchors[j];
      const a = createLink(
        url,
        // We could detect if individual paragraphs are missing, but may
        //  be a lot of work, so for now, we only enable if placeholders are
        //  known to be present
        false,
        siteName,
        {
          backgroundColor,
          backgroundSize: '0', // Causes some white outline to show
          // textDecoration: 'none';
          // border: 'none',
          display: 'block',
          color: 'white',
          // position: 'relative',
          // left: '-4px',
          top: '10px',
          padding: '5px'
          // overflow: 'visible',
        }
      );
      a.addEventListener('click', (e) => {
        // Don't prevent default (we want to go to the link), but
        //  don't fire the default copy-text tooltip when clicking
        //  our link
        e.stopPropagation();
      });

      anchorHolder.append(a);

      if (!anchorLinkIframesHidden) {
        a.dataset.tippyContent = `
          <iframe style="width: 700px; height: 500px; z-index: 9999; opacity: 1;
            background-color: ${
  // backgroundColor
  'white'
  }" src="${url}"></iframe>`;

        a.addEventListener('mouseover', () => {
          a.$activated = true;
          a._tippy.enable();
        });

        a.addEventListener('mouseout', () => {
          a.$activated = false;
        });

        tippy(a, { // '[data-tippy-content]', {
          // Was otherwise not triggering
          zIndex: 999999,
          triggerTarget: anchorHolder,
          // eslint-disable-next-line object-shorthand -- Closure
          onTrigger: (inst) => {
            if (inst.reference.$activated && inst.reference.href === url) {
              inst.enable();
            } else {
              inst.disable();
            }
          },
          // For iframe
          allowHTML: true,
          // Show, hide delay
          delay: [300, 1000],
          // Allow hovering on tooltip's own contents to avoid hiding
          interactive: true,
          offset: [0, 0],
          placement: 'right'
        });
      }
    });
  });
}

await Promise.all([
  addTitleLinks(),
  addAnchorLinks()
]);

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((addedNode) => {
        // New Ajax load (as opposed to our own insertions)
        if (addedNode.dataset?.fragment) {
          addTitleLinks(addedNode);
          addAnchorLinks(addedNode);
        }
      });
    }
  }
});

const target = $('.library-document-content');
if (target) {
  observer.observe(target, {
    // attibutes: true,
    childList: true,
    subtree: true
  });
}
})();
