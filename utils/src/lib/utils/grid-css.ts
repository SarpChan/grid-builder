import { Grid } from '@grid-builder/models';

export const generateGridCss = (grid: Grid, children: string[]) => {
  const gridName = grid.name;
  const gridTemplateColumns = grid.columns
    .map((column) => `${column.width.value}${column.width.unit}`)
    .join(' ');
  const gridTemplateRows = grid.rows
    .map((row) => `${row.height.value}${row.height.unit}`)
    .join(' ');
  const gap = `gap: ${grid.hGap?.value ?? 0}${grid.hGap?.unit ?? 'px'} ${
    grid.vGap?.value ?? 0
  }${grid.vGap?.unit ?? 'px'}`;
  const display = 'display: grid;';

  const lines = [
    `.generatedGrid {`,
    `// Grid: ${gridName}`,
    `${display}`,
    `grid-template-columns: ${gridTemplateColumns};`,
    `grid-template-rows: ${gridTemplateRows};`,
    `${gap}`,
    `grid-auto-flow: ${grid.autoFlow}`,
    ...children,
    `}`,
  ];
  return lines;
};
