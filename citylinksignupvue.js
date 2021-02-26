var app = new Vue({
	el: '#page-main',
	data: {
		'order' = {
			'servicetype': '',
			'serviceaddress': '',
			'firstname': '',
			'lastname': '',
			'email': '',
			'phone': '',
			'utilitynumber': '',
			'internet': undefined,
			'cable': undefined,
			'phone': undefined
		},
		'services' = {
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
			'internet': 'none',
			'cable': 'none',
			'phone': 'none'
		}
	},
	created: function() {
	
	}
})