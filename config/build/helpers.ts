/* eslint-disable unicorn/no-array-reduce */
import {converter, formatCss} from 'culori';

const oklch = converter('oklch');

/**
 * Generates a pallette of okclh colors based on an input color.
 * @param color - The color from which to generate a pallete. Can be in any format accepted by Culori's parse function (https://culorijs.org/api/#parse).
 * @returns a pallete of colors in oklch format, formatted as an object appropriate for a tailwind config.
 */
export function getColorPallete(color: string) {
	const oklchColor = oklch(color);
	if (!oklchColor)
		throw new Error(
			'Something wrong happened during color conversion; most likely the string you supplied is not formatted correctly',
		);
	oklchColor.l = Number(oklchColor.l.toFixed(1));
	oklchColor.c = Number(oklchColor.c.toFixed(3));
	oklchColor.h = Number(oklchColor.h?.toFixed(2));
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const colorPallete = {DEFAULT: formatCss(oklchColor)};
	return [...Array.from({length: 9}).keys()].reduce<Record<number, string>>(
		(pallette, key) => {
			const newColor = {...oklchColor};
			newColor.l = Number((0.9 - key / 10).toFixed(1));
			pallette[(key + 1) * 100] = formatCss(newColor) ?? 'error';
			return pallette;
		},
		colorPallete,
	);
}

/**
 * Generates a spacing scale formatted for a tailwind config.
 * Utilizes the function ⌈(x^3 + 3x^2 + 8x) / factor⌉, where `factor` is determined by the level you pass in.
 * @param level - the degree to while you want your spacing scale spaced out. 1 = closer values; 4 = more spaced values.
 * @returns the spacing scale, formatted as an object appropriate for a tailwind config.
 */
export function getSpacingScale(level: 1 | 2 | 3 | 4) {
	const spacingFactor = (level + 2) / 72;
	return [...Array.from({length: 25 - level}).keys()].reduce<
		Record<number, string>
	>((spacingHash, key) => {
		spacingHash[key] = `${Math.ceil(
			(key ** 3 + 3 * key ** 2 + 8 * key) * spacingFactor,
		)}px`;
		return spacingHash;
	}, {});
}
