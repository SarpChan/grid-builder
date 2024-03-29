export const generateGridHtml = (
  children: string[],
  classText: string
): string[] => {
  return [`<div ${classText}="generatedGrid">`, ...children, `</div>`];
};
