// Order data
var order = {
	"servicetype": "",
	"serviceaddress": "",
	"firstname": "",
	"lastname": "",
	"email": "",
	"phone": "",
	"utilitynumber": "",
	"internet": undefined,
	"cable": undefined,
	"phone": undefined
}
// Service plan availability
var services = {
	"internet": {
		"plans": [
			{
				"id": 20,
				"title": "Connect 20",
				"download": 20,
				"upload": 2,
				"residence": {
					"price": 25,
					"bundledprice": 21
				},
				"commercial": {
					"isavailable": false,
					"price": 27,
					"bundledprice": 23
				},
				"non-profit": {
					"price": 26,
					"bundledprice": 22
				},
				"description": "Perfect for light browsing and managing email.",
				"options": []
			},
			{
				"id": 60,
				"title": "Connect 60",
				"download": 60,
				"upload": 3,
				"residence": {
					"price": 39,
					"bundledprice": 35
				},
				"commercial": {
					"price": 41,
					"bundledprice": 37
				},
				"non-profit": {
					"price": 40,
					"bundledprice": 36
				},
				"description": "Excellent for light video streaming, moderate browsing and digital phone service.",
				"options": []
			},
			{
				"id": 100,
				"title": "Connect 100",
				"download": 100,
				"upload": 5,
				"residence": {
					"price": 59,
					"bundledprice": 55,
					"isMostPopular": true
				},
				"commercial": {
					"price": 61,
					"bundledprice": 57,
					"description": "Great for small home office and light video conferencng."
				},
				"non-profit": {
					"price": 60,
					"bundledprice": 56
				},
				"description": "Great for moderate streaming and gaming, browsing, and digital phone service.",
				"options": []
			},
			{
				"id": 150,
				"title": "Connect 150",
				"download": 150,
				"upload": 10,
				"residence": {
					"price": 79,
					"bundledprice": 75
				},
				"commercial": {
					"price": 81,
					"bundledprice": 77
				},
				"non-profit": {
					"price": 80,
					"bundledprice": 76,
					"isMostPopular": true
				},
				"description": "The best option for those with few internet connected devices.",
				"options": []
			},
			{
				"id": 250,
				"title": "Connect 250",
				"download": 250,
				"upload": 15,
				"residence": {
					"price": 89,
					"bundledprice": 85

				},
				"commercial": {
					"price": 91,
					"bundledprice": 87

				},
				"non-profit": {
					"price": 90,
					"bundledprice": 86
				},
				"description": "Optimized for streaming HD and 4K. Great for families with lots of internet connected devices.",
				"options": []
			},
			{
				"id": 500,
				"title": "Connect 500",
				"download": 500,
				"upload": 25,
				"residence": {
					"price": 99,
					"bundledprice": 95
				},
				"commercial": {
					"price": 101,
					"bundledprice": 97,
					"isMostPopular": true
				},
				"non-profit": {
					"price": 100,
					"bundledprice": 96
				},
				"description": "The ultimate solution for people or families who stream most home entertainment.",
				"options": []
			},
		],
		"options": [
		
		]
	},
	"cable": {
		"plans": [
			
		],
		"options": [
		
		]
	}
	"phone": {
		"plans": [
			
		],
		"options": [
			
		]
	}
};



// Set up the service request type
var srv1 = document.querySelector("#Non-Profit");
var srv2 = document.querySelector("#Commercial");
var srv3 = document.querySelector("#Residence");
srv1.addEventListener('click', changeServiceRequestType);
srv2.addEventListener('click', changeServiceRequestType);
srv3.addEventListener('click', changeServiceRequestType);
if (srv1.checked) {
	srv1.click();
} else if (srv2.checked) {
	srv2.click();
} else {
	srv3.click();
}

// Handler for service request type change, reinitialize everything
function changeServiceRequestType(e) {
	var srv = e.target;
	order = {
		"servicetype": srv.name.toLowerCase(),
		"internet": undefined,
		"cable": undefined,
		"phone": undefined
	};
	var srv1 = document.querySelector("#Non-Profit");
	var srv2 = document.querySelector("#Commercial");
	var srv3 = document.querySelector("#Residence");
	srv1.checked = false;
	srv2.checked = false;
	srv3.checked = false;
	srv.checked = true;
	initInternet(srv);
	initCable(srv);
	initPhone(srv);
}

function initInternet(srv) {
	var srvName = srv.name.toLowerCase()
	var dataPlanLength = services.internet.plans.length;
	var plansAvailable = 0;
	var serviceOptions = document.querySelectorAll(".service-options-internet > .service-option-item");
	for (var i = 0; i < serviceOptions.length; i++) {
		var itm = serviceOptions[i];
		if (i >= dataPlanLength) {
			itm.style.display = "none";
			continue;
		}
		var plan = services.internet.plans[i];
		// Is plan available
		var ret = getPlanAttribute(plan, srvName, "isavailable");
		if (ret === false) {
			itm.style.display = "none";
			continue;
		}
		plansAvailable++;
		itm.style.display = "flex";
		// Set title
		ret = getPlanAttribute(plan, srvName, "title");
		if (ret === undefined) {
			throw "All plans must have a title.";
		} else {
			itm.setAttribute("data-plan", ret);
			itm.querySelector(".service-option-title").innerHTML = ret;
		}
		// Set the download and upload speed
		var lst = itm.querySelectorAll(".service-option-specs-list-item > strong");
		ret = getPlanAttribute(plan, srvName, "download");
		if (ret !== undefined)
			lst[0].innerHTML = ret;
		ret = getPlanAttribute(plan, srvName, "upload");
		if (ret !== undefined)
			lst[1].innerHTML = ret;
		// Set the description
		ret = getPlanAttribute(plan, srvName, "description");
		if (ret !== undefined)
			itm.querySelector(".service-option-description").innerHTML = ret;
		// Set the price
		ret = getPlanAttribute(plan, srvName, "price");
		var ret2 = getPlanAttribute(plan, srvName, "bundledprice");
		if (order.cable === undefined && order.phone === undefined) {
			itm.querySelector(".rate-cost-amount-figure").innerHTML = ret;
			itm.querySelector(".rate-cost-subinfo-details").innerHTML = "Details";
			itm.querySelector(".service-option-rate-notice").style.display = "flex";
		}
		else {
			itm.querySelector(".rate-cost-amount-figure").innerHTML = ret2;
			itm.querySelector(".rate-cost-subinfo-details").innerHTML = "Bundeled";
			itm.querySelector(".service-option-rate-notice").style.display = "none";
		}
		// Set the most popular
		ret = getPlanAttribute(plan, srvName, "isMostPopular");
		if (ret !== undefined && ret === true)
			itm.querySelector(".service-option-preferred").style.display = "block";
		else
			itm.querySelector(".service-option-preferred").style.display = "none";
		// Link up the event handler
		itm.addEventListener('click', internetpkgselected);
	}	
	
	// Update the number of options displayed in the title
	document.querySelector(".service-option-status-number").innerHTML = plansAvailable;
	if (theval === 1)
		document.querySelector(".service-option-status-plural").style.display = "none";
	else
		document.querySelector(".service-option-status-plural").style.display = "inline-block";
}

function initCable(srv) {
	
}

function initPhone(srv) {
	
}

function getPlanAttribute(plan, srvName, attribute) {
	if (attribute === "residence" || attribute === "commercial" || attribute === "non-profit")
		throw "The attribute can not be a service name.";
	if (plan === undefined)
		throw "The plan doesn't exist";
	if (srvName in plan && attribute in plan[srvName])
		return plan[srvName][attribute];
	if (attribute in plan)
		return plan[attribute];
	return undefined;
	
	// if (plan[attribute] === undefined &&
	// 		(plan[srvName] === undefined ||
	// 		 plan[srvName][attribute] === undefined))
	// 	return undefined;
	// if (plan[srvName] !== undefined && plan[srvName][attribute] !== undefined)
	// 	return plan[srvName][attribute];
	// else
	// 	return plan[attribute];
}

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
	
	// Set the recomendation block
	var recomendationDiv = document.querySelector(".bc-report-plan-title");
	for (var i = 0; i < services.internet.plans.length; i++) {
		if ((services.internet.plans[i].download >= dialvalue[0] && 
				services.internet.plans[i].upload >= dialvalue[1]) ||
				(i === (services.internet.plans.length - 1))) {
			recomendationDiv.innerHTML = 'CityLink ' + services.internet.plans[i].title;
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

// Select an internet package
function internetpkgselected(e) {
	order.internet = {
		"plan": e.target.getAttribute("data-plan")
	}
	// Update the address label
	document.querySelector(".service-option-status-selected").style.display = "inline-block";
	document.querySelector(".service-option-status").style.display = "none"; // ?
	// document.querySelector(".service-option-status-number").style.display = "none";
	// document.querySelector(".service-option-status-type").style.display = "none";
	// document.querySelector(".service-option-status-text").style.display = "none";
	// document.querySelector(".service-option-status-plural").style.display = "none";
	// document.querySelector(".service-option-status-selected").style.display = "none";
	// document.querySelector(".service-option-status-selected").style.display = "none";
	
	// Hide the plan selection area
	document.querySelector(".service-item-intro").style.display = "none"; // "block"
	document.querySelector(".service-item-header").style.display = "none"; // "flex"
	// Show the selected plan area
	
	// Updated the selected plan area with this plan
	
	// Hide the upgrade plans that are slower
	
	// Update the upgrade plans with the upgrade cost
	
	// Display the equipmment options
	
	// Update the order summary
	updateOrderSummary();
}

function updateOrderSummary() {
	
}