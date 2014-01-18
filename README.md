Firefox add-on to overlay the official Bahá'í Reference Library site (http://reference.bahai.org) with links back to collaboratively editable wiki pages (at http://bahai9.com, http://bahaikipedia.org, http://wikipedia.org, and http://bahaitext.org) allowing compilation of quotations and resources pertaining to any given work. Next to the heading title of each work are links which, when clicked, will visit the wiki page dedicated to collecting resources for the given book (authoritative quotations and resources, Bahá'í encyclopedic, public encyclopedic, or source text, respectively).

Where available, even individual paragraphs can be clicked to visit a wiki page dedicated to that specific paragraph (at present, this functionality is only available for the Kitáb-i-Aqdas and links only lead to http://bahai9.com which provides links to topical compilation pages or provides other background on the verse in question).

Currently works for English only. Other browser add-on packages can be found at http://brett-zamir.me/brl-wiki-overlay/ .

This add-on is an individual initiative, not sponsored by any Bahá'í administrative institution.

# Rationale for manual tracking of pages
Note that there is a file, Writings-map.js which manually keeps track of which items at http://reference.bahai.org have corresponding wiki pages. Although the code ought to have been more maintainable if we were to make HTTP HEAD requests or use the Mediawiki API to detect whether a page had been created or not, this would have added undue burdens on the servers, especially when the finite number of pages (at least till now!) could easily be tracked. But this does periodically require updates since we have not created and cannot or do not wish to create stub pages on all of the wikis when the content is not yet ready.

# Todos
1. We might add links for Baha'u'llah, 'Abdu'l-Baha, Shoghi Effendi, etc. at the top of their respective pages.
