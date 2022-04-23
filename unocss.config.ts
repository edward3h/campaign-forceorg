import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    presetWebFonts,
    // transformerDirectives,
    // transformerVariantGroup,
  } from 'unocss'
  
  export default defineConfig({
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block text-white cursor-pointer border-2 border-gray-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
      ['label', 'py-1 border-2 border-black rounded inline-block text-white'],
      ['slot', 'border-gray-800 border-2'],
      ['slot-full', 'w-10 h-10'],
      ['slot-thin', 'w-4 h-10 b-l-none sm:w-10 sm:h-4 sm:b-t-none'],
    ],
    safelist: [
      'slot-full',
      ...Array.from({ length: 10 }, (_, i) => `bg-red-${i + 1}`),
      ...Array.from({ length: 10 }, (_, i) => `bg-gray-${i + 1}`),
    ],
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
      presetWebFonts({
        fonts: {
          sans: 'DM Sans',
          serif: 'DM Serif Display',
          mono: 'DM Mono',
          title: 'Bebas Neue',
        },
      }),
    ],
    // transformers: [
    //   transformerDirectives(),
    //   transformerVariantGroup(),
    // ],
  })