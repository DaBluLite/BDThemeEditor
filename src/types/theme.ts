import type {Inputs} from './inputs';
import type {IAddon} from './addon';

export type Icons = (
	'App'|
	'Border'|
	'Chat'|
	'Collections'|
	'Colour'|
	'Font'|
	'Gear'|
	'Home'|
	'Image'|
	'List'|
	'Moon'|
	'Person'|
	'Status'|
	'Sizing'|
	'Sun'
)

interface ThemeVars {
	title: string,
	icon: Icons,
	inputs: Inputs[],
	userModal?: boolean
}

interface HiddenVars {
	variable: string,
	value: string,
	varGroup?: string,
	comment?: string
}

interface Meta {
	name: string,
	author: string,
	version: string,
	description: string,
	source: string,
	invite?: string,
	donate?: string,
	patreon?: string,
	website?: string,
	authorId?: string
}



export interface ITheme {
	name: string,
	previewUrl: string,
	thumbnail: string,
	meta: Meta,
	imports: string[],
	fonts: string[],
	variables: ThemeVars[],
	hiddenVars?: HiddenVars[],
	varGroups?: string[],
	addons?: ('hsl' | 'rs' | 'columns' | 'discolored')[]
}

export interface IStoreTheme {
	name: string,
  meta: Meta,
  imports: string[],
  variables: ThemeVars[],
  addons: IAddon[],
  fonts?: string[],
  hiddenVars?: HiddenVars[]
	varGroups?: string[]
}