(function () {
	//// circle graphs dynamically update with percentage that is entered in the text
	var circleWrapper = document.getElementsByClassName('circle-graphics-wrapper');
	var circleArr = [];
	for (var i = 0; i < circleWrapper.length; i++) {
		circleArr.push(circleWrapper[i]);
	}

	circleArr.forEach(function (e) {
		var percent = parseFloat(e.lastElementChild.textContent);
		var circle = e.children[0].lastElementChild;
		circle.style.strokeDasharray = percent + " 100";
	});
}());
