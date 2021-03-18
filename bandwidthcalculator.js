window.addEventListener("load", function(){

	// Wire up the Get Started button
	var calcBody = document.querySelector(".bc-body");
	calcBody.style.overflow = "hidden";
	calcBody.style.transitionProperty = "opacity, max-height";
	calcBody.style.transitionDuration = "200ms, 1000ms";
	calcBody.style.transitionTimingFunction = "ease, ease";
	var getStartedBtn = document.querySelector(".bc-header-button");
	var theNewGetStartedBtn = getStartedBtn.cloneNode(true);
	getStartedBtn.parentNode.replaceChild(theNewGetStartedBtn, getStartedBtn);
	getStartedBtn = theNewGetStartedBtn;
	getStartedBtn.addEventListener('click', function(e) {
		var calcBody = document.querySelector(".bc-body");
		if (calcBody.style.maxHeight !== "2000px") {
			calcBody.style.maxHeight = "2000px";
		} else {
			calcBody.style.maxHeight = "0px";
		}
	});

	// Initialize our data model for the dials
	var dials = [];
	var speedos = document.querySelectorAll(".bc-report-meter");
	for (var i = 0; i < speedos.length; i++) {
		var aSpeedo = speedos[i];
		var theval = parseInt(aSpeedo.getAttribute('data-value'));
		var themin = parseInt(aSpeedo.getAttribute('data-min'));
		var themax = parseInt(aSpeedo.getAttribute('data-max'));
		var thedial_bar = aSpeedo.querySelector(".bc-report-meter-bar");
		var thedial_num = aSpeedo.querySelector(".bc-report-meter-value");
		dials.push({
			value: theval,
			min: themin,
			max: themax,
			dial: aSpeedo,
			dial_bar: thedial_bar,
			dial_num: thedial_num
		});
		thedial_num.innerHTML = theval;
	}

	// Initialize our data model for the buttons
	var btns = document.querySelectorAll(".bc-control-item");
	for (var j = 0; j < btns.length; j++) {
		var aBtn = btns[j];
		var theval = parseInt(aBtn.getAttribute('data-value'));
		if (theval < 0)
			throw "Error: A speedo button can't have a negative starting value";
		if (!aBtn.getAttribute('data-initvalue'))
			aBtn.setAttribute('data-initvalue', theval);
		var themin = parseInt(aBtn.getAttribute('data-min'));
		if (theval < themin)
			throw "Error: A speedo button has a starting value below it's min value";
		var themax = parseInt(aBtn.getAttribute('data-max'));
		if (theval > themax)
			throw "Error: A speedo button has a starting value greater than it's max value";

		// Remove old event listeners in case this gets reran
		var minus = aBtn.querySelector(".bc-minus-button");
		var clone = minus.cloneNode(true);
		minus.parentNode.replaceChild(clone, minus);
		minus = clone;
		minus.addEventListener('click', DialItDown);

		var plus = aBtn.querySelector(".bc-plus-button");
		clone = plus.cloneNode(true);
		plus.parentNode.replaceChild(clone, plus);
		plus = clone;
		plus.addEventListener('click', DialItUp);
		
		if (theval > 0) {
			aBtn.setAttribute('data-value', 0);
			for (var k = 0; k < theval; k++) {
				plus.click();
			}
		}
		aBtn.querySelector(".bc-counter-text").innerHTML = theval;
	}

	// Init the reset button
	var theResetBtn = document.querySelector(".bc-calculator-reset");
	var theNewResetBtn = theResetBtn.cloneNode(true);
	theResetBtn.parentNode.replaceChild(theNewResetBtn, theResetBtn);
	theResetBtn = theNewResetBtn;
	theResetBtn.addEventListener('click', function(e) {
		var btns = document.querySelectorAll(".bc-control-item");
		for (var p = 0; p < btns.length; p++) {
			var aBtn = btns[p];
			var theval = parseInt(aBtn.getAttribute('data-value'));
			var theinitval = parseInt(aBtn.getAttribute('data-initvalue'));
			if (theval < theinitval) {
				for (var q = theval; q < theinitval; q++) {
					aBtn.querySelector(".bc-plus-button").click();
				}
			} else if (theval > theinitval) {
				for (var r = theval; r > theinitval; r--) {
					aBtn.querySelector(".bc-minus-button").click();
				}
			}
		}
	})

	// **** Event handlers ***
	function DialItDown(e) {
		e = event || window.event;
		var elem = e.target || e.srcElement;
		var thespeedo_button = elem.parentElement.parentElement.parentElement;
		var theval = parseInt(thespeedo_button.getAttribute('data-value'));
		var themin = parseInt(thespeedo_button.getAttribute('data-min'));
		if (theval == themin)
			throw "ERROR: You cannot go below the min count for this item.";
		var thechange_values = JSON.parse(thespeedo_button.getAttribute('data-change_values'));
		for (var i = 0; i < thechange_values.length; i++) {
			thechange_values[i] = thechange_values[i] * -1;
		}
		//var thecounterid = thespeedo_button.querySelector(".bc-counter-text").id;
		DialIt(thechange_values, thespeedo_button);
		thespeedo_button.setAttribute('data-value', theval - 1);
	}

	function DialItUp(e) {
		e = event || window.event;
		var elem = e.target || e.srcElement;
		var thespeedo_button = elem.parentElement.parentElement.parentElement;
		var theval = parseInt(thespeedo_button.getAttribute('data-value'));
		var themax = parseInt(thespeedo_button.getAttribute('data-max'));
		if (theval == themax)
			throw "ERROR: You have exceeded the max count for this item.";
		var thechange_values = JSON.parse(thespeedo_button.getAttribute('data-change_values'));
		//var thecounterid = thespeedo_button.querySelector(".bc-counter-text").id;
		DialIt(thechange_values, thespeedo_button);
		thespeedo_button.setAttribute('data-value', theval + 1);
	}

	// Change the dials
	function DialIt(dial_changes, thespeedo_button) {
		// Validate
		DialItValidate(dial_changes);

		// Button
		if (!DialItButtonUpdate(dial_changes, thespeedo_button))
			return;

		// Loop through the dials
		var dialvalue = [];
		for (var i = 0; i < dials.length; i++) {
			if (dial_changes[i] !== undefined)
				dialvalue[i] = DialItSpeedoUpdate(dials[i], dial_changes[i]);
		}
		
		// Set the recomendation block, this does reach into the Vue.js data but doesn't
		// manipulate anything in it.
		var recomendationDiv = document.querySelector(".bc-report-plan-title");
		var planLength = app.services.internet.plans.length;
		
		for (var i = 0; i < planLength; i++) {
			if ((app.services.internet.plans[i].download >= dialvalue[0] && 
					app.services.internet.plans[i].upload >= dialvalue[1]) ||
					(i === (app.services.internet.plans.length - 1))) {
				recomendationDiv.innerHTML = 'CityLink ' + app.services.internet.plans[i].title;
				break;
			}
		}
	}

	// Validate the dials change request
	function DialItValidate(dial_changes) {
		var hasPositive = false;
		var hasNegative = false;
		for (var i = 0; i < dial_changes.length; i++) {
			if (dial_changes[i] < 0)
				hasNegative = true;
			else if (dial_changes[i] > 0)
				hasPositive = true;
		}
		if (hasNegative == true && hasPositive == true) {
			alert("ERROR: Dial values cannot change in different directions!");
			throw "ERROR: Dial values cannot change in different directions!";
		}
	}

	// Update the button that was clicked
	function DialItButtonUpdate(dial_changes, thespeedo_button) {
		var btn = thespeedo_button.querySelector(".bc-counter-text");
		var btn_value = parseInt(btn.innerHTML);
		var tot = dial_changes.reduce((a, b) => a + b, 0)
		if (tot < 0)
			btn_value = btn_value - 1;
		else if (tot > 0)
			btn_value = btn_value + 1;
		if (btn_value < 0)
			return false;
		btn.innerHTML = btn_value;
		return true;
	}

	// Update the speedometer dial
	function DialItSpeedoUpdate(dial, dial_change) {
		dial.value = dial.value + dial_change;
		if (dial.value < dial.min) {
			dial.dial_num.innerHTML = dial.value;
			dial.dial_bar.style.transitionDuration = '1s';
			// dial.dial_bar.style.transform = 'rotate(-45deg)';
			dial.dial_bar.style.background = 'linear-gradient(90deg, rgba(27,139,0,1) 0%, rgba(27,139,0,1) 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)';
		} else if (dial.value > dial.max) {
			dial.dial_num.innerHTML = dial.value;
			dial.dial_bar.style.transitionDuration = '1s';
			// dial.dial_bar.style.transform = 'rotate(135deg)';
			dial.dial_bar.style.background = 'linear-gradient(90deg, rgba(27,139,0,1) 0%, rgba(27,139,0,1) 100%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%)';
		} else {
			// var degrees = (((dial.value - dial.min) / dial.max) * 180) - 45;
			var barmid = (((dial.value - dial.min) / dial.max) * 100);
			var barleft = ((barmid - 3) < ((dial.min / dial.max) * 100))? ((dial.min / dial.max) * 100) : barmid - 3;
			var barright = ((barmid + 3) > 100)? 100 : barmid + 3;
			dial.dial_num.innerHTML = dial.value;
			dial.dial_bar.style.transitionDuration = '1s';
			// dial.dial_bar.style.transform = 'rotate(' + degrees + 'deg)';
			dial.dial_bar.style.background = 'linear-gradient(90deg, rgba(27,139,0,1) 0%, rgba(27,139,0,1) ' + barleft + '%, rgba(255,255,255,1) ' + barright + '%, rgba(255,255,255,1) 100%)';
		}
		return dial.value;
	}

});