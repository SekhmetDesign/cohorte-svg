var backtop = require('./components/backtop');
var navtoggle = require('./components/navtoggle');
var graphics = require('./components/graphics');
var progressbar = require('./components/progressbar');
var autocomplete = require('./components/autocomplete');
var svganimation = require('./components/svganimation');

export {
    backtop,
    navtoggle,
    graphics,
    progressbar,
    autocomplete,
    svganimation
}
// The autoComplete.js Engine instance creator
// DOCUMENTATION: https://tarekraafat.github.io/autoComplete.js/#/?id=introduction

// DO NOT FORGET to add the autocomplete.min.js in the HTML template,
//	<script src="public/js/autocomplete.min.js"></script> before the closing </body>
(function () {
	const autoCompletejs = new autoComplete({
		data: {
			src: async () => {
				// Loading placeholder text
				document.querySelector("#autoComplete").setAttribute("placeholder", "Loading...");
				// Fetch External Data Source
				const source = await fetch("https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json");
				const data = await source.json();
				// Returns Fetched data
				return data;
			},
			key: "food"
		},
		placeHolder: "Food & Drinks",
		selector: "#autoComplete",
		threshold: 0,
		searchEngine: "strict",
		highlight: true,
		maxResults: Infinity,
		resultsList: {
			container: source => {
				resultsListID = "autoComplete_results_list";
				return resultsListID;
			},
			destination: document.querySelector("#autoComplete"),
			position: "afterend"
		},
		resultItem: (data, source) => {
			return `${data.match}`;
		},
		onSelection: feedback => {
			const selection = feedback.selection.food;
			// Render selected choice to selection div
			document.querySelector(".selection").innerHTML = selection;
			// Clear Input
			document.querySelector("#autoComplete").value = "";
			// Change placeholder with the selected value
			document.querySelector("#autoComplete").setAttribute("placeholder", selection);
			// Concole log autoComplete data feedback
			// console.log(feedback);
		}
	});

	// On page load add class to input field
	window.addEventListener("load", () => {
		document.querySelector("#autoComplete").classList.add("out");
		document.querySelector("#autoComplete_results_list").style.display = "none";
	});

	// Toggle Search Engine Type/Mode
	document.querySelector(".toggeler").addEventListener("click", () => {
		// Holdes the toggle buttin alignment
		const toggele = document.querySelector(".toggele").style.justifyContent;

		if (toggele === "flex-start" || toggele === "") {
			// Set Search Engine mode to Loose
			document.querySelector(".toggele").style.justifyContent = "flex-end";
			document.querySelector(".toggeler").innerHTML = "Loose";
			autoCompletejs.searchEngine = "loose";
		} else {
			// Set Search Engine mode to Strict
			document.querySelector(".toggele").style.justifyContent = "flex-start";
			document.querySelector(".toggeler").innerHTML = "Strict";
			autoCompletejs.searchEngine = "strict";
		}
	});

	// Toggle results list and other elements
	const action = action => {
		const mode = document.querySelector(".mode");
		const selection = document.querySelector(".selection");

		if (action === "dim") {
			mode.style.opacity = 1;
			selection.style.opacity = 1;
		} else if ("light") {
			mode.style.opacity = 0.2;
			selection.style.opacity = 0.1;
		}
	};

	// Toggle event for search input
	// showing & hidding results list onfocus / blur
	// ["focus", "blur"].forEach(eventType => {
	["focus", "blur", "mousedown", "keydown"].forEach(eventType => {
		const input = document.querySelector("#autoComplete");
		const resultsList = document.querySelector("#autoComplete_results_list");

		document.querySelector("#autoComplete").addEventListener(eventType, event => {
			// Hide results list & show other elemennts
			if (eventType === "blur") {
				action("dim");
			} else if (eventType === "focus") {
				// Show results list & hide other elemennts
				action("light");
			}
		});

		// Hide Results list when not used
		document.addEventListener(eventType, event => {
			var current = event.target;
			if (
				current === input ||
				current === resultsList ||
				input.contains(current) ||
				resultsList.contains(current)
			) {
				resultsList.style.display = "block";
			} else {
				resultsList.style.display = "none";
			}
		});
	});

	// Toggle Input Classes on results list focus to keep style
	["focusin", "focusout", "keydown"].forEach(eventType => {
		document.querySelector("#autoComplete_results_list").addEventListener(eventType, event => {
			if (eventType === "focusin") {
				if (event.target && event.target.nodeName === "LI") {
					action("light");
					document.querySelector("#autoComplete").classList.remove("out");
					document.querySelector("#autoComplete").classList.add("in");
				}
			} else if (eventType === "focusout" || event.keyCode === 13) {
				action("dim");
				document.querySelector("#autoComplete").classList.remove("in");
				document.querySelector("#autoComplete").classList.add("out");
			}
		});
	});
}());

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

// Source for this slider: https://codepen.io/seanstopnik/pen/CeLqA

(function () {

}());

(function () {
    gsap.registerPlugin(ScrollTrigger);
    let speed = 100;

    /*  SCENE 1 */
    let scene1 = gsap.timeline();
    ScrollTrigger.create({
        animation: scene1,
        trigger: ".scrollElement",
        start: "top top",
        end: "45% 100%",
        scrub: 3,
    });

    // hills animation 
    scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0)
    scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0)
    scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03)
    scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03)
    scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03)
    scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0)
    scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0)
    scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0)
    scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0)

    //animate text
    scene1.to("#info", { y: 8 * speed }, 0)



    /*   Bird   */
    gsap.fromTo("#bird", { opacity: 1 }, {
        y: -250,
        x: 800,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "15% top",
            end: "60% 100%",
            scrub: 4,
            onEnter: function() { gsap.to("#bird", { scaleX: 1, rotation: 0 }) },
            onLeave: function() { gsap.to("#bird", { scaleX: -1, rotation: -15 }) },
        }
    })


    /* Clouds  */
    let clouds = gsap.timeline();
    ScrollTrigger.create({
        animation: clouds,
        trigger: ".scrollElement",
        start: "top top",
        end: "70% 100%",
        scrub: 1,
    });

    clouds.to("#cloud1", { x: 500 }, 0)
    clouds.to("#cloud2", { x: 1000 }, 0)
    clouds.to("#cloud3", { x: -1000 }, 0)
    clouds.to("#cloud4", { x: -700, y: 25 }, 0)



    /* Sun motion Animation  */
    let sun = gsap.timeline();
    ScrollTrigger.create({
        animation: sun,
        trigger: ".scrollElement",
        start: "top top",
        end: "2200 100%",
        scrub: 1,
    });

    //sun motion 
    sun.to("#bg_grad", { attr: { cy: "330" } }, 0.00)

    //bg change
    sun.to("#sun", { attr: { offset: "0.15" } }, 0.00)
    sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0.00)
    sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0.00)
    sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0.00)
    sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0.00)
    sun.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#FF9171" } }, 0)



    /*   SCENE 2  */
    let scene2 = gsap.timeline();
    ScrollTrigger.create({
        animation: scene2,
        trigger: ".scrollElement",
        start: "15% top",
        end: "40% 100%",
        scrub: 4,
    });

    scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0)
    scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1)
    scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1)
    scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2)
    scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3)
    scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3)



    /* Bats */
    gsap.fromTo("#bats", { opacity: 1, y: 400, scale: 0 }, {
        y: 120,
        scale: 0.8,
        transformOrigin: "50% 50%",
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "40% top",
            end: "70% 100%",
            scrub: 3,
            onEnter: function() {
                gsap.utils.toArray("#bats path").forEach((item, i) => {
                    gsap.to(item, { scaleX: 0.5, yoyo: true, repeat: 11, duration: 0.15, delay: 0.7 + (i / 10), transformOrigin: "50% 50%" })
                });
                gsap.set("#bats", { opacity: 1 })
            },
            onLeave: function() { gsap.to("#bats", { opacity: 0, delay: 2 }) },
        }
    })


    /* Sun increase */
    let sun2 = gsap.timeline();
    ScrollTrigger.create({
        animation: sun2,
        trigger: ".scrollElement",
        start: "2200 top",
        end: "5000 100%",
        scrub: 1,
    });

    sun2.to("#sun", { attr: { offset: "0.6" } }, 0)
    sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" } }, 0)
    sun2.to("#sun", { attr: { "stop-color": "#ffff00" } }, 0)
    sun2.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" } }, 0)
    sun2.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" } }, 0)
    sun2.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" } }, 0)



    /* Transition (from Scene2 to Scene3) */
    gsap.set("#scene3", { y: 580, visibility: "visible" })
    let sceneTransition = gsap.timeline();
    ScrollTrigger.create({
        animation: sceneTransition,
        trigger: ".scrollElement",
        start: "70% top",
        end: "bottom 100%",
        scrub: 3,
    });

    sceneTransition.to("#h2-1", { y: -680, scale: 1.5, transformOrigin: "50% 50%" }, 0)
    sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.00)
    sceneTransition.to("#bg2", { y: 0 }, 0)



    /* Scene 3 */
    let scene3 = gsap.timeline();
    ScrollTrigger.create({
        animation: scene3,
        trigger: ".scrollElement",
        start: "80% 50%",
        end: "bottom 100%",
        scrub: 3,
    });

    //Hills motion
    scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0)
    scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03)
    scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06)
    scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09)
    scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12)

    //stars
    scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0)

    // Scroll Back text
    scene3.fromTo("#arrow2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.25)
    scene3.fromTo("#text2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.3)

    //gradient value change
    scene3.to("#bg2-grad", { attr: { cy: 600 } }, 0)
    scene3.to("#bg2-grad", { attr: { r: 500 } }, 0)


    /*   falling star   */
    gsap.to("#fstar", {
        x: -700,
        y: -250,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "4000 top",
            end: "6000 100%",
            scrub: 5,
            onEnter: function() { gsap.set("#fstar", { opacity: 1 }) },
            onLeave: function() { gsap.set("#fstar", { opacity: 0 }) },
        }
    })


    //reset scrollbar position after refresh
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    }


    let fullscreen;
    let fsEnter = document.getElementById('fullscr');
    fsEnter.addEventListener('click', function (e) {
    e.preventDefault();
    if (!fullscreen) {
        fullscreen = true;
        document.documentElement.requestFullscreen();
        fsEnter.innerHTML = "Exit Fullscreen";
    }
    else {
        fullscreen = false;
        document.exitFullscreen();
        fsEnter.innerHTML = "Go Fullscreen";
    }
    });
}());


// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.setAttribute("style", "height:"+val+"px;");
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.setAttribute("style", "height:"+start+"px;");
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    window.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};