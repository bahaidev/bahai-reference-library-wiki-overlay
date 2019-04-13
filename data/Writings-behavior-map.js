/*globals baseURL*/

function addParagraphClickListener (data, work) {'use strict';
	var url, baseURLPar = baseURL + work + '/par',
			params = ''; // '?useskin=chick'; // Reenable if we use internal dialog and we can propagate this useskin parameter: see https://stackoverflow.com/questions/14698059/persist-mediawiki-skin-by-url-parameter/14712967

	window.addEventListener('click', function (e) {
		if (e.button === 2 ||
			window.getSelection().toString() !== '') { // User may be trying to copy paste text
			return;
		}

		var el = e.target;
		if (el.className === 'Sparanumber') {
			url = baseURLPar + el.textContent + params;
		}
		else if (['Stext2', 'Sblockquote2', 'Stext2Noindent'].indexOf(el.className) > -1) {
			url = baseURLPar + el.parentNode.previousElementSibling.textContent + params;
		}
		else {
			return;
		}

		window.open(url);
	});
}
var div0, lastURL,
WritingsBehaviorMap = {
	'b/KA': addParagraphClickListener,
	'b/KI': addParagraphClickListener
};
