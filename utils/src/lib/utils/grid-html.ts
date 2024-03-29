export const generateGridHtml = (children: string[]): string[] => {
  return [`<div class="generatedGrid">`, ...children, `</div>`];
};
