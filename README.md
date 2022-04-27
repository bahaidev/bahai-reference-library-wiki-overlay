# Bahá'í Reference Library Overlay

Browser add-on to overlay the official
[Bahá'í Reference Library site](https://bahai.org/library)
with links back to collaboratively editable
wiki pages (at <https://bahai9.com>, <https://bahaipedia.org>,
<https://wikipedia.org>, and <https://bahai.works>) as well as
linking to <https://bahai-library.com/tags> and
<https://bahai-browser.org/indexes/json/>.

The wikis allow compilation of quotations and resources pertaining to any
given work. Next to the heading title of each work are links which, when
clicked, will visit the page dedicated to collecting resources for the given
book (authoritative quotations and resources, Bahá'í encyclopedic,
public encyclopedic, or source text, tags leading to chronological or
scholarly publication, and index entries, respectively).

Where available, even individual paragraphs can be clicked to visit a wiki
page dedicated to that specific paragraph (at present, this functionality
is only available for:

- The Kitáb-i-Aqdas
- The Kitáb-i-Íqan
- The Hidden Words

Per paragraph links only lead to <https://bahai9.com> (which provides links
to topical compilation pages or provides other background on the verse in
question) and to <https://bahai-browser.org/indexes/json/> (the indexes in the
back of printed Bahá'í books).

Currently works for English only. Volunteers to localize are most welcome,
especially for Persian (given the site content being in English and Persian).

This add-on is an individual initiative, not sponsored by any Bahá'í
administrative institution.

## Rationale for manual tracking of pages

Note that there is a file, `Writings-map.js` which manually keeps track of
which items at <http://reference.bahai.org> have corresponding wiki pages.
Although the code ought to have been more maintainable if we were to make
HTTP HEAD requests or use the Mediawiki API to detect whether a page had
been created or not, this would have added undue burdens on the servers,
especially when the finite number of pages (at least till now!) could
easily be tracked. But this does periodically require updates since
we have not created and cannot or do not wish to create stub pages
on all of the wikis when the content is not yet ready.

## History

The older incarnation of this add-on worked in Firefox as well as Chrome,
but it ceased working at least for the latest browsers, and in all likelihood
because the old site (<http://reference.bahai.org>) was migrating parts of its
content to the new site (<http://bahai.org/library>).

Older browser add-on packages can be found at
<http://brett-zamir.me/brl-wiki-overlay/>, e.g.:

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/bahai-reference-library-wik/)
- [Chrome](https://chrome.google.com/webstore/detail/bahai-reference-library-w/bkcdagjannmhhlapolphnjojbfgckgjc/related?hl=en)
- [Safari](http://brett-zamir.me/brl-wiki-overlay/brl-wiki-overlay.safariextz)
- [Opera](https://addons.opera.com/en/extensions/details/bahai-reference-library-wiki-overlay/?display=en)

Information is also available at <https://bahai-library.com/zamir_brl_wiki_overlay>.

## Local testing

1. `git clone git@github.com:brettz9/bahai-reference-library-wiki-overlay.git`
2. Go to `chrome://extensions/`
3. Click "Load unpacked" and choose the `bahai-reference-library-wiki-overlay`
    directory
4. Try out:
    1. The toolbar icon (if not visible, click on the Jigsaw puzzle piece
        icon). Try the search and the "jump to page"
    2. Go to https://bahai.org/library and after visiting some pages, see the
        links at the top.
    3. Go to the main Kitáb-i-Aqdas paragraphs, and see the per-paragraph links
        on the left hand side which can be clicked or hovered over for a
        popup iframe view. You may have to wait a few seconds to see them.

## Todos

1. Update add-ons to use `WebExtensions`.
    1. Populate missing, redirects, etc. per group
    2. Submit to add-ons site

## Lower-priority to-dos

1. Get localized into Persian
1. Option to hide specific sites
1. Could create wiki links for documents without paragraph numbers
    (including the opening line ones) just by ID and an auto-number
1. We might add links for Bahá'u'lláh, 'Abdu'l-Bahá, Shoghi Effendi,
    etc. at the top of their respective pages.
1. Add `bahai.media`?
1. If adding Q&A site, perhaps add links to that. Add tags, indexes?
1. Update <http://brett-zamir.me/brl-wiki-overlay/> per release.
