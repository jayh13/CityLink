
// Create the Vue.js application
var app = new Vue({
	el: '#page-main',
	data: {
		'order': {
			'servicetype': '',
			'serviceaddress': 'Unknown',
			'serviceaddressID': '',
			'firstname': '',
			'lastname': '',
			'email': '',
			'phone': '',
			'utilitynumber': '',
			'internet': {
				'status': 'unordered',
			},
			'cable': {
				'status': 'unordered',
			},
			'phone': {
				'status': 'unordered',
			}
		},
		'services': undefined,
		'state': {
			'residenceCheckboxField': false,
			'commercialCheckboxField': false,
			'nonProfitCheckboxField': false,
			'signupServiceListInternet': true,
			  'serviceOptionStatusSelectedInternet': false,
			  'serviceOptionStatusInternet': true,
			  'serviceItemIntroInternet': true,
			  'bandwidthCalculator': true,
			  'serviceItemOptionsInternet': true,
			  'serviceItemFooterInternet': true,
			  'packageSelectInternet': false,
			'signupServiceListCable': false,
			  'serviceOptionStatusSelectedCable': false,
			  'serviceOptionStatusCable': true,
			  'serviceItemIntroCable': true,
			  'serviceItemOptionsCable': true,
			  'serviceItemFooterCable': true,
			  'packageSelectCable': false,
			'signupServiceListPhone': false,
			  'serviceOptionStatusSelectedPhone': false,
			  'serviceOptionStatusPhone': true,
			  'serviceItemIntroPhone': true,
			  'serviceItemOptionsPhone': true,
			  'serviceItemFooterPhone': true,
			  'packageSelectPhone': false,
			'signupServiceBundleFourSavings': false,
				'bfsItemLayout2ColInternet': false,
				'bfsItemLayout2ColCable': false,
				'bfsItemLayout2ColPhone': false,
			'signupServiceReviewYourRequest': false,
			'signupServiceSignMeUp': false,
				'smuContentForm': false
		},
		'stateOld': {
			'signupServiceListInternet': 'block',
			  'serviceOptionStatusSelectedInternet': 'none',
			  'serviceOptionStatusInternet': 'block',
			  'serviceItemIntroInternet': 'block',
			  'bandwidthCalculator': 'block',
			  'serviceItemOptionsInternet': 'block',
			  'serviceItemFooterInternet': 'block',
			  'packageSelectInternet': 'none',
			'signupServiceListCable': 'none',
			  'serviceOptionStatusSelectedCable': 'none',
			  'serviceOptionStatusCable': 'block',
			  'serviceItemIntroCable': 'block',
			  'serviceItemOptionsCable': 'block',
			  'serviceItemFooterCable': 'flex',
			  'packageSelectCable': 'none',
			'signupServiceListPhone': 'none',
			  'serviceOptionStatusSelectedPhone': 'none',
			  'serviceOptionStatusPhone': 'block',
			  'serviceItemIntroPhone': 'block',
			  'serviceItemOptionsPhone': 'block',
			  'serviceItemFooterPhone': 'flex',
			  'packageSelectPhone': 'none',
			'signupServiceBundleFourSavings': 'none',
				'bfsItemLayout2ColInternet': 'none',
				'bfsItemLayout2ColCable': 'none',
				'bfsItemLayout2ColPhone': 'none',
			'signupServiceReviewYourRequest': 'none',
			'signupServiceSignMeUp': 'none',
				'smuContentForm': 'none',
		},
		'workingOn': undefined
	},
	beforeCreate: function() {
		// Add the Vue.js attributes. We could do this in the WebFlow interface but it's so clicky
		document.querySelector('input#Residence').setAttribute('v-model','state.residenceCheckboxField');
		document.querySelector('input#Residence').setAttribute('v-on:click','changeServiceRequestType');
		document.querySelector('input#Commercial').setAttribute('v-model','state.commercialCheckboxField');
		document.querySelector('input#Commercial').setAttribute('v-on:click','changeServiceRequestType');
		document.querySelector('input#Non-Profit').setAttribute('v-model','state.nonProfitCheckboxField');
		document.querySelector('input#Non-Profit').setAttribute('v-on:click','changeServiceRequestType');
		document.querySelector('.signup-service-list-internet').setAttribute('v-show', 'state.signupServiceListInternet');
		document.querySelector('.service-option-status-selected-internet').style.display = 'block';
		document.querySelector('.service-option-status-selected-internet').setAttribute('v-show', 'state.serviceOptionStatusSelectedInternet');
		document.querySelector('.service-option-status-internet').setAttribute('v-show', 'state.serviceOptionStatusInternet');
		document.querySelector('.service-item-intro-internet').setAttribute('v-show', 'state.serviceItemIntroInternet');
		document.querySelector('.bandwidth-calculator').setAttribute('v-show', 'state.bandwidthCalculator');
		document.querySelector('.service-item-options-internet').setAttribute('v-show', 'state.serviceItemOptionsInternet');
		document.querySelector('.service-item-footer-internet').setAttribute('v-show', 'state.serviceItemFooterInternet');
		document.querySelector('.package-select-internet').setAttribute('v-show', 'state.packageSelectInternet');
		document.querySelector('.signup-service-list-cable').setAttribute('v-show', 'state.signupServiceListCable');
		document.querySelector('.service-option-status-selected-cable').style.display = 'block';
		document.querySelector('.service-option-status-selected-cable').setAttribute('v-show', 'state.serviceOptionStatusSelectedCable');
		document.querySelector('.service-option-status-cable').setAttribute('v-show', 'state.serviceOptionStatusCable');
		document.querySelector('.service-item-intro-cable').setAttribute('v-show', 'state.serviceItemIntroCable');
		document.querySelector('.service-item-options-cable').setAttribute('v-show', 'state.serviceItemOptionsCable');
		document.querySelector('.service-item-footer-cable').setAttribute('v-show', 'state.serviceItemFooterCable');
		document.querySelector('.package-select-cable').setAttribute('v-show', 'state.packageSelectCable');
		document.querySelector('.signup-service-list-phone').setAttribute('v-show', 'state.signupServiceListPhone');
		document.querySelector('.service-option-status-selected-phone').style.display = 'block';
		document.querySelector('.service-option-status-selected-phone').setAttribute('v-show', 'state.serviceOptionStatusSelectedPhone');
		document.querySelector('.service-option-status-phone').setAttribute('v-show', 'state.serviceOptionStatusPhone');
		document.querySelector('.service-item-intro-phone').setAttribute('v-show', 'state.serviceItemIntroPhone');
		document.querySelector('.service-item-options-phone').setAttribute('v-show', 'state.serviceItemOptionsPhone');
		document.querySelector('.service-item-footer-phone').setAttribute('v-show', 'state.serviceItemFooterPhone');
		document.querySelector('.package-select-phone').setAttribute('v-show', 'state.packageSelectPhone');
		document.querySelector('.signup-service-bundle-for-savings').setAttribute('v-show', 'state.signupServiceBundleForSavings');
		document.querySelector('.bfs-item-layout-2-col-internet').setAttribute('v-show', 'state.bfsItemLayout2ColInternet');
		document.querySelector('.bfs-item-layout-2-col-cable').setAttribute('v-show', 'state.bfsItemLayout2ColCable');
		document.querySelector('.bfs-item-layout-2-col-phone').setAttribute('v-show', 'state.bfsItemLayout2ColPhone');
		document.querySelector('.signup-service-review-your-request').setAttribute('v-show', 'state.signupServiceReviewYourRequest');
		document.querySelector('.signup-service-sign-me-up').setAttribute('v-show', 'state.signupServiceSignMeUp');
		document.querySelector('.smu-content-form').setAttribute('v-show', 'state.smuContentForm');
		
	},
	created: function() {
		// Get the command line parameters
		var internet = this.getUrlParameter('internet');
		var cable = this.getUrlParameter('cable');
		var phone = this.getUrlParameter('phone');
		var srvtype = this.getUrlParameter('AccountType');
		if (srvtype === 'Residential' || srvtype === '') {
			this.order.servicetype = 'residence';
			srvtype = 'Residential';
		} else if (srvtype === 'Commercial' || srvtype === 'Industrial') {
			this.order.servicetype = 'commercial';
			srvtype = 'Commercial';
		} else if (srvtype === 'Non-Profit') { // Will never happen
			this.order.servicetype = 'nonprofit';
		} else {
			this.order.servicetype = 'residence';
			srvtype = 'Residential';
		}
		this.changeServiceRequestType({ 'target': { 'name': srvtype } });
		
		this.order.serviceaddressID = this.getUrlParameter('PMCentralServiceAddressID');
		if (this.getUrlParameter('address') !== '')
			this.order.serviceaddress = this.getUrlParameter('address');
		if (internet) {
			this.ShowInternet();
		} else if (cable) {
			this.ShowCable();
		} else if (phone) {
			this.ShowPhone();
		} else {
			this.ShowNone();
		}
	},
	mounted: function() {
		axios
			.get('https://jayh13.github.io/CityLink/citylinkserviceplans.json')
			.then(response => (this.services = response.data));
	},
	computed: {
		isBundled: function() {
			var cnt = 0;
			if (this.order.internet.status !== 'unordered')
				cnt++;
			if (this.order.cable.status !== 'unordered')
				cnt++;
			if (this.order.phone.status !== 'unordered')
				cnt++;
			if (cnt > 1)
				return true;
			else
				return false;
		}
	},
	methods: {
		ShowInternet: function() {
			this.order.internet.status = 'inProgress';
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered' };
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered' };
			this.ShowHide();
		},
		ShowCable: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered' };
			this.order.cable.status = 'inProgress';
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered' };
			this.ShowHide();
		},
		ShowPhone: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered' };
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered' };
			this.order.phone.status = 'inProgress';
			this.ShowHide();
		},
		ShowNone: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered' };
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered' };
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered' };
			this.ShowHide();
		},
		ShowHide: function() {
			// Internet default
			this.state.signupServiceListInternet = false;
			this.state.serviceOptionStatusSelectedInternet = true;
			this.state.serviceOptionStatusInternet = false;
			this.state.serviceItemIntroInternet = false;
			this.state.bandwidthCalculator = false;
			this.state.serviceItemOptionsInternet = false;
			this.state.serviceItemFooterInternet = false;
			this.state.packageSelectInternet = false;
			// Cable default
			this.state.signupServiceListCable = false;
			this.state.serviceOptionStatusSelectedCable = true;
			this.state.serviceOptionStatusCable = false;
			this.state.serviceItemIntroCable = false;
			this.state.serviceItemOptionsCable = false;
			this.state.serviceItemFooterCable = false;
			this.state.packageSelectCable = false;
			// Phone default
			this.state.signupServiceListPhone = false;
			this.state.serviceOptionStatusSelectedPhone = true;
			this.state.serviceOptionStatusPhone = false;
			this.state.serviceItemIntroPhone = false;
			this.state.serviceItemOptionsPhone = false;
			this.state.serviceItemFooterPhone = false;
			this.state.packageSelectPhone = false;
			// Review and signup default
			this.state.signupServiceBundleFourSavings = true;
			this.state.bfsItemLayout2ColInternet = true;
			this.state.bfsItemLayout2ColCable = true;
			this.state.bfsItemLayout2ColPhone = true;
			this.state.signupServiceReviewYourRequest = false;
			this.state.signupServiceSignMeUp = false;
			this.state.smuContentForm = false;
			// Internet status
			if (this.order.internet.status === 'ordered') {
				this.state.signupServiceListInternet = true;
				this.state.packageSelectInternet = true;
				this.state.bfsItemLayout2ColInternet = false;
			} else if (this.order.internet.status === 'inProgress') {
				this.state.signupServiceListInternet = true;
				this.state.serviceOptionStatusSelectedInternet = false;
				this.state.serviceOptionStatusInternet = true;
				this.state.serviceItemIntroInternet = true;
				this.state.bandwidthCalculator = true;
				this.state.serviceItemOptionsInternet = true;
				this.state.serviceItemFooterInternet = true;
				this.state.signupServiceBundleFourSavings = false;
			} else if (this.order.internet.status === 'unordered') {
			} else if (this.order.internet.status === 'notAvailable') {
			} else {
				throw "The order internet status is invalid.";
			}
			// Cable status
			if (this.order.cable.status === 'ordered') {
				this.state.signupServiceListCable = true;
				this.state.packageSelectCable = true;
				this.state.bfsItemLayout2ColCable = false;
			} else if (this.order.cable.status === 'inProgress') {
				this.state.signupServiceListCable = true;
				this.state.serviceOptionStatusSelectedCable = false;
				this.state.serviceOptionStatusCable = true;
				this.state.serviceItemIntroCable = true;
				this.state.serviceItemOptionsCable = true;
				this.state.serviceItemFooterCable = true;
				this.state.signupServiceBundleFourSavings = false;
			} else if (this.order.cable.status === 'unordered') {
			} else if (this.order.cable.status === 'notAvailable') {
			} else {
				throw "The order Cable status is invalid.";
			}
			// Phone status
			if (this.order.phone.status === 'ordered') {
				this.state.signupServiceListPhone = true;
				this.state.packageSelectPhone = true;
				this.state.bfsItemLayout2ColPhone = false;
			} else if (this.order.phone.status === 'inProgress') {
				this.state.signupServiceListPhone = true;
				this.state.serviceOptionStatusSelectedPhone = false;
				this.state.serviceOptionStatusPhone = true;
				this.state.serviceItemIntroPhone = true;
				this.state.serviceItemOptionsPhone = true;
				this.state.serviceItemFooterPhone = true;
				this.state.signupServiceBundleFourSavings = false;
			} else if (this.order.phone.status === 'unordered') {
			} else if (this.order.phone.status === 'notAvailable') {
			} else {
				throw "The order Phone status is invalid.";
			}
			// Review and signup status
			if (this.order.internet.status !== 'inProgress' &&
					this.order.internet.status !== 'inProgress' &&
					this.order.internet.status !== 'inProgress' &&
					(this.order.internet.status === 'ordered' ||
					 this.order.internet.status === 'ordered' ||
					 this.order.internet.status === 'ordered')) {
				this.state.signupServiceReviewYourRequest = true;
				this.state.signupServiceSignMeUp = true;
			}
		},
		changeServiceRequestType: function(e) {
			var name = e.target.name;
			// Clear the order or skip if they clicked on an already checked box
			if (name.toLowerCase() !== this.order.servicetype) {
				this.order.servicetype = name.toLowerCase();
				this.order.internet = { 'status': 'unordered' };
				this.order.cable = { 'status': 'unordered' };
				this.order.phone = { 'status': 'unordered' };
			} else {
				e.preventDefault();
				return;
			}
			// Uncheck others and don't allow unchecking
			if (name === 'Residence') {
				this.state.residenceCheckboxField = true;
				this.state.commercialCheckboxField = false;
				this.state.nonProfitCheckboxField = false;
			} else if (name === 'Commercial') {
				this.state.residenceCheckboxField = false;
				this.state.commercialCheckboxField = true;
				this.state.nonProfitCheckboxField = false;
			} else if (name === 'Non-Profit') {
				this.state.residenceCheckboxField = false;
				this.state.commercialCheckboxField = false;
				this.state.nonProfitCheckboxField = true;
			}
		},
		
		
		// Utility functions
		getUrlParameter: function(name) {
			name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
			var results = regex.exec(location.search);
			return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
		}
	}
})

// The calculator doesn't use Vue.js, it's vanilla javascript
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

