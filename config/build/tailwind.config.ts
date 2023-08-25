/* eslint-disable @typescript-eslint/naming-convention */
import type {Config} from 'tailwindcss';
import colors from 'tailwindcss/colors';
import {getIconCollections, iconsPlugin} from '@egoist/tailwindcss-icons';
import {getColorPallete, getSpacingScale} from './helpers.js';

const twconfig: Config = {
	future: {
		respectDefaultRingColorOpacity: true,
	},
	content: ['./templates/**/*'],
	theme: {
		extend: {
			transitionProperty: {
				height: 'height',
				spacing: 'padding, margin',
			},
			screens: {
				xs: '460px',
			},
			colors: {
				primary: getColorPallete('#0aa'),
				base: colors.zinc,
			},
			ringColor: ({theme}) => ({
				DEFAULT: theme('colors.primary.DEFAULT') as string,
			}),
		},
		spacing: getSpacingScale(4),
		fontFamily: {
			primary: 'Roboto Serif',
		},
	},
	plugins: [
		iconsPlugin({
			// Select the icon collections you want to use
			collections: getIconCollections(['teenyicons']),
		}),
	],
};

export default twconfig;
