//Hamburger Nav Toggle

(function () {
	var navToggle = document.getElementById('nav-toggle');

	if (navToggle) {
		navToggle.onclick = function () {
			// console.log("there is a nav toggle");
			document.querySelector("body").classList.toggle('nav--open');
		}
	}
}());
