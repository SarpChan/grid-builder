import { Area, Grid, Unit, Viewport } from '@grid-builder/models';
import { GridsState, ItemState } from '@grid-builder/state';
import { generateMediaQuery } from './media-query';
import { generateGridCss } from './grid-css';
import { generateAreaInstanceCss } from './area-instance-css';
import { generateGridHtml } from './grid-html';
import { generateAreaHtml } from './area-html';

export const generateRaw = (gridState: GridsState, areaState: ItemState) => {
  const sortedGrids = sortGrids(Object.values(gridState.entities) as Grid[]);
  const areas = Object.values(areaState.entities) as Area[];
  const classText = gridState.useClassName ? 'className' : 'class';
  const lines: string[] = sortedGrids
    .map((grid, i) => {
      const areasCss: string[] = areas
        .filter((area) => area.connections.length > 0)
        .map((item, j) =>
          generateAreaInstanceCss(grid, item, j === areas.length - 1)
        )
        .flat();

      const gridCss = generateGridCss(grid, areasCss);

      return generateMediaQuery(
        gridState.referenceContainer,
        grid.viewport,
        gridCss,
        i === sortedGrids.length - 1
      );
    })
    .flat();

  const completeCSSPerGrid = indentCss(lines);

  const areasHtml = areas
    .filter((area) => area.connections.length > 0)
    .map((item) => generateAreaHtml(item, classText))
    .flat();

  const completeHtml = indentHtml(generateGridHtml(areasHtml, classText));
  return { html: completeHtml.join('\n'), css: completeCSSPerGrid.join('\n') };
};

export const generateTailwind = (
  gridState: GridsState,
  areaState: ItemState
) => {
  const sortedGrids = sortGrids(Object.values(gridState.entities) as Grid[]);
  const areas = Object.values(areaState.entities) as Area[];
  const classText = gridState.useClassName ? 'className' : 'class';

  const gridViewportMappings = sortedGrids.map((grid) => {
    if (grid.viewport.limiter === 'to') {
      return {
        ...grid,
        mediaQuery: `max-[${grid.viewport.to.value}${grid.viewport.to.unit}]:`,
      };
    }
    if (grid.viewport.limiter === 'from') {
      return {
        ...grid,
        mediaQuery: `min-[${grid.viewport.from.value}${grid.viewport.from.unit}]:`,
      };
    }
    if (grid.viewport.limiter === 'from_to') {
      return {
        ...grid,
        mediaQuery: `min-[${grid.viewport.from.value}${grid.viewport.from.unit}]:max-[${grid.viewport.to.value}${grid.viewport.to.unit}]:`,
      };
    }
    return { ...grid, mediaQuery: '' };
  });

  const areaClasses = areas
    .filter((area) => area.connections.length > 0)
    .map((area) => {
      const newArea = {
        ...area,
        classes: gridViewportMappings.map((grid) => {
          if (
            area.connections.find((connection) => connection.gridId === grid.id)
          ) {
            const areaInstance = sortedGrids
              .find((g) => g.id === grid.id)
              ?.items?.find((a) => a.areaId === area.id);

            if (areaInstance) {
              return [
                `${grid.mediaQuery}block`,
                `${grid.mediaQuery}row-start-[${areaInstance.rowStart}]`,
                `${grid.mediaQuery}row-end-[${areaInstance.rowEnd}]`,
                `${grid.mediaQuery}col-start-[${areaInstance.colStart}]`,
                `${grid.mediaQuery}col-end-[${areaInstance.colEnd}]`,
              ];
            }
          }
          return [`${grid.mediaQuery}hidden`];
        }),
      };
      if (newArea.classes.length > 1) {
        newArea.classes.push([`bg-[${area.color}]`]);
      }
      return newArea;
    });

  const gridClasses = gridViewportMappings.map((grid) => {
    const hGap = `${grid.hGap?.value}${grid.hGap?.unit}`;
    const vGap = `${grid.vGap?.value}${grid.vGap?.unit}`;
    const gap =
      hGap === vGap
        ? [`gap-[${hGap}]`]
        : [`gap-x-[${hGap}]`, `gap-y-[${vGap}]`];
    const rows = grid.rows?.length
      ? [
          `${grid.mediaQuery}grid-rows-[${grid.rows
            .map((row) => `${row.height.value}${row.height.unit}`)
            .join('_')}]`,
        ]
      : [];
    const cols = grid.columns?.length
      ? [
          `${grid.mediaQuery}grid-cols-[${grid.columns
            .map((col) => `${col.width.value}${col.width.unit}`)
            ?.join('_')}]`,
        ]
      : [];

    return [`${grid.mediaQuery}grid`, ...gap, ...rows, ...cols];
  });

  const areaHtml = areaClasses.map((area) => {
    return `<div ${classText}="${area.classes.flat().join(' ')}"></div>`;
  });

  const gridHtml = [
    `<div ${classText}="${gridClasses.flat().join(' ')}">`,
    ...areaHtml,
    `</div>`,
  ];

  return { html: indentHtml(gridHtml).join('\n'), css: undefined };
};

const indentCss = (lines: string[], spaces = 2) => {
  let currentIndentLevel = 0;
  return lines.map((line) => {
    if (line.startsWith('}')) {
      currentIndentLevel--;
    }
    const indentedLine = ' '.repeat(currentIndentLevel * spaces) + line;
    if (line.endsWith('{')) {
      currentIndentLevel++;
    }
    return indentedLine;
  });
};

const indentHtml = (lines: string[], spaces = 2) => {
  let currentIndentLevel = 0;
  return lines.map((line) => {
    if (line.startsWith('<') && !line.startsWith('</')) {
      currentIndentLevel++;
    }
    const indentedLine = ' '.repeat(currentIndentLevel * spaces) + line;
    if (line.includes('</')) {
      currentIndentLevel--;
    }
    return indentedLine;
  });
};

const sortGrids = (grids: Grid[]) => {
  // Sort grids by viewport where none is first, to is second, from is third and from_to is last

  return grids.sort((a, b) => {
    const order = ['none', 'to', 'from', 'from_to'];

    if (a.viewport.limiter !== b.viewport.limiter) {
      return (
        order.indexOf(a.viewport.limiter) - order.indexOf(b.viewport.limiter)
      );
    }

    if (a.viewport.limiter === 'to') {
      // descending
      return -1 * ((a.viewport.to.value ?? 0) - (b.viewport.to.value ?? 0));
    }

    if (a.viewport.limiter === 'from' || a.viewport.limiter === 'none') {
      // ascending
      return (a.viewport.from.value ?? 0) - (b.viewport.from.value ?? 0);
    }

    return 0;
  });
};

export const checkNoViewportOverlap = (grids: Grid[]) => {
  const warnings = new Set<string>();
  const errors = new Set<string>();
  grids.forEach((grid) => {
    grids.forEach((grid2) => {
      if (grid.id === grid2.id) {
        return;
      }

      checkBothTo(grid.viewport, grid2.viewport, warnings, errors);
      checkBothFrom(grid.viewport, grid2.viewport, warnings, errors);
      checkBothNone(grid.viewport, grid2.viewport, errors);
      checkBothFromTo(grid.viewport, grid2.viewport, warnings, errors);

      checkFromNone(grid, grid, errors);
      checkToNone(grid, grid2, errors);
      checkFromToNone(grid, grid2, errors);

      checkFromTo(grid, grid2, warnings);
    });
  });

  return { warnings, errors };
};

const checkFromToNone = (grid1: Grid, grid2: Grid, errors: Set<string>) => {
  if (
    grid1.viewport.limiter === 'from_to' &&
    grid2.viewport.limiter === 'none' &&
    (!grid1.viewport.from.value || grid1.viewport.from.value === 0) &&
    (!grid1.viewport.to.value || grid1.viewport.to.value === 0)
  ) {
    errors.add(
      `Grid ${grid1.name} defines both boundaries, but they are equal to not having any at all. This clashes with grid ${grid2.name}`
    );
  }
};

const checkToNone = (grid1: Grid, grid2: Grid, errors: Set<string>) => {
  if (
    grid1.viewport.limiter === 'to' &&
    grid2.viewport.limiter === 'none' &&
    (!grid1.viewport.to.value || grid1.viewport.to.value === 0)
  ) {
    errors.add(
      `Grid ${grid1.name} defines an upper boundary, but it is equal to not having one at all. This clashes with grid ${grid2.name}`
    );
  }
};

const checkFromNone = (grid1: Grid, grid2: Grid, errors: Set<string>) => {
  if (
    grid1.viewport.limiter === 'from' &&
    grid2.viewport.limiter === 'none' &&
    (!grid1.viewport.from.value || grid1.viewport.from.value === 0)
  ) {
    errors.add(
      `Grid ${grid1.name} defines a lower boundary, but it is equal to not having one at all. This clashes with grid ${grid2.name}`
    );
  }
};

const checkFromTo = (grid1: Grid, grid2: Grid, warnings: Set<string>) => {
  if (
    grid1.viewport.limiter === 'from' &&
    grid2.viewport.limiter === 'to' &&
    grid1.viewport.from.value !== undefined &&
    grid2.viewport.to !== undefined &&
    grid1.viewport.from.value <= grid2.viewport.to.value
  ) {
    warnings.add(
      `Grids ${grid1.name} and ${grid2.name} have overlapping viewports. ${grid1.name} starts at ${grid1.viewport.from.value} and ${grid2.name} ends at ${grid2.viewport.to.value}`
    );
  }
};

const checkBothTo = (
  viewport1: Viewport,
  viewport2: Viewport,
  warnings: Set<string>,
  errors: Set<string>
) => {
  if (viewport1.limiter === 'to' && viewport2.limiter === 'to') {
    if (
      viewport1.to.value &&
      viewport2.to.value &&
      viewport1.to.value === viewport2.to.value &&
      viewport1.to.unit === viewport2.to.unit
    ) {
      errors.add(
        'Multiple grids define the same media query. No generation possible'
      );
      return;
    }
    warnings.add(
      'Multiple grids define an upper boundary only. Overwrites are very probable. Your grids will be sorted in descending order'
    );
  }
};

const checkBothFrom = (
  viewport1: Viewport,
  viewport2: Viewport,
  warnings: Set<string>,
  errors: Set<string>
) => {
  if (viewport1.limiter === 'from' && viewport2.limiter === 'from') {
    if (
      viewport1.from &&
      viewport2.from &&
      viewport1.from.value === viewport2.from.value &&
      viewport1.from.unit === viewport2.from.unit
    ) {
      errors.add(
        'Multiple grids define the same media query. No generation possible'
      );
      return;
    }
    warnings.add(
      'Multiple grids define a lower boundary only. Overwrites are very probable. Your grids will be sorted in asscending order'
    );
  }
};

const checkBothNone = (
  viewport1: Viewport,
  viewport2: Viewport,
  errors: Set<string>
) => {
  if (viewport1.limiter === 'none' && viewport2.limiter === 'none') {
    errors.add('Multiple grids do not define a boundary.');
  }
};

const checkBothFromTo = (
  viewport1: Viewport,
  viewport2: Viewport,
  warnings: Set<string>,
  errors: Set<string>
) => {
  const unit = Array.from(
    new Set<Unit>([
      viewport1.from.unit,
      viewport2.to.unit,
      viewport1.to.unit,
      viewport2.from.unit,
    ])
  ).filter(Boolean) as Unit[];

  if (
    viewport1.limiter === 'from_to' &&
    viewport2.limiter === 'from_to' &&
    unit.length === 1
  ) {
    const from1 = viewport1.from.value ?? 0;
    const to1 = viewport2.to.value ?? 0;

    const from2 = viewport1.from.value ?? 0;
    const to2 = viewport2.to.value ?? 0;

    if (
      // is grid 1 start between grid 2 values
      (from1 >= from2 && from1 <= to2) ||
      // is grid 1 end between grid 2 values
      (to1 >= from2 && to1 <= to2) ||
      // is grid 2 start between grid 1 values
      (from2 >= from1 && from2 <= to1) ||
      // is grid 2 end between grid 1 values
      (to2 >= from1 && to2 <= to1)
    ) {
      errors.add('Viewports of grids are overlapping');
    }

    warnings.add(
      'Multiple grids define a lower boundary only. Overwrites are very probable. Your grids will be sorted in asscending order'
    );

    return;
  }
};
