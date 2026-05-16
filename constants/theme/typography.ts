export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 13,
  caption: 11,
} as const;

// Absolute line-heights (px) derived from design spec ratios
export const lineHeight = {
  h1: 38,  // 32 × 1.2
  h2: 31,  // 24 × 1.3
  h3: 26,  // 20 × 1.3
  h4: 22,  // 16 × 1.4
  body: 22, // 14 × 1.6 (body-md base)
  caption: 15, // 11 × 1.4
} as const;
