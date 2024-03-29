import { Area, Grid } from '@grid-builder/models';

export const generateAreaInstanceCss = (
  grid: Grid,
  area: Area,
  isLast: boolean
) => {
  const lines: string[] = [];

  const areaName = area.name;
  const areaInstance = grid.items.find((a) => a.areaId === area.id);

  if (!areaInstance) {
    lines.push(`&.${areaName.toLowerCase()} {display: none;}`);

    return lines;
  }
  lines.push(`&.${areaName.toLowerCase()} {`);
  lines.push(
    `grid-area: ${areaInstance.rowStart} / ${areaInstance.colStart} / ${areaInstance.rowEnd} / ${areaInstance.colEnd};`
  );
  lines.push(
    `background-color: ${area.color.startsWith('#') ? '' : '#'}${area.color};`
  );
  lines.push(`}`);
  if (!isLast) {
    lines.push('');
  }
  return lines;
};
