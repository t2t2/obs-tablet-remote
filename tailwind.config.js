const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	purge: [
		'./public/**/*.html',
		'./src/**/*.vue'
	],
	theme: {
		extend: {
			backgroundColor: {
				overlay: 'rgba(0, 0, 0, 0.2)'
			},
			boxShadow: {
				'md-light': lightVariant(defaultTheme.boxShadow.md),
				'lg-light': lightVariant(defaultTheme.boxShadow.lg),
				'xl-light': lightVariant(defaultTheme.boxShadow.xl),
				'2xl-light': lightVariant(defaultTheme.boxShadow['2xl'])
			},
			width: {
				'1/2': 'calc(100%/2)',
				'1/3': 'calc(100%/3)',
				'2/3': 'calc(100%/3*2)',
				'1/4': 'calc(100%/4)',
				'3/4': 'calc(100%/4*3)',
				'1/5': 'calc(100%/5)',
				'2/5': 'calc(100%/5*2)',
				'3/5': 'calc(100%/5*3)',
				'4/5': 'calc(100%/5*4)'
			},
			height: {
				'1/2': 'calc(100%/2)',
				'1/3': 'calc(100%/3)',
				'2/3': 'calc(100%/3*2)',
				'1/4': 'calc(100%/4)',
				'3/4': 'calc(100%/4*3)',
				'1/5': 'calc(100%/5)',
				'2/5': 'calc(100%/5*2)',
				'3/5': 'calc(100%/5*3)',
				'4/5': 'calc(100%/5*4)'
			},
			maxWidth: {
				1: '1rem',
				2: '2rem',
				3: '3rem',
				4: '4rem',
				5: '5rem',
				6: '6rem',
				7: '7rem',
				8: '8rem',
				9: '9rem',
				10: '10rem',
				12: '12rem',
				14: '14rem',
				16: '16rem',
				18: '18rem',
				20: '20rem',
				'1/2': 'calc(100%/2)',
				'1/3': 'calc(100%/3)',
				'2/3': 'calc(100%/3*2)',
				'1/4': 'calc(100%/4)',
				'3/4': 'calc(100%/4*3)',
				'1/5': 'calc(100%/5)',
				'2/5': 'calc(100%/5*2)',
				'3/5': 'calc(100%/5*3)',
				'4/5': 'calc(100%/5*4)'
			},
			maxHeight: {
				1: '1rem',
				2: '2rem',
				3: '3rem',
				4: '4rem',
				5: '5rem',
				6: '6rem',
				7: '7rem',
				8: '8rem',
				9: '9rem',
				10: '10rem',
				12: '12rem',
				14: '14rem',
				16: '16rem',
				18: '18rem',
				20: '20rem',
				'1/2': 'calc(100%/2)',
				'1/3': 'calc(100%/3)',
				'2/3': 'calc(100%/3*2)',
				'1/4': 'calc(100%/4)',
				'3/4': 'calc(100%/4*3)',
				'1/5': 'calc(100%/5)',
				'2/5': 'calc(100%/5*2)',
				'3/5': 'calc(100%/5*3)',
				'4/5': 'calc(100%/5*4)'
			},
			minWidth: {
				1: '1rem',
				2: '2rem',
				3: '3rem',
				4: '4rem',
				5: '5rem',
				6: '6rem',
				7: '7rem',
				8: '8rem',
				9: '9rem',
				10: '10rem',
				12: '12rem',
				14: '14rem',
				16: '16rem',
				18: '18rem',
				20: '20rem',
				'1/2': 'calc(100%/2)',
				'1/3': 'calc(100%/3)',
				'2/3': 'calc(100%/3*2)',
				'1/4': 'calc(100%/4)',
				'3/4': 'calc(100%/4*3)',
				'1/5': 'calc(100%/5)',
				'2/5': 'calc(100%/5*2)',
				'3/5': 'calc(100%/5*3)',
				'4/5': 'calc(100%/5*4)'
			},
			minHeight: {
				1: '1rem',
				2: '2rem',
				3: '3rem',
				4: '4rem',
				5: '5rem',
				6: '6rem',
				7: '7rem',
				8: '8rem',
				9: '9rem',
				10: '10rem',
				12: '12rem',
				14: '14rem',
				16: '16rem',
				18: '18rem',
				20: '20rem',
				'1/2': 'calc(100%/2)',
				'1/3': 'calc(100%/3)',
				'2/3': 'calc(100%/3*2)',
				'1/4': 'calc(100%/4)',
				'3/4': 'calc(100%/4*3)',
				'1/5': 'calc(100%/5)',
				'2/5': 'calc(100%/5*2)',
				'3/5': 'calc(100%/5*3)',
				'4/5': 'calc(100%/5*4)'
			},
		}
	},
	variants: {},
	plugins: []
}

function lightVariant(value) {
	return value.replace('0, 0, 0', '255, 255, 255')
}
