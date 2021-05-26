(function () {
	/////// bar graphs update dynamically as content updates. First bar represents 100%, the rest are
	////// what percent their value is in relation to this
	var progressBars = document.getElementsByClassName('graph-progress-bar');
	if ($('.graph-progress-bar,progress-bar').is(':visible')) {
		var barArr = [];
		for (var j = 0; j < progressBars.length; j++) {
			barArr.push(progressBars[j]);
		}
		var highestValue = barArr[0].textContent.slice(1, -1);
		barArr.forEach(function (bar) {
			var width = Math.round(bar.textContent.slice(1, -1) / highestValue * 100);
			bar.style.width = width + "%";
		});
	}
}());
