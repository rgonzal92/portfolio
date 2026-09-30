import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Brand neutrals. Anchors from the brand guide (light / dark):
// background 50 / 950, cards 0 / 900, text 950 / 50, muted text 500 / 300, borders 200 / 700.
// The steps in between are interpolated in OKLab.
const SURFACE = {
  0: '#ffffff',
  50: '#fafcfe',
  100: '#ebeff4',
  200: '#dce3ea',
  300: '#aab3be',
  400: '#8791a1',
  500: '#667085',
  600: '#4c5768',
  700: '#34404c',
  800: '#26313b',
  900: '#19222b',
  950: '#121a24',
};

// Brand Blue #1572fe at 500. It is used as-is in the logos; buttons and blue text use 600 (light)
// and 400 (dark) because #1572fe itself is below WCAG AA (4.5:1) for text in both themes.
const BLUE = {
  50: '#edf5ff',
  100: '#d7e8ff',
  200: '#b0d0ff',
  300: '#84b5ff',
  400: '#5395ff',
  500: '#1572fe',
  600: '#0f5cd0',
  700: '#0947a4',
  800: '#05337a',
  900: '#022258',
  950: '#011132',
};

export const BrandPreset = definePreset(Aura, {
  semantic: {
    primary: {
      ...BLUE,
      color: 'light-dark({primary.600}, {primary.400})',
      contrastColor: 'light-dark(#ffffff, {surface.950})',
      hoverColor: 'light-dark({primary.700}, {primary.300})',
      activeColor: 'light-dark({primary.800}, {primary.200})',
    },
    surface: SURFACE,
    text: {
      color: 'light-dark({surface.950}, {surface.50})',
      mutedColor: 'light-dark({surface.500}, {surface.300})',
    },
  },
});
