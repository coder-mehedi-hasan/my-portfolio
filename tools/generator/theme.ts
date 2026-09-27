export const theme = {
  background: '#0f1218',
  surface: '#171d27',
  raised: '#1f2632',
  border: '#2c3543',
  borderActive: '#5b8def',
  text: '#e3e7ef',
  muted: '#7f8b9e',
  faint: '#5b6577',
  accent: '#5b8def',
  success: '#3fbf87',
  warning: '#d9a441',
  danger: '#e2586b',
  draft: '#9a86d8',
} as const;

export type Tone = keyof Pick<typeof theme, 'muted' | 'faint' | 'accent' | 'success' | 'warning' | 'danger' | 'draft' | 'text'>;

export const tone = (name: Tone): string => theme[name];
