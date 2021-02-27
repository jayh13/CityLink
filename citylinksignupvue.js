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
						'non-profit': {
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
						'non-profit': {
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
						'non-profit': {
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
						'non-profit': {
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
						'non-profit': {
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
						'non-profit': {
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
			'signup-service-list-internet': true,
			  'service-option-status-selected-internet': false,
			  'service-option-status-internet': true,
			  'service-item-intro-internet': true,
			  'bandwidth-calculator': true,
			  'service-item-options-internet': true,
			  'service-item-footer-internet': true,
			  'package-select-internet': false,
			'signup-service-list-cable': false,
			  'service-option-status-selected-cable': false,
			  'service-option-status-cable': true,
			  'service-item-intro-cable': true,
			  'service-item-options-cable': true,
			  'service-item-footer-cable': true,
			  'package-select-cable': false,
			'signup-service-list-phone': false,
			  'service-option-status-selected-phone': false,
			  'service-option-status-phone': true,
			  'service-item-intro-phone': true,
			  'service-item-options-phone': true,
			  'service-item-footer-phone': true,
			  'package-select-phone': false,
			'signup-service-bundle-for-savings': false,
				'bfs-item-layout-2-col-internet': false,
				'bfs-item-layout-2-col-cable': false,
				'bfs-item-layout-2-col-phone': false,
			'signup-service-review-your-request': false,
			'signup-service-sign-me-up': false,
				'smu-content-form': false
		},
		'state-old': {
			'signup-service-list-internet': 'block',
			  'service-option-status-selected-internet': 'none',
			  'service-option-status-internet': 'block',
			  'service-item-intro-internet': 'block',
			  'bandwidth-calculator': 'block',
			  'service-item-options-internet': 'block',
			  'service-item-footer-internet': 'block',
			  'package-select-internet': 'none',
			'signup-service-list-cable': 'none',
			  'service-option-status-selected-cable': 'none',
			  'service-option-status-cable': 'block',
			  'service-item-intro-cable': 'block',
			  'service-item-options-cable': 'block',
			  'service-item-footer-cable': 'flex',
			  'package-select-cable': 'none',
			'signup-service-list-phone': 'none',
			  'service-option-status-selected-phone': 'none',
			  'service-option-status-phone': 'block',
			  'service-item-intro-phone': 'block',
			  'service-item-options-phone': 'block',
			  'service-item-footer-phone': 'flex',
			  'package-select-phone': 'none',
			'signup-service-bundle-for-savings': 'none',
				'bfs-item-layout-2-col-internet': 'none',
				'bfs-item-layout-2-col-cable': 'none',
				'bfs-item-layout-2-col-phone': 'none',
			'signup-service-review-your-request': 'none',
			'signup-service-sign-me-up': 'none',
				'smu-content-form': 'none',
		},
		'working-on': undefined
	},
	created: function() {
		var internet = getUrlParameter('internet');
		var cable = getUrlParameter('cable');
		var phone = getUrlParameter('phine');
		if (getUrlParameter('address') !== '')
			order.serviceaddress = getUrlParameter('address');
		if (internet) {
			ShowInternet();
		} else if (cable) {
			ShowCable();
		} else if (phone) {
			ShowPhone();
		} else {
			ShowNone();
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
		ShowHideState: function(name, value) {
			if (!(name in state))
				throw "The ShowHideState name does not exist in the state object.";
			if ((['show','hide']).includes(value) === false)
				throw "The ShowHideState value must be show or hide.";
			if ((['signup-service-list-internet',
					'service-option-status-selected-internet',
					'service-option-status-internet',
					'service-item-intro-internet',
					'bandwidth-calculator',
					'service-item-options-internet',
					'package-select-internet',
				'signup-service-list-cable',
					'service-option-status-selected-cable',
					'service-option-status-cable',
					'service-item-intro-cable',
					'service-item-options-cable',
					'package-select-cable',
				'signup-service-list-phone',
					'service-option-status-selected-phone',
					'service-option-status-phone',
					'service-item-intro-phone',
					'service-item-options-phone',
					'package-select-phone',
				'signup-service-bundle-for-savings',
				'signup-service-review-your-request',
				'signup-service-sign-me-up',
					'smu-content-form']).includes(name)) {
				if (value == 'show')
					state[name] = 'block';
				else
					state[name] = 'none';
			} else if ((['bfs-item-layout-2-col-internet',
				'bfs-item-layout-2-col-cable',
				'bfs-item-layout-2-col-phone']).includes(name)) {
				if (value == 'show')
					state[name] = 'grid';
				else
					state[name] = 'none';
				
			} else if ((['service-item-footer-internet',
				'service-item-footer-cable',
				'service-item-footer-phone']).includes(name)) {
				if (value == 'show')
					state[name] = 'flex';
				else
					state[name] = 'none';
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