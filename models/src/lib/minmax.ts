export const minMaxOptions = ['auto', 'max-content', 'min-content'] as const;

export type MinMaxOptions = (typeof minMaxOptions)[number];
