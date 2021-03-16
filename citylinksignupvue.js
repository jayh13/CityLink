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
		'services': {'internet':{'plans':[]},'cable':{'plans':[]},'phone':{'plans':[]}},
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
		document.querySelector('.package-select-internet .select-rate-bundled-cost .select-rate-amount-figure').setAttribute('v-html', 'order.internet.plan ? getPlanAttribute(order.internet.plan, order.servicecusttype, "bundeledprice") : "-"');
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
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false && order.internet.plan !== undefined && parseInt(getPlanAttribute(order.internet.plan, order.servicecusttype, "id")) < parseInt(getPlanAttribute(plan, order.servicecusttype, "id"))');
		// Set the upgrade plans title, description and upgrade amount
		lst[0].querySelector('.ps-option-card-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "download") + " Mbps"');
		lst[0].querySelector('.ps-option-card-description').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "description")');
		lst[0].querySelector('.ps-option-card-button-amount').setAttribute('v-html', 'order.internet.plan == undefined ? "-" : isBundled ? parseInt(getPlanAttribute(plan, order.servicecusttype, "bundeledprice")) - parseInt(getPlanAttribute(order.internet.plan, order.servicecusttype, "bundeledprice")) : parseInt(getPlanAttribute(plan, order.servicecusttype, "price")) - parseInt(getPlanAttribute(order.internet.plan, order.servicecusttype, "price")) + " "');
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
		// Set the option title and note
		lst[0].querySelector('.ps-equipment-option-title-label').setAttribute('v-html', 'itm.title == undefined ? "Missing Title" : itm.title');
		lst[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html','itm.desc == undefined ? "" : itm.desc');
		// Add data attributes to the option radio button to be used by Vue.js
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:name', '"Item" + itm.id');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-service', '"internet"');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-itemid', 'itm.id');
		// Set or unset the option checked property
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
		document.querySelector('.package-select-cable .select-rate-bundled-cost .select-rate-amount-figure').setAttribute('v-html', 'order.cable.plan ? getPlanAttribute(order.cable.plan, order.servicecusttype, "bundeledprice") : "-"');
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
		lst[0].setAttribute('v-if', 'getPlanAttribute(plan, order.servicecusttype, "isavailable") !== false && order.cable.plan !== undefined && parseInt(getPlanAttribute(order.cable.plan, order.servicecusttype, "id")) < parseInt(getPlanAttribute(plan, order.servicecusttype, "id"))');
		// Set the upgrade plans title, description and upgrade amount
		lst[0].querySelector('.ps-option-card-title').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "download") + " Mbps"');
		lst[0].querySelector('.ps-option-card-description').setAttribute('v-html', 'getPlanAttribute(plan, order.servicecusttype, "description")');
		lst[0].querySelector('.ps-option-card-button-amount').setAttribute('v-html', 'order.cable.plan == undefined ? "-" : isBundled ? parseInt(getPlanAttribute(plan, order.servicecusttype, "bundeledprice")) - parseInt(getPlanAttribute(order.cable.plan, order.servicecusttype, "bundeledprice")) : parseInt(getPlanAttribute(plan, order.servicecusttype, "price")) - parseInt(getPlanAttribute(order.cable.plan, order.servicecusttype, "price")) + " "');
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
		// Set the option title and note
		lst[0].querySelector('.ps-equipment-option-title-label').setAttribute('v-html', 'itm.title == undefined ? "Missing Title" : itm.title');
		lst[0].querySelector('.ps-equipment-option-title-note').setAttribute('v-html', 'itm.desc == undefined ? "" : itm.desc');
		// Add data attributes to the option radio button to be used by Vue.js
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:name', '"Item" + itm.id');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-service', '"cable"');
		lst[0].querySelector('.ps-equipment-option-select input').setAttribute('v-bind:data-itemid', 'itm.id');
		// Set or unset the option checked property
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
			if (cnt > 1)
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
		},
		ShowCable: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			this.order.cable.status = 'inProgress';
			if (this.order.phone.status !== 'ordered')
				this.order.phone = { 'status': 'unordered', 'plan': { 'bullets': [] }, 'options': [] };
			this.ShowHide();
		},
		ShowPhone: function() {
			if (this.order.internet.status !== 'ordered')
				this.order.internet = { 'status': 'unordered', 'plan': undefined, 'options': [] };
			if (this.order.cable.status !== 'ordered')
				this.order.cable = { 'status': 'unordered', 'plan': { 'bullets': [] }, 'options': [] };
			this.order.phone.status = 'inProgress';
			this.ShowHide();
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
		AvailablePlans: function(plantype) {
			var cnt = 0;
			if (this.services && this.services[plantype] && this.services[plantype].plans) {
				for (var i = 0; i < this.services[plantype].plans.length; i++) {
					if ((this.services[plantype].plans[i].isavailable == undefined ||
						this.services[plantype].plans[i].isavailable !== false) &&
						(this.services[plantype].plans[i][this.order.servicecusttype].isavailable == undefined ||
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
			var options1 = plan[custtype] && plan[custtype].options ? plan[custtype].options : undefined;
			var options2 = plan && plan.options ? plan.options : undefined;
			var options3 = this.services[plantype] && this.services[plantype].options ? this.services[plantype].options : undefined;
			var options = { "title": "", "desc": "", "items": [] };
			if (options3) {
				// Update everything in options (currently empty) with options3
				this.UpdateObject(options, options3, []);
			}
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
					
				} else if (itm.subitemchoicetype === 'radio') {
					for (var j = 0; j < itm.subitems.length; j++) {
						if (itm.subitems[j].selected == undefined)
							itm.subitems[j].selected = false;
					}
					var subitms = itm.subitems.filter(s => s.selected);
					if (subitms.length > 0) {
						itm.cost = subitms[0].cost;
					}
					for (var j = 1; j < subitms.length; j++) {
						subitms[j].selected = false; // Fix issue if multiple are selected
					}
				} else if (itm.subitemchoicetype === 'checkbox') {
					for (var j = 0; j < itm.subitems.length; j++) {
						if (itm.subitems[j].selected == undefined)
							itm.subitems[j].selected = false;
					}
					var subitms = itm.subitems.filter(s => s.selected === true);
					if (subitms == undefined || subitms.length === 0)
						itm.cost = 0;
					else
						itm.cost = subitms.map(s => s.cost).reduce((prev, next) => prev + next);
				} else {
					itm.subitems = undefined;
				}
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
				this.order.cable = { 'status': stat, 'plan': undefined, 'options': [] };
				stat = (this.order.phone.status === 'inProgress') ? 'inProgress' : 'unordered';
				this.order.phone = { 'status': stat, 'plan': undefined, 'options': [] };
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
			console.log('DATA-PLAN: ' + srvName + ' ' + this.order[srvName].plan.title);
			this.order[srvName].options = this.AvailablePlanOptions(srvName, this.order[srvName].plan, this.order.servicecusttype);
		},
		
		ItemSelectClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			this.order[servicetype].options.items.find(itm => itm.id == itemid).selected = !this.order[servicetype].options.items.find(itm => itm.id == itemid).selected;
			
			return false;
		},
		
		SubItemSelectClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var subitemid = subitem.getAttribute('data-subitemid');
			var item = this.order[servicetype].options.items.find(itm => itm.id == itemid);
			var ordersubitem = item.subitems.find(subitm => subitm.id == subitemid);
			ordersubitem.cost = parseInt(subitem.value);
			var subitms = item.subitems;
			// console.log(subitem.value, subitem.getAttribute('data-cost'));
			item.cost = subitms.map(s => parseInt(s.cost)).reduce((prev, next) => prev + next);
			
			// this.order[servicetype].options.items.find(itm => itm.id == itemid).cost = parseInt(subitem.value);
		},
		
		SubItemRadioClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var subcost = parseInt(subitem.getAttribute('data-subcost'));
			this.order[servicetype].options.items.find(itm => itm.id == itemid).cost = subcost;
		},
		
		SubItemCheckboxClick: function(e) {
			var subitem = e.currentTarget;
			var servicetype = subitem.getAttribute('data-service');
			var itemid = subitem.getAttribute('data-itemid');
			var subcost = parseInt(subitem.getAttribute('data-subcost'));
			var item = this.order[servicetype].options.items.find(itm => itm.id == itemid);
			var subitms = item.subitems.filter(subitm => subitm.selected === true);
			var totcost = 0;
			if (subitms.length === 0)
				totcost = 0;
			else
				totcost = subitms.map(s => s.cost).reduce((prev, next) => prev + next);
			// Model isn't updated till after the eventhandler runs
			if (subitem.checked)
				totcost = totcost + subcost;
			else
				totcost = totcost - subcost;
			item.cost = totcost;
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

