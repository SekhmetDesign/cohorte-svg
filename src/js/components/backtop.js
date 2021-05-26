//Back to top function
// --source: https://codyhouse.co/ds/components/info/back-to-top

(function () {
	var backTop = document.getElementsByClassName('js-back-to-top')[0];

	if (backTop) {
		document.getElementsByClassName('js-back-to-top').onclick = function () {
			document.documentElement.scrollTop = 0;
		}
	}
}());
