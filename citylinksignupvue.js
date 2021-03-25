// Create the Vue.js application
var app = new Vue({
	el: '#page-main',
	data: {
		'version': 2,
		'order': {
			'servicecusttype': '',
			'serviceaddress': 'Unknown',
			'serviceaddressID': '',
			'firstname': '',
			'lastname': '',
			'email': '',
			'phonenumber': '',
			'utilitynumber': '',
			'internet': {
				'status': 'unordered',
				'plan': undefined,
				'options': []
			},
			'cable': {
				'status': 'unordered',
				'plan': { 'bullets': [] },
				'options': []
			},
			'phone': {
				'status': 'unordered',
				'plan': { 'bullets': [] },
				'options': []
			}
		},
		'reviewreq': {
			'total': 0,
			'lineitems': [
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false },
				{ 'serviceitem': '', 'price': 0, 'origprice': 0, 'isLineBundled': false }
			]
		},
		'services': {'internet':{'plans':[]},'cable':{'plans':[{'bullets':[]}]},'phone':{'plans':[{'bullets':[]}]}},
		'state': {
			'initialentry': 'internet',
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
			'signupServiceBundleForSavings': false,
				'bfsItemLayout2ColInternet': false,
				'bfsItemLayout2ColCable': false,
				'bfsItemLayout2ColPhone': false,
			'signupServiceReviewYourRequest': false,
			'signupServiceSignMeUp': false,
				'smuContentForm': false
		},
		'workingOn': undefined
	},
	watch: {
		'order.internet.status': function(val) {
			this.ShowHide();
		},
		'order.cable.status': function(val) {
			this.ShowHide();
		},
		'order.phone.status': function (val) {
			this.ShowHide();
		}
	},
	beforeCreate: function() {
		// Add the Vue.js attributes. We could do this in the WebFlow interface but it's so clicky
		// ---------------------------------------------------------------------------------------
		document.querySelector('html').style.scrollBehavior = 'smooth';
		// Service request for: Residence, Commercial Non-Profit checkboxes
		document.querySelector('input#Residence').setAttribute('v-model','state.residenceCheckboxField');
		document.querySelector('input#Residence').setAttribute('v-on:click','changeServiceRequestCustType');
		document.querySelector('input#Commercial').setAttribute('v-model','state.commercialCheckboxField');
		document.querySelector('input#Commercial').setAttribute('v-on:click','changeServiceRequestCustType');
		document.querySelector('input#Non-Profit').setAttribute('v-model','state.nonProfitCheckboxField');
		document.querySelector('input#Non-Profit').setAttribute('v-on:click','changeServiceRequestCustType');
		// -- Entire internet section --
		document.querySelector('.signup-service-list-internet').setAttribute('v-show', 'state.signupServiceListInternet');
		// Internet service for address component pieces
		document.querySelector('.service-option-status-selected-internet').style.display = 'block';
		document.querySelector('.service-option-status-selected-internet').setAttribute('v-show', 'state.serviceOptionStatusSelectedInternet');
		document.querySelector('.service-option-status-internet').setAttribute('v-show', 'state.serviceOptionStatusInternet');
		document.querySelector('.service-option-status-internet > .service-option-status-number').setAttribute('v-html', 'availableInternetPlans');
		document.querySelector('.service-option-status-internet > .service-option-status-plural').setAttribute('v-show', 'availableInternetPlans !== 1');
		// Internet plan selection header, calculator
		document.querySelector('.service-item-intro-internet').setAttribute('v-show', 'state.serviceItemIntroInternet');
		document.querySelector('.bandwidth-calculator').setAttribute('v-show', 'state.bandwidthCalculator');
		// Internet plan selection area
		document.querySelector('.service-item-options-internet').setAttribute('v-show', 'state.serviceItemOptionsInternet');
		// Internet plan selection footer
		document.querySelector('.service-item-footer-internet').setAttribute('v-show', 'state.serviceItemFooterInternet');
		// Internet selected package area with options
		document.querySelector('.package-select-internet').setAttribute('v-show', 'state.packageSelectInternet');
		
		// -- Entire cable section
		document.querySelector('.signup-service-list-cable').setAttribute('v-show', 'state.signupServiceListCable');
		// Cable service for address component pieces
		document.querySelector('.service-option-status-selected-cable').style.display = 'block';
		document.querySelector('.service-option-status-selected-cable').setAttribute('v-show', 'state.serviceOptionStatusSelectedCable');
		document.querySelector('.service-option-status-cable').setAttribute('v-show', 'state.serviceOptionStatusCable');
		document.querySelector('.service-option-status-cable > .service-option-status-number').setAttribute('v-html', 'availableCablePlans');
		document.querySelector('.service-option-status-cable > .service-option-status-plural').setAttribute('v-show', 'availableCablePlans !== 1');
		// Cable plan selection header
		document.querySelector('.service-item-intro-cable').setAttribute('v-show', 'state.serviceItemIntroCable');
		// Cable plan selection area
		document.querySelector('.service-item-options-cable').setAttribute('v-show', 'state.serviceItemOptionsCable');
		// Cable plan selection footer
		document.querySelector('.service-item-footer-cable').setAttribute('v-show', 'state.serviceItemFooterCable');
		// Cable selected package area with options
		document.querySelector('.package-select-cable').setAttribute('v-show', 'state.packageSelectCable');
		
		// -- Entire phone section
		document.querySelector('.signup-service-list-phone').setAttribute('v-show', 'state.signupServiceListPhone');
		// Phone service for address component pieces
		document.querySelector('.service-option-status-selected-phone').style.display = 'block';
		document.querySelector('.service-option-status-selected-phone').setAttribute('v-show', 'state.serviceOptionStatusSelectedPhone');
		document.querySelector('.service-option-status-phone').setAttribute('v-show', 'state.serviceOptionStatusPhone');
		document.querySelector('.service-option-status-phone > .service-option-status-number').setAttribute('v-html', 'availablePhonePlans');
		document.querySelector('.service-option-status-phone > .service-option-status-plural').setAttribute('v-show', 'availablePhonePlans !== 1');
		// Phone plan selection header
		document.querySelector('.service-item-intro-phone').setAttribute('v-show', 'state.serviceItemIntroPhone');
		// Phone plan selection area
		document.querySelector('.service-item-options-phone').setAttribute('v-show', 'state.serviceItemOptionsPhone');
		// Phone plan selection footer
		document.querySelector('.service-item-footer-phone').setAttribute('v-show', 'state.serviceItemFooterPhone');
		// Phone selected package area with options
		document.querySelector('.package-select-phone').setAttribute('v-show', 'state.packageSelectPhone');
		
		// -- Bundle up for savings area -- Add Internet, Add Cable TV, Add Home Phone buttons
		document.querySelector('.signup-service-bundle-for-savings').setAttribute('v-show', 'state.signupServiceBundleForSavings');
		// Bundle up internet
		document.querySelector('.bfs-item-layout-2-col-internet').setAttribute('v-show', 'state.bfsItemLayout2ColInternet');
		document.querySelector('.bfs-item-layout-2-col-internet .w-button').setAttribute('v-on:click','ShowInternet');
		// Bundle up cable
		document.querySelector('.bfs-item-layout-2-col-cable').setAttribute('v-show', 'state.bfsItemLayout2ColCable');
		document.querySelector('.bfs-item-layout-2-col-cable .w-button').setAttribute('v-on:click','ShowCable');
		// Bundle up phone
		document.querySelector('.bfs-item-layout-2-col-phone').setAttribute('v-show', 'state.bfsItemLayout2ColPhone');
		document.querySelector('.bfs-item-layout-2-col-phone .w-button').setAttribute('v-on:click','ShowPhone');
		
		// -- Review your request order summary --
		document.querySelector('.signup-service-review-your-request').setAttribute('v-show', 'state.signupServiceReviewYourRequest');
		
		// -- Sign me up area
		document.querySelector('.signup-service-sign-me-up').setAttribute('v-show', 'state.signupServiceSignMeUp');
		document.querySelector('.smu-content-form').setAttribute('v-show', 'state.smuContentForm');
		
		// === Internet ===
		// -- Select internet plan list of plans --
		var lst = document.querySelectorAll('.service-item-options-internet .service-option-item');
		// Remove all of the plans but the first
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Add data attributes to the remaining plan to be used by Vue.js
		lst[0].setAttribute('v-bind:data-service', '"internet"');
		lst[0].setAttribute('v-bind:data-plan', 'plan.id');
		// Skip plans that are marked as unavailable
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false');
		// Set plan title
		lst[0].querySelector('.service-option-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "title")');
		// Get and set the download and upload speeds
		var lst2 = lst[0].querySelectorAll('.service-option-specs-list-item > strong');
		lst2[0].setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "download") + " "');
		lst2[1].setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "upload") + " "');
		// Set the description
		lst[0].querySelector('.service-option-description').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "description")');
		// Set the price and label 
		lst[0].querySelector('.rate-cost-amount-figure').setAttribute('v-html', 'isBundled ? getPlanAttribute(plan, order.servicecusttype, "bundledprice") : getPlanAttribute(plan, order.servicecusttype, "price")');
		lst[0].querySelector('.rate-cost-subinfo-details').setAttribute('v-html', 'isBundled ? "Bundled" : "Full Price"');
		// Show/hide the bundle icon if they have met the bundle requirement
		lst[0].querySelector('.service-option-rate-notice').setAttribute('v-show', '!isBundled');
		// Show/hide the most popular plan icon
		lst[0].querySelector('.service-option-preferred').setAttribute('v-show', 'getPlanAttribute(plan, order.servicecusttype, "isMostPopular")');
		// Add the event handler
		lst[0].setAttribute('v-on:click', 'selectPlan');
		// Do the loop to duplicate the first widget for all the plans
		lst[0].setAttribute('v-for', 'plan in services.internet.plans');
		lst[0].setAttribute('v-bind:key', 'plan.id');
		
		// -- Internet selected plan area --
		// Set the title
		document.querySelector('.package-select-internet .service-select-title').setAttribute('v-html', 'order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "title") : ""');
		// Show/hide the Original, Bundled and Full price labels
		document.querySelector('.package-select-internet .select-rate-original-cost').setAttribute('v-show', 'isBundled');
		document.querySelector('.package-select-internet .select-rate-bundled-cost').setAttribute('v-show', 'isBundled');
		document.querySelector('.package-select-internet .select-rate-full-cost').setAttribute('v-show', '!isBundled');
		// Set the amounts
		document.querySelector('.package-select-internet .select-rate-original-cost .select-rate-amount-figure').setAttribute('v-html', 'order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "price") : "-"');
		document.querySelector('.package-select-internet .select-rate-bundled-cost .select-rate-amount-figure').setAttribute('v-html', 'order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "bundledprice") : "-"');
		document.querySelector('.package-select-internet .select-rate-full-cost .select-rate-amount-figure').setAttribute('v-html', 'order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "price") : "-"');
		// Show/hide the bundle icon
		document.querySelector('.package-select-internet .select-rate-notice').setAttribute('v-show', '!isBundled');
		// Get and set the selected package download and upload speeds
		lst2 = document.querySelectorAll('.package-select-internet .service-select-specs-list-item > strong');
		lst2[0].setAttribute('v-html', '(order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "download") : "-") + " "');
		lst2[1].setAttribute('v-html', '(order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "upload") : "-") + " "');
		// Set the selected plans description
		document.querySelector('.package-select-internet .service-select-description').setAttribute('v-html', 'order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "description") : "-"');
		
		// -- Get the upgrade plan widgets and remove all but the first
		lst = document.querySelectorAll('.package-select-internet .ps-option-item');
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Add data attributes to the upgrade plans to be used by Vue.js
		lst[0].setAttribute('v-bind:data-service', '"internet"');
		lst[0].setAttribute('v-bind:data-plan', 'plan.id');
		// Skip plans that are marked as unavailable
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false && order.internet.plan !== undefined && Number(getPlanAttribute(order.internet.plan, order.servicecusttype, "id")) < Number(getPlanAttribute(plan, order.servicecusttype, "id"))');
		// Set the upgrade plans title, description and upgrade amount
		lst[0].querySelector('.ps-option-card-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "download") + " Mbps"');
		lst[0].querySelector('.ps-option-card-description').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "description")');
		lst[0].querySelector('.ps-option-card-button-amount').setAttribute('v-html', 'order.internet.plan == undefined ? "-" : isBundled ? Number(getPlanAttribute(plan, order.servicecusttype, "bundledprice")) - Number(getPlanAttribute(order.internet.plan, order.servicecusttype, "bundledprice")) : Number(getPlanAttribute(plan, order.servicecusttype, "price")) - Number(getPlanAttribute(order.internet.plan, order.servicecusttype, "price")) + " "');
		// Add the upgrade button event handler
		lst[0].setAttribute('v-on:click', 'selectPlan');
		// Do the loop to duplicate the first widget for all the upgrade plans
		lst[0].setAttribute('v-for', 'plan in services.internet.plans');
		lst[0].setAttribute('v-bind:key', 'plan.id');
		
		// -- Selected plan options --
		// Set the options title and description
		document.querySelector('.signup-service-list-internet .ps-equipment-title').setAttribute('v-html', 'order.internet.options == undefined || order.internet.options.title == undefined ? "Options" : order.internet.options.title');
		document.querySelector('.signup-service-list-internet .ps-equipment-title-note').setAttribute('v-html', 'order.internet.options == undefined || order.internet.options.desc == undefined ? "" : order.internet.options.desc');
		// Get the list of option widgets and remove all but the first
		lst = document.querySelectorAll('.signup-service-list-internet .ps-equipment-option-item');
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Get the list of sub-options and remove all but the first
		lst2 = lst[0].querySelectorAll('.signup-service-list-internet .ps-equipment-option-extras');
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// -- Options --
		// Add data attributes to the options to be used by Vue.js
		lst[0].setAttribute('v-bind:data-item', 'itm.id');
		// Skip options that are marked as unavailable
		lst[0].setAttribute('v-if', 'itm.isavailable !== false');
		lst[0].setAttribute('v-bind:style','{ opacity: (itm.disabled == true ? 0.5 : 1) }');
		// Set the option title and note
		lst[0].querySelector('.ps-equipment-option-title-label').setAttribute('v-html', 'itm.title == undefined ? "Missing Title" : itm.title');
		lst[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html','itm.desc == undefined ? "" : itm.desc');
		// Add data attributes to the option radio button to be used by Vue.js
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:name', '"Item" + itm.id');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-service', '"internet"');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-itemid', 'itm.id');
		// Set or unset the option checked property
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:disabled', 'itm.disabled == true');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:checked', '(itm.selected == undefined ? false : itm.selected === true ? true : false)');
		// Add the option event handler
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-on:click','ItemSelectClick');
		// Don't render the option is there are subitems
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-if', '(itm.subitems == undefined || itm.subitems.length === 0)');
		// Set the option amount
		lst[0].querySelector('.ps-equipment-option-amount').setAttribute('v-html', 'itm.cost');
		
		// -- Sub options --
		// Don't render the sub option if there are no sub options
		lst2[0].setAttribute('v-if', 'itm.subitems != undefined');
		// Set the sub option title and description
		lst2[0].querySelector('.ps-equipment-option-extras-title').setAttribute('v-html', 'subitm.title == undefined ? "Missing Title" : subitm.title');
		lst2[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html', 'subitm.desc == undefined ? "" : subitm.desc');
		
		// -- Sub option select list --
		// Don't render the select list if the sub options aren't 'select'
		lst2[0].querySelector('select').setAttribute('v-if', 'itm.subitemchoicetype === "select"');
		// Give the select object a unique name
		lst2[0].querySelector('select').setAttribute('v-bind:name', '"SubitemSelect" + itm.id'); // Use the parent id
		// Add data attributes to the select sub options to be used by Vue.js
		lst2[0].querySelector('select').setAttribute('v-bind:data-service', '"internet"');
		lst2[0].querySelector('select').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('select').setAttribute('v-bind:data-subitemid', 'subitm.id');
		// Add the select sub options event handler
		lst2[0].querySelector('select').setAttribute('v-on:change','SubItemSelectClick');
		// Remove all but the first <option> from the <select>
		var lst3 = lst2[0].querySelectorAll('option');
		for (var k = lst3.length - 1; k > 0; k--) {
			lst3[k].remove();
		}
		// Set the select options label and value
		lst3[0].setAttribute('v-html', 'choice.label');
		lst3[0].setAttribute('v-bind:value', 'choice.cost');
		lst3[0].setAttribute('v-bind:selected', 'choice.selected');
		// Do the loop to duplicate the first <option> in the <select> for all the choices
		lst3[0].setAttribute('v-for', 'choice in subitm.choices');
		lst3[0].setAttribute('v-bind:key', 'choice.label');
		
		// -- Sub option radio buttons --
		// Don't render the radio button if the sub options aren't 'radio'
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio').setAttribute('v-if', 'itm.subitemchoicetype === "radio"');
		// Set the cost label
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio .w-form-label').setAttribute('v-html', '"$" + subitm.cost + "/mo"');
		// Give the radio object a unique name
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio').setAttribute('v-bind:name', '"SubitemRadio" + itm.id'); // Use the parent id
		// Add data attributes to the radio sub options to be used by Vue.js
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-service', '"internet"');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-subitemid', 'subitm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-subcost', 'subitm.cost');
		// Set the name to group the radio buttons
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:name', '"SubitemRadioChoice" + itm.id');
		// Set the default value
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:checked', 'subitm.selected');
		// Add the radio button sub options event handler
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-on:click','SubItemRadioClick');
		
		// -- Sub option checkbox buttons --
		// Don't render the checkbox if the sub options aren't 'checkbox'
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox').setAttribute('v-if', 'itm.subitemchoicetype === "checkbox"');
		// Set the cost label
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox .w-form-label').setAttribute('v-html', '"$" + subitm.cost + "/mo"');
		// Give the checkbox object a unique name
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox').setAttribute('v-bind:name', '"SubitemCheckbox" + itm.id'); // Use the parent id
		// Add data attributes to the checkbox sub options to be used by Vue.js
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-service', '"internet"');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-subitemid', 'subitm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-subcost', 'subitm.cost');
		// Set the checkbox name
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:name', '"SubitemCheckboxChoice" + itm.id');
		// Set the default value
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-model', 'subitm.selected');
		// Add the checkbox button sub options event handler
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-on:click','SubItemCheckboxClick');
		
		// Do the loop to duplicate the first sub option for all of the sub options 
		lst2[0].setAttribute('v-for', 'subitm in itm.subitems');
		lst2[0].setAttribute('v-bind:key', 'subitm.id');
		
		// Do the loop to duplicate the first option for all the options
		lst[0].setAttribute('v-for', 'itm in order.internet.options.items');
		lst[0].setAttribute('v-bind:key', 'itm.id');
		
		// === Cable ===
		// -- Select cable plan list of plans --
		var lst = document.querySelectorAll('.service-item-options-cable .service-option-item');
		// Remove all of the plans but the first
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Add data attributes to the remaining plan to be used by Vue.js
		lst[0].setAttribute('v-bind:data-service', '"cable"');
		lst[0].setAttribute('v-bind:data-plan', 'plan.id');
		// Skip plans that are marked as unavailable
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false');
		// Set plan title
		lst[0].querySelector('.service-option-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "title")');
		
		// -- Select the feature list items
		var lst2 = lst[0].querySelectorAll('.service-option-specs-list-item');
		// Remove all of the features but the first
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// Add the bullets to the list
		lst2[0].setAttribute('v-html', 'bullet');
		lst2[0].setAttribute('v-for', 'bullet in getPlanAttribute(plan, order.servicecusttype, "bullets")');
		
		// Set the price and label 
		lst[0].querySelector('.rate-cost-amount-figure').setAttribute('v-html', 'isBundled ? getPlanAttribute(plan, order.servicecusttype, "bundledprice") : getPlanAttribute(plan, order.servicecusttype, "price")');
		lst[0].querySelector('.rate-cost-subinfo-details').setAttribute('v-html', 'isBundled ? "Bundled" : "Full Price"');
		// Show/hide the bundle icon if they have met the bundle requirement
		lst[0].querySelector('.service-option-rate-notice').setAttribute('v-show', '!isBundled');
		// Show/hide the most popular plan icon
		lst[0].querySelector('.service-option-preferred').setAttribute('v-show', 'getPlanAttribute(plan, order.servicecusttype, "isMostPopular")');
		// Add the event handler
		lst[0].setAttribute('v-on:click', 'selectPlan');
		// Do the loop to duplicate the first widget for all the plans
		lst[0].setAttribute('v-for', 'plan in services.cable.plans');
		lst[0].setAttribute('v-bind:key', 'plan.id');
		
		// -- Cable selected plan area --
		// Set the title
		document.querySelector('.package-select-cable .service-select-title').setAttribute('v-html', 'order.cable.plan ? getPlanAttribute(order.cable.plan, order.servicecusttype, "title") : ""');
		// Show/hide the Original, Bundled and Full price labels
		document.querySelector('.package-select-cable .select-rate-original-cost').setAttribute('v-show', 'isBundled');
		document.querySelector('.package-select-cable .select-rate-bundled-cost').setAttribute('v-show', 'isBundled');
		document.querySelector('.package-select-cable .select-rate-full-cost').setAttribute('v-show', '!isBundled');
		// Set the amounts
		document.querySelector('.package-select-cable .select-rate-original-cost .select-rate-amount-figure').setAttribute('v-html', 'order.cable.plan ? getPlanAttribute(order.cable.plan, order.servicecusttype, "price") : "-"');
		document.querySelector('.package-select-cable .select-rate-bundled-cost .select-rate-amount-figure').setAttribute('v-html', 'order.cable.plan ? getPlanAttribute(order.cable.plan, order.servicecusttype, "bundledprice") : "-"');
		document.querySelector('.package-select-cable .select-rate-full-cost .select-rate-amount-figure').setAttribute('v-html', 'order.cable.plan ? getPlanAttribute(order.cable.plan, order.servicecusttype, "price") : "-"');
		// Show/hide the bundle icon
		document.querySelector('.package-select-cable .select-rate-notice').setAttribute('v-show', '!isBundled');
		
		// Select and remove all of the features for the selected plan but the first
		lst2 = document.querySelectorAll('.package-select-cable .service-select-specs-list-item');
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// Add the bullets to the list *******************
		lst2[0].setAttribute('v-html', '(order.cable.plan != undefined && order.cable.plan.bullets != undefined) ? bullet : ""');
		lst2[0].setAttribute('v-for', 'bullet in order.cable.plan.bullets');
		
		// Set the selected plans description -- wrong, do the bullets
		// document.querySelector('.package-select-cable .service-select-specs-list-item').setAttribute('v-html', 'order.cable.plan ? getPlanAttribute(order.cable.plan, order.servicecusttype, "description") : "-"');
		
		// -- Get the upgrade plan widgets and remove all but the first
		lst = document.querySelectorAll('.package-select-cable .ps-option-item');
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Add data attributes to the upgrade plans to be used by Vue.js
		lst[0].setAttribute('v-bind:data-service', '"cable"');
		lst[0].setAttribute('v-bind:data-plan', 'plan.id');
		// Skip plans that are marked as unavailable
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false && order.cable.plan !== undefined && Number(getPlanAttribute(order.cable.plan, order.servicecusttype, "id")) < Number(getPlanAttribute(plan, order.servicecusttype, "id"))');
		// Set the upgrade plans title, description and upgrade amount
		lst[0].querySelector('.ps-option-card-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "title")');
		lst[0].querySelector('.ps-option-card-description').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "description")');
		lst[0].querySelector('.ps-option-card-button-amount').setAttribute('v-html', 'order.cable.plan == undefined ? "-" : (isBundled ? Number(getPlanAttribute(plan, order.servicecusttype, "bundledprice")) - Number(getPlanAttribute(order.cable.plan, order.servicecusttype, "bundledprice")) : Number(getPlanAttribute(plan, order.servicecusttype, "price")) - Number(getPlanAttribute(order.cable.plan, order.servicecusttype, "price"))) + " "');
		// Add the upgrade button event handler
		lst[0].setAttribute('v-on:click', 'selectPlan');
		// Do the loop to duplicate the first widget for all the upgrade plans
		lst[0].setAttribute('v-for', 'plan in services.cable.plans');
		lst[0].setAttribute('v-bind:key', 'plan.id');
		
		// -- Selected plan options --
		// Set the options title and description
		document.querySelector('.signup-service-list-cable .ps-equipment-title').setAttribute('v-html', 'order.cable.options == undefined || order.cable.options.title == undefined ? "Options" : order.cable.options.title');
		document.querySelector('.signup-service-list-cable .ps-equipment-title-note').setAttribute('v-html', 'order.cable.options == undefined || order.cable.options.desc == undefined ? "" : order.cable.options.desc');
		// Get the list of option widgets and remove all but the first
		lst = document.querySelectorAll('.signup-service-list-cable .ps-equipment-option-item');
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Get the list of sub-options and remove all but the first
		lst2 = lst[0].querySelectorAll('.signup-service-list-cable .ps-equipment-option-extras');
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// -- Options --
		// Add data attributes to the options to be used by Vue.js
		lst[0].setAttribute('v-bind:data-item', 'itm.id');
		// Skip options that are marked as unavailable
		lst[0].setAttribute('v-if', 'itm.isavailable !== false');
		lst[0].setAttribute('v-bind:style','{ opacity: (itm.disabled == true ? 0.5 : 1) }');
		// Set the option title and note
		lst[0].querySelector('.ps-equipment-option-title-label').setAttribute('v-html', 'itm.title == undefined ? "Missing Title" : itm.title');
		lst[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html', 'itm.desc == undefined ? "" : itm.desc');
		// Add data attributes to the option radio button to be used by Vue.js
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:name', '"Item" + itm.id');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-service', '"cable"');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-itemid', 'itm.id');
		// Set or unset the option checked property
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:disabled', 'itm.disabled == true');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:checked', '(itm.selected == undefined ? false : itm.selected === true ? true : false)');
		// Add the option event handler
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-on:click','ItemSelectClick');
		// Don't render the option is there are subitems
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-if', '(itm.subitems == undefined || itm.subitems.length === 0)');
		// Set the option amount
		lst[0].querySelector('.ps-equipment-option-amount').setAttribute('v-html', 'itm.cost');
		
		// -- Sub options --
		// Don't render the sub option if there are no sub options
		lst2[0].setAttribute('v-if', 'itm.subitems != undefined');
		// Set the sub option title and description
		lst2[0].querySelector('.ps-equipment-option-extras-title').setAttribute('v-html', 'subitm.title == undefined ? "Missing Title" : subitm.title');
		lst2[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html', 'subitm.desc == undefined ? "" : subitm.desc');
		
		// -- Sub option select list --
		// Don't render the select list if the sub options aren't 'select'
		lst2[0].querySelector('select').setAttribute('v-if', 'itm.subitemchoicetype === "select"');
		// Give the select object a unique name
		lst2[0].querySelector('select').setAttribute('v-bind:name', '"SubitemSelect" + itm.id'); // Use the parent id
		// Add data attributes to the select sub options to be used by Vue.js
		lst2[0].querySelector('select').setAttribute('v-bind:data-service', '"cable"');
		lst2[0].querySelector('select').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('select').setAttribute('v-bind:data-subitemid', 'subitm.id');
		// Add the select sub options event handler
		lst2[0].querySelector('select').setAttribute('v-on:change','SubItemSelectClick');
		// Remove all but the first <option> from the <select>
		var lst3 = lst2[0].querySelectorAll('option');
		for (var k = lst3.length - 1; k > 0; k--) {
			lst3[k].remove();
		}
		// Set the select options label and value
		lst3[0].setAttribute('v-html', 'choice.label');
		lst3[0].setAttribute('v-bind:value', 'choice.cost');
		lst3[0].setAttribute('v-bind:selected', 'choice.selected');
		// Do the loop to duplicate the first <option> in the <select> for all the choices
		lst3[0].setAttribute('v-for', 'choice in subitm.choices');
		lst3[0].setAttribute('v-bind:key', 'choice.label');
		
		// -- Sub option radio buttons --
		// Don't render the radio button if the sub options aren't 'radio'
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio').setAttribute('v-if', 'itm.subitemchoicetype === "radio"');
		// Set the cost label
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio .w-form-label').setAttribute('v-html', '"$" + subitm.cost + "/mo"');
		// Give the radio object a unique name
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio').setAttribute('v-bind:name', '"SubitemRadio" + itm.id'); // Use the parent id
		// Add data attributes to the radio sub options to be used by Vue.js
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-service', '"cable"');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-subitemid', 'subitm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-subcost', 'subitm.cost');
		// Set the name to group the radio buttons
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:name', '"SubitemRadioChoice" + itm.id');
		// Set the default value
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:checked', 'subitm.selected');
		// Add the radio button sub options event handler
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-on:click','SubItemRadioClick');
		
		// -- Sub option checkbox buttons --
		// Don't render the checkbox if the sub options aren't 'checkbox'
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox').setAttribute('v-if', 'itm.subitemchoicetype === "checkbox"');
		// Set the cost label
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox .w-form-label').setAttribute('v-html', '"$" + subitm.cost + "/mo"');
		// Give the checkbox object a unique name
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox').setAttribute('v-bind:name', '"SubitemCheckbox" + itm.id'); // Use the parent id
		// Add data attributes to the checkbox sub options to be used by Vue.js
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-service', '"cable"');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-subitemid', 'subitm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-subcost', 'subitm.cost');
		// Set the checkbox name
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:name', '"SubitemCheckboxChoice" + itm.id');
		// Set the default value
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-model', 'subitm.selected');
		// Add the checkbox button sub options event handler
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-on:click','SubItemCheckboxClick');
		
		// Do the loop to duplicate the first sub option for all of the sub options 
		lst2[0].setAttribute('v-for', 'subitm in itm.subitems');
		lst2[0].setAttribute('v-bind:key', 'subitm.id');
		
		// Do the loop to duplicate the first option for all the options
		lst[0].setAttribute('v-for', 'itm in order.cable.options.items');
		lst[0].setAttribute('v-bind:key', 'itm.id');
		
		// === Phone ===
		// -- Select phone plan list of plans --
		var lst = document.querySelectorAll('.service-item-options-phone .service-option-item');
		// Remove all of the plans but the first
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Add data attributes to the remaining plan to be used by Vue.js
		lst[0].setAttribute('v-bind:data-service', '"phone"');
		lst[0].setAttribute('v-bind:data-plan', 'plan.id');
		// Skip plans that are marked as unavailable
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false');
		// Set plan title
		lst[0].querySelector('.service-option-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "title")');
		
		// -- Select the feature list items
		var lst2 = lst[0].querySelectorAll('.service-option-specs-list-item');
		// Remove all of the features but the first
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// Add the bullets to the list
		lst2[0].setAttribute('v-html', 'bullet');
		lst2[0].setAttribute('v-for', 'bullet in getPlanAttribute(plan, order.servicecusttype, "bullets")');
		
		// Set the price and label 
		lst[0].querySelector('.rate-cost-amount-figure').setAttribute('v-html', 'isBundled ? getPlanAttribute(plan, order.servicecusttype, "bundledprice") : getPlanAttribute(plan, order.servicecusttype, "price")');
		lst[0].querySelector('.rate-cost-subinfo-details').setAttribute('v-html', 'isBundled ? "Bundled" : "Full Price"');
		// Show/hide the bundle icon if they have met the bundle requirement
		lst[0].querySelector('.service-option-rate-notice').setAttribute('v-show', '!isBundled');
		// Show/hide the most popular plan icon
		lst[0].querySelector('.service-option-preferred').setAttribute('v-show', 'getPlanAttribute(plan, order.servicecusttype, "isMostPopular")');
		// Add the event handler
		lst[0].setAttribute('v-on:click', 'selectPlan');
		// Do the loop to duplicate the first widget for all the plans
		lst[0].setAttribute('v-for', 'plan in services.phone.plans');
		lst[0].setAttribute('v-bind:key', 'plan.id');
		
		// -- Phone selected plan area --
		// Set the title
		document.querySelector('.package-select-phone .service-select-title').setAttribute('v-html', 'order.phone.plan ? getPlanAttribute(order.phone.plan, order.servicecusttype, "title") : ""');
		// Show/hide the Original, Bundled and Full price labels
		document.querySelector('.package-select-phone .select-rate-original-cost').setAttribute('v-show', 'isBundled');
		document.querySelector('.package-select-phone .select-rate-bundled-cost').setAttribute('v-show', 'isBundled');
		document.querySelector('.package-select-phone .select-rate-full-cost').setAttribute('v-show', '!isBundled');
		// Set the amounts
		document.querySelector('.package-select-phone .select-rate-original-cost .select-rate-amount-figure').setAttribute('v-html', 'order.phone.plan ? getPlanAttribute(order.phone.plan, order.servicecusttype, "price") : "-"');
		document.querySelector('.package-select-phone .select-rate-bundled-cost .select-rate-amount-figure').setAttribute('v-html', 'order.phone.plan ? getPlanAttribute(order.phone.plan, order.servicecusttype, "bundledprice") : "-"');
		document.querySelector('.package-select-phone .select-rate-full-cost .select-rate-amount-figure').setAttribute('v-html', 'order.phone.plan ? getPlanAttribute(order.phone.plan, order.servicecusttype, "price") : "-"');
		// Show/hide the bundle icon
		document.querySelector('.package-select-phone .select-rate-notice').setAttribute('v-show', '!isBundled');
		
		// Select and remove all of the features for the selected plan but the first
		lst2 = document.querySelectorAll('.package-select-phone .service-select-specs-list-item');
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// Add the bullets to the list *******************
		lst2[0].setAttribute('v-html', '(order.phone.plan != undefined && order.phone.plan.bullets != undefined) ? bullet : ""');
		lst2[0].setAttribute('v-for', 'bullet in order.phone.plan.bullets');
		
		// Set the selected plans description -- wrong, do the bullets
		// document.querySelector('.package-select-phone .service-select-specs-list-item').setAttribute('v-html', 'order.phone.plan ? getPlanAttribute(order.phone.plan, order.servicecusttype, "description") : "-"');
		
		// -- Get the upgrade plan widgets and remove all but the first
		lst = document.querySelectorAll('.package-select-phone .ps-option-item');
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Add data attributes to the upgrade plans to be used by Vue.js
		lst[0].setAttribute('v-bind:data-service', '"phone"');
		lst[0].setAttribute('v-bind:data-plan', 'plan.id');
		// Skip plans that are marked as unavailable
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false && order.phone.plan !== undefined && Number(getPlanAttribute(order.phone.plan, order.servicecusttype, "id")) < Number(getPlanAttribute(plan, order.servicecusttype, "id"))');
		// Set the upgrade plans title, description and upgrade amount
		lst[0].querySelector('.ps-option-card-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "title")');
		lst[0].querySelector('.ps-option-card-description').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "description")');
		lst[0].querySelector('.ps-option-card-button-amount').setAttribute('v-html', 'order.phone.plan == undefined ? "-" : (isBundled ? Number(getPlanAttribute(plan, order.servicecusttype, "bundledprice")) - Number(getPlanAttribute(order.phone.plan, order.servicecusttype, "bundledprice")) : Number(getPlanAttribute(plan, order.servicecusttype, "price")) - Number(getPlanAttribute(order.phone.plan, order.servicecusttype, "price"))) + " "');
		// Add the upgrade button event handler
		lst[0].setAttribute('v-on:click', 'selectPlan');
		// Do the loop to duplicate the first widget for all the upgrade plans
		lst[0].setAttribute('v-for', 'plan in services.phone.plans');
		lst[0].setAttribute('v-bind:key', 'plan.id');
		
		// -- Selected plan options --
		// Set the options title and description
		document.querySelector('.signup-service-list-phone .ps-equipment-title').setAttribute('v-html', 'order.phone.options == undefined || order.phone.options.title == undefined ? "Options" : order.phone.options.title');
		document.querySelector('.signup-service-list-phone .ps-equipment-title-note').setAttribute('v-html', 'order.phone.options == undefined || order.phone.options.desc == undefined ? "" : order.phone.options.desc');
		// Get the list of option widgets and remove all but the first
		lst = document.querySelectorAll('.signup-service-list-phone .ps-equipment-option-item');
		for (var i = lst.length - 1; i > 0; i--) {
			lst[i].remove();
		}
		// Get the list of sub-options and remove all but the first
		lst2 = lst[0].querySelectorAll('.signup-service-list-phone .ps-equipment-option-extras');
		for (var j = lst2.length - 1; j > 0; j--) {
			lst2[j].remove();
		}
		// -- Options --
		// Add data attributes to the options to be used by Vue.js
		lst[0].setAttribute('v-bind:data-item', 'itm.id');
		// Skip options that are marked as unavailable
		lst[0].setAttribute('v-if', 'itm.isavailable !== false');
		lst[0].setAttribute('v-bind:style','{ opacity: (itm.disabled == true ? 0.5 : 1) }');
		// Set the option title and note
		lst[0].querySelector('.ps-equipment-option-title-label').setAttribute('v-html', 'itm.title == undefined ? "Missing Title" : itm.title');
		lst[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html', 'itm.desc == undefined ? "" : itm.desc');
		// Add data attributes to the option radio button to be used by Vue.js
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:name', '"Item" + itm.id');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-service', '"phone"');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-itemid', 'itm.id');
		// Set or unset the option checked property
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:disabled', 'itm.disabled == true');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:checked', '(itm.selected == undefined ? false : itm.selected === true ? true : false)');
		// Add the option event handler
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-on:click','ItemSelectClick');
		// Don't render the option is there are subitems
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-if', '(itm.subitems == undefined || itm.subitems.length === 0)');
		// Set the option amount
		lst[0].querySelector('.ps-equipment-option-amount').setAttribute('v-html', 'itm.cost');
		
		// -- Sub options --
		// Don't render the sub option if there are no sub options
		lst2[0].setAttribute('v-if', 'itm.subitems != undefined');
		// Set the sub option title and description
		lst2[0].querySelector('.ps-equipment-option-extras-title').setAttribute('v-html', 'subitm.title == undefined ? "Missing Title" : subitm.title');
		lst2[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html', 'subitm.desc == undefined ? "" : subitm.desc');
		
		// -- Sub option select list --
		// Don't render the select list if the sub options aren't 'select'
		lst2[0].querySelector('select').setAttribute('v-if', 'itm.subitemchoicetype === "select"');
		// Give the select object a unique name
		lst2[0].querySelector('select').setAttribute('v-bind:name', '"SubitemSelect" + itm.id'); // Use the parent id
		// Add data attributes to the select sub options to be used by Vue.js
		lst2[0].querySelector('select').setAttribute('v-bind:data-service', '"phone"');
		lst2[0].querySelector('select').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('select').setAttribute('v-bind:data-subitemid', 'subitm.id');
		// Add the select sub options event handler
		lst2[0].querySelector('select').setAttribute('v-on:change','SubItemSelectClick');
		// Remove all but the first <option> from the <select>
		var lst3 = lst2[0].querySelectorAll('option');
		for (var k = lst3.length - 1; k > 0; k--) {
			lst3[k].remove();
		}
		// Set the select options label and value
		lst3[0].setAttribute('v-html', 'choice.label');
		lst3[0].setAttribute('v-bind:value', 'choice.cost');
		lst3[0].setAttribute('v-bind:selected', 'choice.selected');
		// Do the loop to duplicate the first <option> in the <select> for all the choices
		lst3[0].setAttribute('v-for', 'choice in subitm.choices');
		lst3[0].setAttribute('v-bind:key', 'choice.label');
		
		// -- Sub option radio buttons --
		// Don't render the radio button if the sub options aren't 'radio'
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio').setAttribute('v-if', 'itm.subitemchoicetype === "radio"');
		// Set the cost label
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio .w-form-label').setAttribute('v-html', '"$" + subitm.cost + "/mo"');
		// Give the radio object a unique name
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio').setAttribute('v-bind:name', '"SubitemRadio" + itm.id'); // Use the parent id
		// Add data attributes to the radio sub options to be used by Vue.js
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-service', '"phone"');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-subitemid', 'subitm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:data-subcost', 'subitm.cost');
		// Set the name to group the radio buttons
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:name', '"SubitemRadioChoice" + itm.id');
		// Set the default value
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-bind:checked', 'subitm.selected');
		// Add the radio button sub options event handler
		lst2[0].querySelector('.ps-equipment-option-extras-item-radio input[type="radio"]').setAttribute('v-on:click','SubItemRadioClick');
		
		// -- Sub option checkbox buttons --
		// Don't render the checkbox if the sub options aren't 'checkbox'
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox').setAttribute('v-if', 'itm.subitemchoicetype === "checkbox"');
		// Set the cost label
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox .w-form-label').setAttribute('v-html', '"$" + subitm.cost + "/mo"');
		// Give the checkbox object a unique name
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox').setAttribute('v-bind:name', '"SubitemCheckbox" + itm.id'); // Use the parent id
		// Add data attributes to the checkbox sub options to be used by Vue.js
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-service', '"phone"');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-itemid', 'itm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-subitemid', 'subitm.id');
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:data-subcost', 'subitm.cost');
		// Set the checkbox name
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-bind:name', '"SubitemCheckboxChoice" + itm.id');
		// Set the default value
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-model', 'subitm.selected');
		// Add the checkbox button sub options event handler
		lst2[0].querySelector('.ps-equipment-option-extras-item-checkbox input[type="checkbox"]').setAttribute('v-on:click','SubItemCheckboxClick');
		
		// Do the loop to duplicate the first sub option for all of the sub options 
		lst2[0].setAttribute('v-for', 'subitm in itm.subitems');
		lst2[0].setAttribute('v-bind:key', 'subitm.id');
		
		// Do the loop to duplicate the first option for all the options
		lst[0].setAttribute('v-for', 'itm in order.phone.options.items');
		lst[0].setAttribute('v-bind:key', 'itm.id');
		
		// === Review Request ===
		lst = document.querySelectorAll('.ryr-table-item'); // 20 of them
		for (var i = 0; i < lst.length; i++) {
			lst[i].setAttribute('v-show', 'reviewreq.lineitems[' + i + '].serviceitem !== ""');
			lst[i].querySelector('.ryr-original-cost').setAttribute('v-show', 'reviewreq.lineitems[' + i + '].isLineBundled === true');
			lst[i].querySelector('.ryr-bundled-cost').setAttribute('v-show', 'reviewreq.lineitems[' + i + '].isLineBundled === true');
			lst[i].querySelector('.ryr-actual-cost').setAttribute('v-show', 'reviewreq.lineitems[' + i + '].isLineBundled !== true');
			
			lst[i].querySelector('.ryr-table-item-label').setAttribute('v-html', 'reviewreq.lineitems[' + i + '].serviceitem');
			lst[i].querySelector('.ryr-original-cost .ryr-cost-number').setAttribute('v-html', 'reviewreq.lineitems[' + i + '].origprice');
			lst[i].querySelector('.ryr-bundled-cost .ryr-cost-number').setAttribute('v-html', 'reviewreq.lineitems[' + i + '].price');
			lst[i].querySelector('.ryr-actual-cost .ryr-cost-number').setAttribute('v-html', 'reviewreq.lineitems[' + i + '].price');
		}
		document.querySelector('.ryr-footer-total .ryr-total-number').setAttribute('v-html', 'reviewreq.total');
		
		// Sign me up
		document.querySelector('.smu-content-trigger').setAttribute('v-on:click','state.smuContentForm = !state.smuContentForm');
		document.querySelector('#first-name').setAttribute('v-model', 'order.firstname');
		document.querySelector('#last-name').setAttribute('v-model', 'order.lastname');
		// document.querySelector('#first-name').setAttribute('v-model', 'order.firstname');
		// document.querySelector('#first-name').setAttribute('v-model', 'order.firstname');
		// document.querySelector('#first-name').setAttribute('v-model', 'order.firstname');
	},
	created: function() {
		// Get the command line parameters
		var internetparam = this.getUrlParameter('internet');
		var cableparam = this.getUrlParameter('cable');
		var phoneparam = this.getUrlParameter('phone');
		var srvcusttype = this.getUrlParameter('AccountType');
		if (srvcusttype === 'Residential' || srvcusttype === '') {
			srvcusttype = 'Residence'; // Force empty values to residence
		} else if (srvcusttype === 'Commercial' || srvcusttype === 'Industrial') {
			srvcusttype = 'Commercial'; // Force industrial to commercial
		} else if (srvcusttype === 'Non-Profit') { // Will never happen
		} else {
			srvcusttype = 'Residence'; // Force anything else to residence
		}
		this.changeServiceRequestCustType({ 'target': { 'name': srvcusttype } });
		
		this.order.serviceaddressID = this.getUrlParameter('PMCentralServiceAddressID');
		if (this.getUrlParameter('address') !== '')
			this.order.serviceaddress = this.getUrlParameter('address');
		if (internetparam) {
			this.state.initialentry = 'internet';
			this.ShowInternet();
		} else if (cableparam) {
			this.state.initialentry = 'cable';
			this.ShowCable();
		} else if (phoneparam) {
			this.state.initialentry = 'phone';
			this.ShowPhone();
		} else {
			this.state.initialentry = 'none';
			this.ShowNone();
		}
	},
	mounted: function() {
		axios
			.get('https://jayh13.github.io/CityLink/citylinkserviceplans.json')
			.then(response => {
				var x = response.data;
				if (typeof x === 'string') {
					// It should be type object so there is probably a parsing error and parsing it 
					// is the best way to find out what the error is
					console.log(x);
					this.services = JSON.parse(x);
				} else {
					this.services = x;
				}
			});
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
			if (cnt > 2)
				return true;
			else
				return false;
		},
		availableInternetPlans: function() {
			return this.AvailablePlans('internet');
		},
		availableCablePlans: function() {
			return this.AvailablePlans('cable');
		},
		availablePhonePlans: function() {
			return this.AvailablePlans('phone');
		},
	},
	methods: {
		ShowInternet: function() {
			this.order.internet.status = 'inProgress';
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered', 'plan': { 'bullets': [] }, 'options': [] };
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered', 'plan': { 'bullets': [] }, 'options': [] };
			this.ShowHide();
			this.ScrollTo('.signup-service-list-internet');
		},
		ShowCable: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			this.order.cable.status = 'inProgress';
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered', 'plan': { 'bullets': [] }, 'options': [] };
			this.ShowHide();
			this.ScrollTo('.signup-service-list-cable');
		},
		ShowPhone: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered', 'plan': { 'bullets': [] }, 'options': [] };
			this.order.phone.status = 'inProgress';
			this.ShowHide();
			this.ScrollTo('.signup-service-list-phone');
		},
		ShowNone: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			this.ShowHide();
		},
		ShowHide: function() {
			// Internet default
			this.state.signupServiceListInternet = false;
			this.state.serviceOptionStatusSelectedInternet = false;
			this.state.serviceOptionStatusInternet = false;
			this.state.serviceItemIntroInternet = false;
			this.state.bandwidthCalculator = false;
			this.state.serviceItemOptionsInternet = false;
			this.state.serviceItemFooterInternet = false;
			this.state.packageSelectInternet = false;
			// Cable default
			this.state.signupServiceListCable = false;
			this.state.serviceOptionStatusSelectedCable = false;
			this.state.serviceOptionStatusCable = false;
			this.state.serviceItemIntroCable = false;
			this.state.serviceItemOptionsCable = false;
			this.state.serviceItemFooterCable = false;
			this.state.packageSelectCable = false;
			// Phone default
			this.state.signupServiceListPhone = false;
			this.state.serviceOptionStatusSelectedPhone = false;
			this.state.serviceOptionStatusPhone = false;
			this.state.serviceItemIntroPhone = false;
			this.state.serviceItemOptionsPhone = false;
			this.state.serviceItemFooterPhone = false;
			this.state.packageSelectPhone = false;
			// Review and signup default
			this.state.signupServiceBundleForSavings = true;
			this.state.bfsItemLayout2ColInternet = true;
			this.state.bfsItemLayout2ColCable = true;
			this.state.bfsItemLayout2ColPhone = true;
			this.state.signupServiceReviewYourRequest = false;
			this.state.signupServiceSignMeUp = false;
			this.state.smuContentForm = false;
			// Internet status
			if (this.order.internet.status === 'ordered') {
				this.state.signupServiceListInternet = true;
				this.state.serviceOptionStatusSelectedInternet = true;
				this.state.packageSelectInternet = true;
				this.state.bfsItemLayout2ColInternet = false;
			} else if (this.order.internet.status === 'inProgress') {
				this.state.signupServiceListInternet = true;
				this.state.serviceOptionStatusInternet = true;
				this.state.serviceItemIntroInternet = true;
				this.state.bandwidthCalculator = true;
				this.state.serviceItemOptionsInternet = true;
				this.state.serviceItemFooterInternet = true;
				this.state.signupServiceBundleForSavings = false;
			} else if (this.order.internet.status === 'unordered') {
			} else if (this.order.internet.status === 'notAvailable') {
			} else {
				throw "The order internet status is invalid.";
			}
			// Cable status
			if (this.order.cable.status === 'ordered') {
				this.state.signupServiceListCable = true;
				this.state.serviceOptionStatusSelectedCable = true;
				this.state.packageSelectCable = true;
				this.state.bfsItemLayout2ColCable = false;
			} else if (this.order.cable.status === 'inProgress') {
				this.state.signupServiceListCable = true;
				this.state.serviceOptionStatusCable = true;
				this.state.serviceItemIntroCable = true;
				this.state.serviceItemOptionsCable = true;
				this.state.serviceItemFooterCable = true;
				this.state.signupServiceBundleForSavings = false;
			} else if (this.order.cable.status === 'unordered') {
			} else if (this.order.cable.status === 'notAvailable') {
			} else {
				throw "The order Cable status is invalid.";
			}
			// Phone status
			if (this.order.phone.status === 'ordered') {
				this.state.signupServiceListPhone = true;
				this.state.serviceOptionStatusSelectedPhone = true;
				this.state.packageSelectPhone = true;
				this.state.bfsItemLayout2ColPhone = false;
			} else if (this.order.phone.status === 'inProgress') {
				this.state.signupServiceListPhone = true;
				this.state.serviceOptionStatusPhone = true;
				this.state.serviceItemIntroPhone = true;
				this.state.serviceItemOptionsPhone = true;
				this.state.serviceItemFooterPhone = true;
				this.state.signupServiceBundleForSavings = false;
			} else if (this.order.phone.status === 'unordered') {
			} else if (this.order.phone.status === 'notAvailable') {
			} else {
				throw "The order Phone status is invalid.";
			}
			// Review and signup status
			if (this.order.internet.status !== 'inProgress' &&
					this.order.cable.status !== 'inProgress' &&
					this.order.phone.status !== 'inProgress' &&
					(this.order.internet.status === 'ordered' ||
					 this.order.cable.status === 'ordered' ||
					 this.order.phone.status === 'ordered')) {
				this.state.signupServiceReviewYourRequest = true;
				this.state.signupServiceSignMeUp = true;
			}
		},
		ScrollTo: function(selector) {
			// Delay 1/10th a second so items made visible will be displayed before scroll
			setTimeout(() => {
				document.querySelector(selector).scrollIntoView()
			}, 100);
		},
		AvailablePlans: function(plantype) {
			var cnt = 0;
			if (this.services && this.services[plantype] && this.services[plantype].plans) {
				for (var i = 0; i < this.services[plantype].plans.length; i++) {
					if ((this.services[plantype].plans[i].isavailable == undefined ||
						this.services[plantype].plans[i].isavailable !== false) &&
						(this.services[plantype].plans[i][this.order.servicecusttype] == undefined ||
						this.services[plantype].plans[i][this.order.servicecusttype].isavailable == undefined ||
						this.services[plantype].plans[i][this.order.servicecusttype].isavailable !== false)
						) {
						cnt++;
					}
				}
			}
			return cnt;
		},
		UpdateObject: function(obj1, obj2, exclude) {
			var keys = Object.keys(obj2);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (!exclude.includes(key)) {
					// if (key in obj1) {
						obj1[key] = JSON.parse(JSON.stringify(obj2[key]));
					// }
				}
			}
		},
		AvailablePlanOptions: function(plantype, plan, custtype) {
			// Get the customer type specific options (services.internet.plan.commercial.options)
			var options1 = plan[custtype] && plan[custtype].options ? plan[custtype].options : undefined;
			// Get the selected plan options (services.internet.plan.options)
			var options2 = plan && plan.options ? plan.options : undefined;
			// Get the base level service options (services.internet.options)
			var options3 = this.services[plantype] && this.services[plantype].options ? this.services[plantype].options : undefined;
			// Start with an empty default
			var options = { "title": "", "desc": "", "items": [] };
			// Merge the base level options with the default
			if (options3) {
				// Update everything in options (currently empty) with options3
				this.UpdateObject(options, options3, []);
			}
			// Merge in the plan specific options
			if (options2 && 'items' in options2) {
				// Update any properties other than items
				this.UpdateObject(options, options2, ['items']);
				// Update the items list
				if (options.items.length === 0)
					// Options items is empty so replace them entirely
					options.items = JSON.parse(JSON.stringify(options2.items));
				else {
					// Loop through all the option items in the selected plan
					for (var i = 0; i < options2.items.length; i++) {
						var opt2itm = options2.items[i];
						var optitm = options.items.find(obj => obj.id === opt2itm.id);
						if (optitm == undefined)
							options.items.push(JSON.parse(JSON.stringify(opt2itm)));
						else {
							this.UpdateObject(optitm, opt2itm, ['subitems']);
							if (opt2itm.subitems != undefined) {
								if (optitm.subitems == undefined)
									optitm.subitems = [];
								for (var j = 0; j < opt2itm.subitems.length; j++) {
									var opt2subitm = opt2itm.subitems[j];
									var optsubitm = optitm.subitems.find(obj => obj.id === opt2subitm.id);
									if (optsubitm == undefined) {
										optitm.subitems.push(JSON.parse(JSON.stringify(opt2subitm)));
									} else {
										this.UpdateObject(optsubitm, opt2subitm, []);
									}
								}
								optitm.subitems.sort((a, b) => { parseInt(a.id) - parseInt(b.id); });
							}
						}
					}
					options.items = options.items.sort((a, b) => { parseInt(a.id) - parseInt(b.id); });
				}
			}
			// Merge in the customer type specific options
			if (options1 && 'items' in options1) {
				// Update any properties other than items
				this.UpdateObject(options, options1, ['items']);
				// Update the items list
				if (options.items.length === 0)
					options.items = JSON.parse(JSON.stringify(options1.items));
				else {
					for (var i = 0; i < options1.items.length; i++) {
						var opt1itm = options1.items[i];
						var optitm = options.items.find(obj => obj.id == opt1itm.id);
						if (optitm == undefined)
							options.items.push(JSON.parse(JSON.stringify(opt1itm)));
						else {
							this.UpdateObject(optitm, opt1itm, ['subitems']);
							if (opt1itm.subitems != undefined) {
								if (optitm.subitems == undefined)
									optitm.subitems = [];
								for (var j = 0; j < opt1itm.subitems.length; j++) {
									var opt1subitm = opt1itm.subitems[j];
									var optsubitm = optitm.subitems.find(obj => obj.id === opt1subitm.id);
									if (optsubitm == undefined) {
										optitm.subitems.push(JSON.parse(JSON.stringify(opt1subitm)));
									} else {
										this.UpdateObject(optsubitm, opt1subitm, []);
									}
								}
								optitm.subitems.sort((a, b) => { parseInt(a.id) - parseInt(b.id); });
							}
						}
					}
					options.items = options.items.sort((a, b) => { parseInt(a.id) - parseInt(b.id); });
				}
			}
			
			for (var i = 0; i < options.items.length; i++) {
				var itm = options.items[i];
				if (itm.subitemchoicetype === 'select') {
					// Initialize the parent to the sum of selected subitem costs
					var subitms = itm.subitems.filter(s => s.cost > 0);
					if (subitms == undefined || subitms.length === 0)
						itm.cost = 0;
					else
						itm.cost = subitms.map(s => Number(s.cost)).reduce((prev, next) => prev + next);
				} else if (itm.subitemchoicetype === 'radio') {
					for (var j = 0; j < itm.subitems.length; j++) {
						// If the radio selected property isn't defined then default it to false
						if (itm.subitems[j].selected == undefined)
							itm.subitems[j].selected = false;
					}
					// Initialize the parent to the first selected subitem cost
					var subitms = itm.subitems.filter(s => s.selected);
					if (subitms.length > 0) {
						itm.cost = subitms[0].cost;
					}
					// Make sure only one is selected
					for (var j = 1; j < subitms.length; j++) {
						subitms[j].selected = false; // Fix issue if multiple are selected
					}
				} else if (itm.subitemchoicetype === 'checkbox') {
					for (var j = 0; j < itm.subitems.length; j++) {
						// If the radio selected property isn't defined then default it to false
						if (itm.subitems[j].selected == undefined)
							itm.subitems[j].selected = false;
					}
					// Initialize the parent to the sum of selected subitem costs
					var subitms = itm.subitems.filter(s => s.selected === true);
					if (subitms == undefined || subitms.length === 0)
						itm.cost = 0;
					else
						itm.cost = subitms.map(s => s.cost).reduce((prev, next) => prev + next);
				} else {
					itm.subitems = undefined;
				}
			}
			
			// Special cases
			if (plantype === 'internet') {
				
			}
			if (plantype === 'cable') {
				// Red zone isn't available below View Full
				if (plan.id < 9) {
					options.items.find(itm => itm.id === 33).disabled = true;
				} else {
					options.items.find(itm => itm.id === 33).disabled = false;
				}
			}
			if (plantype === 'phone') {
				
			}
			
			
			return options;
		},
		changeServiceRequestCustType: function(e) {
			var name = e.target.name;
			var stat = '';
			// Clear the order or skip if they clicked on an already checked box
			if (name.toLowerCase() !== this.order.servicecusttype) {
				this.order.servicecusttype = name.toLowerCase().replace('-','');
				stat = (this.order.internet.status === 'inProgress') ? 'inProgress' : 'unordered';
				this.order.internet = { 'status': stat, 'plan': undefined, 'options': [] };
				stat = (this.order.cable.status === 'inProgress') ? 'inProgress' : 'unordered';
				this.order.cable = { 'status': stat, 'plan': { 'bullets': [] }, 'options': [] };
				stat = (this.order.phone.status === 'inProgress') ? 'inProgress' : 'unordered';
				this.order.phone = { 'status': stat, 'plan': { 'bullets': [] }, 'options': [] };
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
			// Show the default input
			if (this.state.initialentry === 'internet') {
				this.ShowInternet();
			} else if (this.state.initialentry === 'cable') {
				this.ShowCable();
			} else if (this.state.initialentry === 'phone') {
				this.ShowPhone();
			} else {
				this.ShowNone();
			}
		},
		
		getPlanAttribute: function(plan, srvName, attribute) {
			if (attribute === "residence" || attribute === "commercial" || attribute === "nonprofit")
				throw "The attribute can not be a service name.";
			if (plan == undefined)
				throw "The plan doesn't exist";
			if (srvName in plan && attribute in plan[srvName])
				return plan[srvName][attribute];
			if (attribute in plan)
				return plan[attribute];
			return undefined;
		},
		
		selectPlan: function(e) {
			var ctrl = e.currentTarget;
			var srvName = ctrl.getAttribute('data-service');
			var srvPlan = ctrl.getAttribute('data-plan');
			this.order[srvName].plan = this.services[srvName].plans.filter(p => p.id == srvPlan)[0]; // Num == Str
			
			this.order[srvName].status = 'ordered';
			// console.log('DATA-PLAN: ' + srvName + ' ' + this.order[srvName].plan.title);
			this.order[srvName].options = this.AvailablePlanOptions(srvName, this.order[srvName].plan, this.order.servicecusttype);
		
			this.RefreshReviewRequest();
			if (srvName === 'internet')
				this.ScrollTo('.signup-service-list-internet');
			else if (srvName === 'cable')
				this.ScrollTo('.signup-service-list-cable');
			else if (srvName === 'phone')
				this.ScrollTo('.signup-service-list-phone');
		},
		
		ItemSelectClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var selecteditem = this.order[servicetype].options.items.find(itm => itm.id == itemid);
			if (selecteditem.required === true)
				selecteditem.selected = true;
			else
				selecteditem.selected = !selecteditem.selected;
			
			this.RefreshReviewRequest();
			return false;
		},
		
		SubItemSelectClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var subitemid = subitem.getAttribute('data-subitemid');
			var item = this.order[servicetype].options.items.find(itm => itm.id == itemid);
			var ordersubitem = item.subitems.find(subitm => subitm.id == subitemid);
			ordersubitem.cost = Number(subitem.value);
			ordersubitem.costdesc = subitem.selectedOptions[0].text;
			
			var subitms = item.subitems;
			// console.log(subitem.value, subitem.getAttribute('data-cost'));
			item.cost = subitms.map(s => Number(s.cost)).reduce((prev, next) => prev + next);
			
			// this.order[servicetype].options.items.find(itm => itm.id == itemid).cost = Number(subitem.value);
			
			this.RefreshReviewRequest();
		},
		
		SubItemRadioClick: function(e) {
			// NOTE: UNTESTED SINCE THE CURRENT DATA DOESN'T USE RADIO BUTTONS
			//       Look at the SubItemCheckboxClick handler for ideas on potential issues with
			//       the selected property in the model not being updated till after this runs
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var subcost = Number(subitem.getAttribute('data-subcost'));
			this.order[servicetype].options.items.find(itm => itm.id == itemid).cost = subcost;
			
			this.RefreshReviewRequest();
		},
		
		SubItemCheckboxClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var subitemid = subitem.getAttribute('data-subitemid');
			var subcost = Number(subitem.getAttribute('data-subcost'));
			var itm = this.order[servicetype].options.items.find(it => it.id == itemid);
			
			// Even though the model is bound it wont update till after this eventhandler so do it by hand
			var subitm = itm.subitems.find(subit => subit.id == subitemid);
			subitm.selected = subitem.checked;
			
			// Calc the total cost of the subitems
			var subitms = itm.subitems.filter(subitm => subitm.selected === true);
			var totcost = 0;
			if (subitms.length === 0)
				totcost = 0;
			else {
				totcost = subitms.map(s => s.cost).reduce((prev, next) => prev + next);
				
				// Handle a special case for 'Digital Premium Multiplexes' bundle pricing
				if (itm.title === 'Digital Premium Multiplexes') {
					if (subitms.length === 2)
						totcost = 29;
					else if (subitms.length === 3)
						totcost = 39;
					else if (subitms.length === 4)
						totcost = 49;
				}
			}
			itm.cost = totcost;
			
			this.RefreshReviewRequest();
			return false;
		},
		
		RefreshReviewRequest: function() {
			var i = 0;
			var tot = 0;
			// === Add the internet service ===
			if (this.order.internet.status === 'ordered') {
				// The plan
				this.reviewreq.lineitems[i].serviceitem = '<strong style="font-size: 1.15em">CityLink ' + this.getPlanAttribute(this.order.internet.plan, this.order.servicecusttype, "title") + ' Internet Service</strong>';
				this.reviewreq.lineitems[i].price = this.getPlanAttribute(this.order.internet.plan, this.order.servicecusttype, "bundledprice");
				this.reviewreq.lineitems[i].origprice = this.getPlanAttribute(this.order.internet.plan, this.order.servicecusttype, "price");
				this.reviewreq.lineitems[i].isLineBundled = this.isBundled;
				i++;
				
				// Add the internet service options
				for (var j = 0; j < this.order.internet.options.items.length; j++) {
					var itm = this.order.internet.options.items[j];
					var showitem = false;
					var svcitem = itm.title;
					var svccost = itm.cost;
					var svcorigcost = '';
					var svcsubitemtype = itm.subitemchoicetype;
					var svcsubitems = '';
					var showbundle = false;
					if (itm.selected === true && svcsubitemtype == undefined) {
						// Top level with no subitems to show
						showitem = true;
					}
					else if (svccost > 0 && svcsubitemtype === 'select') {
						// Append the select list items
						for (var k = 0; k < itm.subitems.length; k++) {
							var subitm = itm.subitems[k];
							if (subitm.cost > 0) {
								svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title + ', ' + subitm.costdesc;
							}
						}
						showitem = true;
					}
					else if (svccost > 0 && svcsubitemtype === 'radio') {
						// There are no radio's for the internet
					}
					else if (svccost > 0 && svcsubitemtype === 'checkbox') {
						// Append the checkbox list items
						for (var k = 0; k < itm.subitems.length; k++) {
							var subitm = itm.subitems[k];
							if (subitm.selected) {
								svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title + ' at $' + subitm.cost + '/mo';
							}
						}
						showitem = true;
					}
					else if (svccost === 0 && svcitem === 'Internet Equipment' && svcsubitemtype === 'checkbox') {
						// One off for buy your own equipment
						var subitm = itm.subitems[0];
						svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title;
						showitem = true;
					}
					
					// Add the item to the request summary list
					if (showitem) {
						this.reviewreq.lineitems[i].serviceitem = '<strong>' + svcitem + '</strong>' + svcsubitems;
						this.reviewreq.lineitems[i].price = svccost;
						this.reviewreq.lineitems[i].origprice = svcorigcost;
						this.reviewreq.lineitems[i].isLineBundled = showbundle;
						i++;
					}
				}
			}

			// === Add the cable service ===
			if (this.order.cable.status === 'ordered') {
				this.reviewreq.lineitems[i].serviceitem = '<strong style="font-size: 1.15em">CityLink ' + this.getPlanAttribute(this.order.cable.plan, this.order.servicecusttype, "title") + ' Cable TV Service</strong>';
				this.reviewreq.lineitems[i].price = this.getPlanAttribute(this.order.cable.plan, this.order.servicecusttype, "bundledprice");
				this.reviewreq.lineitems[i].origprice = this.getPlanAttribute(this.order.cable.plan, this.order.servicecusttype, "price");
				this.reviewreq.lineitems[i].isLineBundled = this.isBundled;
				i++;
				
				// Add the cable service options
				for (var j = 0; j < this.order.cable.options.items.length; j++) {
					var itm = this.order.cable.options.items[j];
					var showitem = false;
					var svcitem = itm.title;
					var svccost = itm.cost;
					var svcorigcost = '';
					var svcsubitemtype = itm.subitemchoicetype;
					var svcsubitems = '';
					var showbundle = false;
					if (itm.selected === true && svcsubitemtype == undefined) {
						// Top level with no subitems to show
						showitem = true;
					}
					else if (svccost > 0 && svcsubitemtype === 'select') {
						// Append the select list items
						for (var k = 0; k < itm.subitems.length; k++) {
							var subitm = itm.subitems[k];
							if (subitm.cost > 0) {
								svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title + ', ' + subitm.costdesc;
							}
						}
						showitem = true;
					}
					else if (svccost > 0 && svcsubitemtype === 'radio') {
						// There are no radio's for cable
					}
					else if (svccost > 0 && svcsubitemtype === 'checkbox') {
						// Append the checkbox list items
						var cnt = 0;
						var origcost = 0;
						for (var k = 0; k < itm.subitems.length; k++) {
							var subitm = itm.subitems[k];
							if (subitm.selected) {
								cnt++;
								origcost += subitm.cost;
								svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title + ' at $' + subitm.cost + '/mo';
							}
						}
						
						// Handle a special case
						if (svcitem === 'Digital Premium Multiplexes') {
							svcorigcost = origcost;
							svccost = svccost;
							showbundle = true;
						}
						showitem = true;
					}
					
					// Add the item to the request summary list
					if (showitem) {
						this.reviewreq.lineitems[i].serviceitem = '<strong>' + svcitem + '</strong>' + svcsubitems;
						this.reviewreq.lineitems[i].price = svccost;
						this.reviewreq.lineitems[i].origprice = svcorigcost;
						this.reviewreq.lineitems[i].isLineBundled = showbundle;
						i++;
					}
				}
			}
			
			// === Add the phone service ===
			if (this.order.phone.status === 'ordered') {
				this.reviewreq.lineitems[i].serviceitem = '<strong style="font-size: 1.15em">CityLink ' + this.getPlanAttribute(this.order.phone.plan, this.order.servicecusttype, "title") + ' Phone Service</strong>';
				this.reviewreq.lineitems[i].price = this.getPlanAttribute(this.order.phone.plan, this.order.servicecusttype, "bundledprice");
				this.reviewreq.lineitems[i].origprice = this.getPlanAttribute(this.order.phone.plan, this.order.servicecusttype, "price");
				this.reviewreq.lineitems[i].isLineBundled = this.isBundled;
				i++;
				
				// Add the phone service options
				for (var j = 0; j < this.order.phone.options.items.length; j++) {
					var itm = this.order.phone.options.items[j];
					var showitem = false;
					var svcitem = itm.title;
					var svccost = itm.cost;
					var svcorigcost = '';
					var svcsubitemtype = itm.subitemchoicetype;
					var svcsubitems = '';
					var showbundle = false;
					if (itm.selected === true && svcsubitemtype == undefined) {
						// Top level with no subitems to show
						showitem = true;
					}
					else if (svccost > 0 && svcsubitemtype === 'select') {
						// Append the select list items
						for (var k = 0; k < itm.subitems.length; k++) {
							var subitm = itm.subitems[k];
							if (subitm.cost > 0) {
								svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title + ', ' + subitm.costdesc;
							}
						}
						showitem = true;
					}
					else if (svccost > 0 && svcsubitemtype === 'radio') {
						// There are no radio's for phone
					}
					else if (svccost > 0 && svcsubitemtype === 'checkbox') {
						// Append the checkbox list items
						for (var k = 0; k < itm.subitems.length; k++) {
							var subitm = itm.subitems[k];
							if (subitm.selected) {
								svcsubitems = svcsubitems + '<br />&nbsp;&nbsp;&nbsp;&nbsp;&#9658;&nbsp;' + subitm.title + ' at $' + subitm.cost + '/mo';
							}
						}
						showitem = true;
					}
					
					// Add the item to the request summary list
					if (showitem) {
						this.reviewreq.lineitems[i].serviceitem = '<strong>' + svcitem + '</strong>' + svcsubitems;
						this.reviewreq.lineitems[i].price = svccost;
						this.reviewreq.lineitems[i].origprice = svcorigcost;
						this.reviewreq.lineitems[i].isLineBundled = showbundle;
						i++;
					}
				}
			}
			
			// Clear out any left over data
			for (var j = i; j < this.reviewreq.lineitems.length; j++) {
				this.reviewreq.lineitems[j].serviceitem = '';
				this.reviewreq.lineitems[j].price = 0;
				this.reviewreq.lineitems[j].origprice = 0;
			}
			
			//if (this.isBundled) {
			//	for (var k = 0; k < this.reviewreq.lineitems.length; k++) {
			//		tot = tot + this.reviewreq.lineitems[k].origprice;
			//	}
			//} else {
				for (var k = 0; k < this.reviewreq.lineitems.length; k++) {
					tot = tot + this.reviewreq.lineitems[k].price;
				}
			//}
			
			this.reviewreq.total = tot.toFixed(2);
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


