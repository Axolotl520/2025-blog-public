import { create } from 'zustand'
import siteContent from '@/config/site-content.json'
import defaultCardStyles from '@/config/card-styles-default.json'
import cardStylesOverrides from '@/config/card-styles.json'

export type SiteContent = typeof siteContent
export type CardStyles = typeof defaultCardStyles

const mergeCardStyles = (defaults: CardStyles, overrides: unknown): CardStyles => {
	const merged = { ...defaults } as Record<string, any>
	const overridesRecord = (overrides ?? {}) as Record<string, any>

	for (const key of Object.keys(overridesRecord)) {
		const base = merged[key]
		const patch = overridesRecord[key]
		if (base && typeof base === 'object' && patch && typeof patch === 'object') {
			merged[key] = { ...base, ...patch }
		} else {
			merged[key] = patch
		}
	}

	return merged as CardStyles
}

const initialCardStyles: CardStyles = mergeCardStyles(defaultCardStyles, cardStylesOverrides)

interface ConfigStore {
	siteContent: SiteContent
	cardStyles: CardStyles
	regenerateKey: number
	configDialogOpen: boolean
	setSiteContent: (content: SiteContent) => void
	setCardStyles: (styles: CardStyles) => void
	resetSiteContent: () => void
	resetCardStyles: () => void
	regenerateBubbles: () => void
	setConfigDialogOpen: (open: boolean) => void
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
	siteContent: { ...siteContent },
	cardStyles: initialCardStyles,
	regenerateKey: 0,
	configDialogOpen: false,
	setSiteContent: (content: SiteContent) => {
		set({ siteContent: content })
	},
	setCardStyles: (styles: CardStyles) => {
		set({ cardStyles: styles })
	},
	resetSiteContent: () => {
		set({ siteContent: { ...siteContent } })
	},
	resetCardStyles: () => {
		set({ cardStyles: initialCardStyles })
	},
	regenerateBubbles: () => {
		set(state => ({ regenerateKey: state.regenerateKey + 1 }))
	},
	setConfigDialogOpen: (open: boolean) => {
		set({ configDialogOpen: open })
	}
}))

