import FileSaver from 'file-saver';
import {varOutput} from './helpers';

import type {IStoreTheme} from '$types/theme';

export const downloadTheme = (THEME: IStoreTheme): void => {
	let save: string;

	// Meta
	save = `/**\n${Object.entries(THEME.meta).map(([key, value]) => ` * @${key} ${value}\n`).join('')}*/\n\n`;

	// Fonts
	save += THEME.fonts ? THEME.fonts.map(url => `@import url('${url}');\n`).join('') : '';

	// Imports
	save += THEME.imports.map(url => `@import url('${url}');\n`).join('');
	let addonImports = THEME.addons.filter(obj => obj.use);
	addonImports.forEach(obj => obj.imports.forEach(url => save += `@import url('${url}');\n`));

	// Variables
	let groups: {[k: string]: any[]} = {}
	THEME.varGroups.forEach(group => {
		groups[group] = []
	});

	Object.keys(groups).forEach(group => {
		THEME.variables.forEach(vars => {
			vars.inputs.forEach(input => {
				if (input.varGroup === group || (group === ':root' && !input.varGroup)) groups[group] = [...groups[group], input.details];
			})
		});
	});

	// Add addon and hidden variables to the :root
	if (THEME.hiddenVars) {
		THEME.hiddenVars.forEach(hiddenVar => {
			const group = hiddenVar.varGroup || ':root';
			groups[group] = [...groups[group], hiddenVar];
		})
	}
	THEME.addons.forEach(addon => {
		if (addon.variables) {
			addon.variables.forEach(input => {
				if (addon.use) groups[':root'] = [...groups[':root'], input.details];
			})
		}
	})

	Object.entries(groups).forEach(([group, vars]) => {
		save += `\n${group} {\n`;
		save += vars.map(input => varOutput(input)).map(({variable, value, comment}) => `  --${variable}: ${value};${comment ? ` /* ${comment} */` : ''}\n`).join('');
		save += '}\n';
	});

	save += '\n/* Any custom CSS below here */\n\n\n';

	const file = new Blob([save], {type: 'text/plain;charset=utf-8'});
	FileSaver.saveAs(file, `${THEME.meta.name}.theme.css`);
}

// Helpers
export const generateVars = (vars: Record<string, any>[]) => {
	let object: Record<string, any>[] = [];

	vars.forEach(input => {
		object = [...object, varOutput(input)];
	})

	return object.map(({variable, value}) => `  --${variable}: ${value};\n`).join('');
}