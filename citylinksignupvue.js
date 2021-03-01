// Add the Vue.js attributes. We could do this in the WebFlow interface but it's so clicky
document.querySelector('input#Residence').setAttribute('v-model','state.residenceCheckboxField');
document.querySelector('input#Commercial').setAttribute('v-model','state.commercialCheckboxField');
document.querySelector('input#Non-Profit').setAttribute('v-model','state.nonProfitCheckboxField');
document.querySelector('.signup-service-list-internet').setAttribute('v-if', 'state.signupServiceListInternet');
document.querySelector('.service-option-status-selected-internet').setAttribute('v-if', 'state.serviceOptionStatusSelectedInternet');
document.querySelector('.service-option-status-internet').setAttribute('v-if', 'state.serviceOptionStatusInternet');
document.querySelector('.service-item-intro-internet').setAttribute('v-if', 'state.serviceItemIntroInternet');
document.querySelector('.bandwidth-calculator').setAttribute('v-if', 'state.bandwidthCalculator');
document.querySelector('.service-item-options-internet').setAttribute('v-if', 'state.serviceItemOptionsInternet');
document.querySelector('.service-item-footer-internet').setAttribute('v-if', 'state.serviceItemFooterInternet');
document.querySelector('.package-select-internet').setAttribute('v-if', 'state.packageSelectInternet');
document.querySelector('.signup-service-list-cable').setAttribute('v-if', 'state.signupServiceListCable');
document.querySelector('.service-option-status-selected-cable').setAttribute('v-if', 'state.serviceOptionStatusSelectedCable');
document.querySelector('.service-option-status-cable').setAttribute('v-if', 'state.serviceOptionStatusCable');
document.querySelector('.service-item-intro-cable').setAttribute('v-if', 'state.serviceItemIntroCable');
document.querySelector('.service-item-options-cable').setAttribute('v-if', 'state.serviceItemOptionsCable');
document.querySelector('.service-item-footer-cable').setAttribute('v-if', 'state.serviceItemFooterCable');
document.querySelector('.package-select-cable').setAttribute('v-if', 'state.packageSelectCable');
document.querySelector('.signup-service-list-phone').setAttribute('v-if', 'state.signupServiceListPhone');
document.querySelector('.service-option-status-selected-phone').setAttribute('v-if', 'state.serviceOptionStatusSelectedPhone');
document.querySelector('.service-option-status-phone').setAttribute('v-if', 'state.serviceOptionStatusPhone');
document.querySelector('.service-item-intro-phone').setAttribute('v-if', 'state.serviceItemIntroPhone');
document.querySelector('.service-item-options-phone').setAttribute('v-if', 'state.serviceItemOptionsPhone');
document.querySelector('.service-item-footer-phone').setAttribute('v-if', 'state.serviceItemFooterPhone');
document.querySelector('.package-select-phone').setAttribute('v-if', 'state.packageSelectPhone');
document.querySelector('.signup-service-bundle-for-savings').setAttribute('v-if', 'state.signupServiceBundleForSavings');
document.querySelector('.bfs-item-layout-2-col-internet').setAttribute('v-if', 'state.bfsItemLayout2ColInternet');
document.querySelector('.bfs-item-layout-2-col-cable').setAttribute('v-if', 'state.bfsItemLayout2ColCable');
document.querySelector('.bfs-item-layout-2-col-phone').setAttribute('v-if', 'state.bfsItemLayout2ColPhone');
document.querySelector('.signup-service-review-your-request').setAttribute('v-if', 'state.signupServiceReviewYourRequest');
document.querySelector('.signup-service-sign-me-up').setAttribute('v-if', 'state.signupServiceSignMeUp');
document.querySelector('.smu-content-form').setAttribute('v-if', 'state.smuContentForm');

// Create the Vue.js application
var app = new Vue({
	el: '#page-main',
	data: {
		'order': {
			'servicetype': '',
			'serviceaddress': 'Unknown',
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
		'services': {
			'internet': {
				'plans': [
					{
						'id': 20,
						'title': 'Connect 20',
						'download': 20,
						'upload': 2,
						'residence': {
							'price': 25,
							'bundledprice': 21
						},
						'commercial': {
							'isavailable': false,
							'price': 27,
							'bundledprice': 23
						},
						'nonProfit': {
							'price': 26,
							'bundledprice': 22
						},
						'description': 'Perfect for light browsing and managing email.',
						'options': []
					},
					{
						'id': 60,
						'title': 'Connect 60',
						'download': 60,
						'upload': 3,
						'residence': {
							'price': 39,
							'bundledprice': 35
						},
						'commercial': {
							'price': 41,
							'bundledprice': 37
						},
						'nonProfit': {
							'price': 40,
							'bundledprice': 36
						},
						'description': 'Excellent for light video streaming, moderate browsing and digital phone service.',
						'options': []
					},
					{
						'id': 100,
						'title': 'Connect 100',
						'download': 100,
						'upload': 5,
						'residence': {
							'price': 59,
							'bundledprice': 55,
							'isMostPopular': true
						},
						'commercial': {
							'price': 61,
							'bundledprice': 57,
							'description': 'Great for small home office and light video conferencng.'
						},
						'nonProfit': {
							'price': 60,
							'bundledprice': 56
						},
						'description': 'Great for moderate streaming and gaming, browsing, and digital phone service.',
						'options': []
					},
					{
						'id': 150,
						'title': 'Connect 150',
						'download': 150,
						'upload': 10,
						'residence': {
							'price': 79,
							'bundledprice': 75
						},
						'commercial': {
							'price': 81,
							'bundledprice': 77
						},
						'nonProfit': {
							'price': 80,
							'bundledprice': 76,
							'isMostPopular': true
						},
						'description': 'The best option for those with few internet connected devices.',
						'options': []
					},
					{
						'id': 250,
						'title': 'Connect 250',
						'download': 250,
						'upload': 15,
						'residence': {
							'price': 89,
							'bundledprice': 85

						},
						'commercial': {
							'price': 91,
							'bundledprice': 87

						},
						'nonProfit': {
							'price': 90,
							'bundledprice': 86
						},
						'description': 'Optimized for streaming HD and 4K. Great for families with lots of internet connected devices.',
						'options': []
					},
					{
						'id': 500,
						'title': 'Connect 500',
						'download': 500,
						'upload': 25,
						'residence': {
							'price': 99,
							'bundledprice': 95
						},
						'commercial': {
							'price': 101,
							'bundledprice': 97,
							'isMostPopular': true
						},
						'nonProfit': {
							'price': 100,
							'bundledprice': 96
						},
						'description': 'The ultimate solution for people or families who stream most home entertainment.',
						'options': []
					},
				],
				'options': [
				
				]
			},
			'cable': {
				'plans': [
					
				],
				'options': [
				
				]
			},
			'phone': {
				'plans': [
					
				],
				'options': [
					
				]
			}
		},
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
	created: function() {
		var internet = this.getUrlParameter('internet');
		var cable = this.getUrlParameter('cable');
		var phone = this.getUrlParameter('phine');
		if (this.getUrlParameter('address') !== '')
			order.serviceaddress = this.getUrlParameter('address');
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
	computed: {
		isBundled: function() {
			var cnt = 0;
			if (order.internet.status !== 'unordered')
				cnt++;
			if (order.cable.status !== 'unordered')
				cnt++;
			if (order.phone.status !== 'unordered')
				cnt++;
			if (cnt > 1)
				return true;
			else
				return false;
		}
	},
	methods: {
		ShowInternet: function() {
			order.internet.status = 'inProgress';
			if (order.cable.status !== 'ordered')
				order.cable = { 'status': 'unordered' };
			if (order.phone.status !== 'ordered')
				order.phone = { 'status': 'unordered' };
			this.ShowHide();
		},
		ShowCable: function() {
			if (order.internet.status !== 'ordered')
				order.internet = { 'status': 'unordered' };
			order.cable.status = 'inProgress';
			if (order.phone.status !== 'ordered')
				order.phone = { 'status': 'unordered' };
			this.ShowHide();
		},
		ShowPhone: function() {
			if (order.internet.status !== 'ordered')
				order.internet = { 'status': 'unordered' };
			if (order.cable.status !== 'ordered')
				order.cable = { 'status': 'unordered' };
			order.phone.status = 'inProgress';
			this.ShowHide();
		},
		ShowNone: function() {
			if (order.internet.status !== 'ordered')
				order.internet = { 'status': 'unordered' };
			if (order.cable.status !== 'ordered')
				order.cable = { 'status': 'unordered' };
			if (order.phone.status !== 'ordered')
				order.phone = { 'status': 'unordered' };
			this.ShowHide();
		},
		ShowHide: function() {
			// Internet default
			state.signupServiceListInternet = false;
			state.serviceOptionStatusSelectedInternet = true;
			state.serviceOptionStatusInternet = false;
			state.serviceItemIntroInternet = false;
			state.bandwidthCalculator = false;
			state.serviceItemOptionsInternet = false;
			state.serviceItemFooterInternet = false;
			state.packageSelectInternet = false;
			// Cable default
			state.signupServiceListCable = false;
			state.serviceOptionStatusSelectedCable = true;
			state.serviceOptionStatusCable = false;
			state.serviceItemIntroCable = false;
			state.serviceItemOptionsCable = false;
			state.serviceItemFooterCable = false;
			state.packageSelectCable = false;
			// Phone default
			state.signupServiceListPhone = false;
			state.serviceOptionStatusSelectedPhone = true;
			state.serviceOptionStatusPhone = false;
			state.serviceItemIntroPhone = false;
			state.serviceItemOptionsPhone = false;
			state.serviceItemFooterPhone = false;
			state.packageSelectPhone = false;
			// Review and signup default
			state.signupServiceBundleFourSavings = true;
			state.bfsItemLayout2ColInternet = true;
			state.bfsItemLayout2ColCable = true;
			state.bfsItemLayout2ColPhone = true;
			state.signupServiceReviewYourRequest = false;
			state.signupServiceSignMeUp = false;
			state.smuContentForm = false;
			// Internet status
			if (order.internet.status === 'ordered') {
				state.signupServiceListInternet = true;
				state.packageSelectInternet = true;
				state.bfsItemLayout2ColInternet = false;
			} else if (order.internet.status === 'inProgress') {
				state.signupServiceListInternet === true;
				state.serviceOptionStatusSelectedInternet = false;
				state.serviceOptionStatusInternet = true;
				state.serviceItemIntroInternet = true;
				state.bandwidthCalculator = true;
				state.serviceItemOptionsInternet = true;
				state.serviceItemFooterInternet = true;
				state.signupServiceBundleFourSavings = false;
			} else if (order.internet.status === 'unordered') {
			} else if (order.internet.status === 'notAvailable') {
			} else {
				throw "The order internet status is invalid.";
			}
			// Cable status
			if (order.Cable.status === 'ordered') {
				state.signupServiceListCable = true;
				state.packageSelectCable = true;
				state.bfsItemLayout2ColCable = false;
			} else if (order.Cable.status === 'inProgress') {
				state.signupServiceListCable === true;
				state.serviceOptionStatusSelectedCable = false;
				state.serviceOptionStatusCable = true;
				state.serviceItemIntroCable = true;
				state.serviceItemOptionsCable = true;
				state.serviceItemFooterCable = true;
				state.signupServiceBundleFourSavings = false;
			} else if (order.Cable.status === 'unordered') {
			} else if (order.Cable.status === 'notAvailable') {
			} else {
				throw "The order Cable status is invalid.";
			}
			// Phone status
			if (order.Phone.status === 'ordered') {
				state.signupServiceListPhone = true;
				state.packageSelectPhone = true;
				state.bfsItemLayout2ColPhone = false;
			} else if (order.Phone.status === 'inProgress') {
				state.signupServiceListPhone === true;
				state.serviceOptionStatusSelectedPhone = false;
				state.serviceOptionStatusPhone = true;
				state.serviceItemIntroPhone = true;
				state.serviceItemOptionsPhone = true;
				state.serviceItemFooterPhone = true;
				state.signupServiceBundleFourSavings = false;
			} else if (order.Phone.status === 'unordered') {
			} else if (order.Phone.status === 'notAvailable') {
			} else {
				throw "The order Phone status is invalid.";
			}
			// Review and signup status
			if (order.internet.status !== 'inProgress' &&
					order.internet.status !== 'inProgress' &&
					order.internet.status !== 'inProgress' &&
					(order.internet.status === 'ordered' ||
					 order.internet.status === 'ordered' ||
					 order.internet.status === 'ordered')) {
				state.signupServiceReviewYourRequest = true;
				state.signupServiceSignMeUp = true;
			}
		},
		
		// ShowHideState: function(name, value) {
		// 	if (!(name in state))
		// 		throw "The ShowHideState name does not exist in the state object.";
		// 	if ((['show','hide']).includes(value) === false)
		// 		throw "The ShowHideState value must be show or hide.";
		// 	if ((['signupServiceListInternet',
		// 			'serviceOptionStatusSelectedInternet',
		// 			'serviceOptionStatusInternet',
		// 			'serviceItemIntroInternet',
		// 			'bandwidthCalculator',
		// 			'serviceItemOptionsInternet',
		// 			'packageSelectInternet',
		// 		'signupServiceListCable',
		// 			'serviceOptionStatusSelectedCable',
		// 			'serviceOptionStatusCable',
		// 			'serviceItemIntroCable',
		// 			'serviceItemOptionsCable',
		// 			'packageSelectCable',
		// 		'signupServiceListPhone',
		// 			'serviceOptionStatusSelectedPhone',
		// 			'serviceOptionStatusPhone',
		// 			'serviceItemIntroPhone',
		// 			'serviceItemOptionsPhone',
		// 			'packageSelectPhone',
		// 		'signupServiceBundleForSavings',
		// 		'signupServiceReviewYourRequest',
		// 		'signupServiceSignMeUp',
		// 			'smuContentForm']).includes(name)) {
		// 		if (value == 'show')
		// 			state[name] = 'block';
		// 		else
		// 			state[name] = 'none';
		// 	} else if ((['bfsItemLayout2ColInternet',
		// 		'bfsItemLayout2ColCable',
		// 		'bfsItemLayout2ColPhone']).includes(name)) {
		// 		if (value == 'show')
		// 			state[name] = 'grid';
		// 		else
		// 			state[name] = 'none';
		// 		
		// 	} else if ((['serviceItemFooterInternet',
		// 		'serviceItemFooterCable',
		// 		'serviceItemFooterPhone']).includes(name)) {
		// 		if (value == 'show')
		// 			state[name] = 'flex';
		// 		else
		// 			state[name] = 'none';
		// 	}
		// },
		
		
		// Utility functions
		getUrlParameter: function(name) {
			name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
			var results = regex.exec(location.search);
			return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
		}
	}
})