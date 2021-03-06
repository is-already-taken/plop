module.exports = function (plop) {
	'use strict';

	// helpers are passed through to handlebars and made
	// available for use in the generator templates

	// adds 4 dashes around some text
	plop.addHelper('dashAround', function (text) {
		return '---- ' + text + ' ----';
	});

	// formats an array of options like you would write
	// it if you were speaking (one, two, and three)
	plop.addHelper('wordJoin', function (words) {
		return words.join(', ').replace(/(:?.*),/, '$1, and');
	});

	// setGenerator creates a generator that can be run with "plop generatorName"
	plop.setGenerator('test', {
		description: 'this is a test',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is your name?',
				validate: function (value) {
					if ((/.+/).test(value)) { return true; }
					return 'name is required';
				}
			}, {
				type: 'input',
				name: 'age',
				message: 'How old are you?',
				validate: function (value) {
					var digitsOnly = /\d+/;
					if (digitsOnly.test(value)) { return true; }
					return 'Invalid age! Must be a number genius!'
				}
			}, {
				type: 'checkbox',
				name: 'toppings',
				message: 'What pizza toppings to you like?',
				choices: [
					{name: 'Cheese', value: 'cheese', checked: true},
					{name: 'Peperonni', value: 'peperonni'},
					{name: 'Pineapple', value: 'pineapple'},
					{name: 'Mushroom', value: 'mushroom'},
					{name: 'Bacon', value: 'bacon'}
				]
			}
		],
		actions: [
			{
				type: 'add',
				path: 'folder/{{dashCase name}}.txt',
				templateFile: 'templates/temp.txt',
				abortOnFail: true
			},{
				type: 'modify',
				path: 'change-me.txt',
				pattern: /(-- APPEND ITEMS HERE --)/gi,
				template: '$1\r\n{{name}}: {{age}}'
			},{
				type: 'modify',
				path: 'change-me.txt',
				pattern: /(-- PREPEND ITEMS HERE --)/gi,
				templateFile: 'templates/part.txt'
			},{
				type: 'modify',
				path: 'change-me.txt',
				pattern: /## replace name here ##/gi,
				template: 'replaced => {{dashCase name}}'
			}
		]
	});
};
