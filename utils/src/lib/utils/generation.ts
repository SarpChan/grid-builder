import {
  Area,
  Grid,
  IValidationModel,
  Limiter,
  Unit,
  ValidationModel,
  Viewport,
} from '@grid-builder/models';
import { GridsState, ItemState } from '@grid-builder/state';
import { generateMediaQuery } from './media-query';
import { generateGridCss } from './grid-css';
import { generateAreaInstanceCss } from './area-instance-css';
import { generateGridHtml } from './grid-html';
import { generateAreaHtml } from './area-html';
import { ErrorCode } from 'models/src/lib/errors';
import { WarningCode } from 'models/src/lib/warnings';
import { contentAlignmentToTailwindMapping } from './content-alignment-tw-map';

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
  const containsMultipleAutoFlows =
    Array.from(new Set(gridViewportMappings.map((grid) => grid.autoFlow)))
      .length > 1;

  const gridClasses = gridViewportMappings.map((grid, index) => {
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

    const autoFlow = `${
      containsMultipleAutoFlows ? '' : grid.mediaQuery
    }grid-flow-${grid.autoFlow.split(' ').join('-')}`;

    const alignItems = `${grid.mediaQuery}items-${grid.alignItems}`;
    const justifyItems = `${grid.mediaQuery}justify-items-${grid.justifyItems}`;
    const alignContent = `${
      grid.mediaQuery
    }content-${contentAlignmentToTailwindMapping(grid.alignContent)}`;
    const justifyContent = `${
      grid.mediaQuery
    }justify-${contentAlignmentToTailwindMapping(grid.justifyContent)}`;
    return [
      `${grid.mediaQuery}grid`,
      ...gap,
      ...rows,
      ...cols,
      alignItems,
      justifyItems,
      alignContent,
      justifyContent,
      !containsMultipleAutoFlows && index === 0 ? autoFlow : undefined,
    ].filter(Boolean);
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

export const validate = (grids: Grid[], areas: Area[]) => {
  const warnings = new Set<IValidationModel>();
  const errors = new Set<IValidationModel>();

  checkNoViewportOverlap(grids, warnings, errors);
  validateGrids(grids, warnings, errors);
  validateAreas(areas, warnings, errors);

  const actualWarnings = new Set<IValidationModel>();
  const actualErrors = new Set<IValidationModel>();

  warnings.forEach((w) => {
    let isUnique = true;
    warnings.forEach((w2) => {
      if (w !== w2 && w.isEqual(w, w2)) {
        isUnique = false;
      }
    });

    if (isUnique) {
      actualWarnings.add(w);
    }
  });

  errors.forEach((e) => {
    let isUnique = true;
    actualErrors.forEach((e2) => {
      if (e !== e2 && e.isEqual(e, e2)) {
        isUnique = false;
      }
    });

    if (isUnique) {
      actualErrors.add(e);
    }
  });

  return { warnings: actualWarnings, errors: actualErrors };
};

export const validateAreas = (
  areas: Area[],
  parentWarnings?: Set<IValidationModel>,
  parentErrors?: Set<IValidationModel>
) => {
  const errors = parentErrors ?? new Set<IValidationModel>();

  areas.forEach((area) => {
    if (!area.name || area.name === '') {
      errors?.add(
        new ValidationModel(ErrorCode.AREA_MISSING_NAME, new Set([area.id]))
      );
    }

    areas.forEach((area2) => {
      if (area.id === area2.id) {
        return;
      }

      if (area.name && area.name !== '' && area.name === area2.name) {
        errors.add(
          new ValidationModel(
            ErrorCode.AREAS_WITH_SAME_NAME,
            new Set([area.id, area2.id])
          )
        );
      }
    });
  });
};

export const validateGrids = (
  grids: Grid[],
  parentWarnings?: Set<IValidationModel>,
  parentErrors?: Set<IValidationModel>
) => {
  const warnings = parentWarnings ?? new Set<IValidationModel>();
  const errors = parentErrors ?? new Set<IValidationModel>();

  if (grids.length === 0) {
    errors.add(new ValidationModel(ErrorCode.NO_GRIDS_DEFINED, new Set([])));
  }

  grids.forEach((grid) => {
    if (grids.length >= 2 && (!grid.name || grid.name === '')) {
      errors.add(
        new ValidationModel(ErrorCode.GRID_MISSING_NAME, new Set([grid.id]))
      );
    }

    if (!grid.rows || grid.rows.length === 0) {
      errors.add(
        new ValidationModel(ErrorCode.NO_ROWS_DEFINED, new Set([grid.id]))
      );
    }

    if (!grid.columns || grid.columns.length === 0) {
      errors.add(
        new ValidationModel(ErrorCode.NO_COLUMNS_DEFINED, new Set([grid.id]))
      );
    }

    grids.forEach((grid2) => {
      if (grid.id === grid2.id) {
        return;
      }

      if (grid.name && grid.name !== '' && grid.name === grid2.name) {
        errors.add(
          new ValidationModel(
            ErrorCode.GRIDS_WITH_SAME_NAME,
            new Set([grid.id, grid2.id])
          )
        );
      }
    });
  });

  return { warnings, errors };
};

export const checkNoViewportOverlap = (
  grids: Grid[],
  parentWarnings?: Set<IValidationModel>,
  parentErrors?: Set<IValidationModel>
) => {
  const warnings = parentWarnings ?? new Set<IValidationModel>();
  const errors = parentErrors ?? new Set<IValidationModel>();
  grids.forEach((grid) => {
    grids.forEach((grid2) => {
      if (grid.id === grid2.id) {
        return;
      }

      checkBothTo(grid, grid2, warnings, errors);
      checkBothFrom(grid, grid2, warnings, errors);
      checkBothNone(grid, grid2, errors);
      checkBothFromTo(grid, grid2, warnings, errors);

      checkFromNone(grid, grid, errors);
      checkToNone(grid, grid2, errors);
      checkFromToNone(grid, grid2, errors);

      checkFromTo(grid, grid2, warnings);
    });
  });

  return { warnings, errors };
};

const checkFromToNone = (
  grid1: Grid,
  grid2: Grid,
  errors: Set<IValidationModel>
) => {
  if (
    grid1.viewport.limiter === 'from_to' &&
    grid2.viewport.limiter === 'none' &&
    (!grid1.viewport.from.value || grid1.viewport.from.value === 0) &&
    (!grid1.viewport.to.value || grid1.viewport.to.value === 0)
  ) {
    errors.add(
      new ValidationModel(
        ErrorCode.EQUAL_BOUNDARIES,
        new Set([grid1.id, grid2.id])
      )
    );
  }
};

const checkToNone = (
  grid1: Grid,
  grid2: Grid,
  errors: Set<IValidationModel>
) => {
  if (
    grid1.viewport.limiter === 'to' &&
    grid2.viewport.limiter === 'none' &&
    (!grid1.viewport.to.value || grid1.viewport.to.value === 0)
  ) {
    errors.add(
      new ValidationModel(
        ErrorCode.UPPER_BOUNDARY_IS_ZERO,
        new Set([grid1.id, grid2.id])
      )
    );
  }
};

const checkFromNone = (
  grid1: Grid,
  grid2: Grid,
  errors: Set<IValidationModel>
) => {
  if (
    grid1.viewport.limiter === 'from' &&
    grid2.viewport.limiter === 'none' &&
    (!grid1.viewport.from.value || grid1.viewport.from.value === 0)
  ) {
    errors.add(
      new ValidationModel(
        ErrorCode.EQUAL_BOUNDARIES,
        new Set([grid1.id, grid2.id])
      )
    );
  }
};

const checkFromTo = (
  grid1: Grid,
  grid2: Grid,
  warnings: Set<IValidationModel>
) => {
  if (
    grid1.viewport.limiter === 'from' &&
    grid2.viewport.limiter === 'to' &&
    grid1.viewport.from.value !== undefined &&
    grid2.viewport.to !== undefined &&
    grid1.viewport.from.value <= grid2.viewport.to.value
  ) {
    warnings.add(
      new ValidationModel(
        WarningCode.OVERLAPPING_MEDIA_QUERIES,
        new Set([grid1.id, grid2.id])
      )
    );
  }
};

const checkBothTo = (
  { viewport: viewport1, id: id1 }: { viewport: Viewport; id: string },
  { viewport: viewport2, id: id2 }: { viewport: Viewport; id: string },
  warnings: Set<IValidationModel>,
  errors: Set<IValidationModel>
) => {
  if (viewport1.limiter === 'to' && viewport2.limiter === 'to') {
    if (
      viewport1.to.value &&
      viewport2.to.value &&
      viewport1.to.value === viewport2.to.value &&
      viewport1.to.unit === viewport2.to.unit
    ) {
      errors.add(
        new ValidationModel(ErrorCode.EQUAL_BOUNDARIES, new Set([id1, id2]))
      );
      return;
    }
  }
};

const checkBothFrom = (
  { viewport: viewport1, id: id1 }: { viewport: Viewport; id: string },
  { viewport: viewport2, id: id2 }: { viewport: Viewport; id: string },
  warnings: Set<IValidationModel>,
  errors: Set<IValidationModel>
) => {
  if (viewport1.limiter === 'from' && viewport2.limiter === 'from') {
    if (
      viewport1.from &&
      viewport2.from &&
      viewport1.from.value === viewport2.from.value &&
      viewport1.from.unit === viewport2.from.unit
    ) {
      errors.add(
        new ValidationModel(ErrorCode.EQUAL_BOUNDARIES, new Set([id1, id2]))
      );
      return;
    }
  }
};

const checkLowerBoundaryZero = (
  { viewport, id }: { viewport: Viewport; id: string },
  warnings: Set<IValidationModel>
) => {
  if (viewport.limiter === 'from' && viewport.from.value === 0) {
    warnings.add(
      new ValidationModel(WarningCode.LOWER_BOUNDARY_IS_ZERO, new Set([id]))
    );
  }
};

const checkAllViewportsFulfilled = (grids: Grid[]) => {
  const presentLimiters = new Set<Limiter>(
    grids.map((grid) => grid.viewport.limiter)
  );
  let startsWithZero = false;
  let endsWithInfinity = false;
  const hasHole = false;

  if (presentLimiters.has('none')) {
    return;
  }

  if (presentLimiters.has('from') || presentLimiters.has('from_to')) {
    startsWithZero = !!grids.find(
      (grid) =>
        (grid.viewport.limiter === 'from' ||
          grid.viewport.limiter === 'from_to') &&
        grid.viewport.from.value === 0
    );
  }

  if (presentLimiters.has('to') || presentLimiters.has('from_to')) {
    endsWithInfinity = !!grids.find(
      (grid) =>
        grid.viewport.limiter === 'from' || grid.viewport.limiter === 'none'
    );
  }
};

const checkBothNone = (
  { viewport: viewport1, id: id1 }: { viewport: Viewport; id: string },
  { viewport: viewport2, id: id2 }: { viewport: Viewport; id: string },
  errors: Set<IValidationModel>
) => {
  if (viewport1.limiter === 'none' && viewport2.limiter === 'none') {
    errors.add(
      new ValidationModel(
        ErrorCode.MEDIA_QUERY_MISSING_FOR_MULTIPLE_GRIDS,
        new Set([id1, id2])
      )
    );
  }
};

const checkBothFromTo = (
  { viewport: viewport1, id: id1 }: { viewport: Viewport; id: string },
  { viewport: viewport2, id: id2 }: { viewport: Viewport; id: string },

  warnings: Set<IValidationModel>,
  errors: Set<IValidationModel>
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
      from1 === from2 &&
      to1 === to2
    ) {
      errors.add(
        new ValidationModel(ErrorCode.EQUAL_BOUNDARIES, new Set([id1, id2]))
      );
    }

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
      warnings.add(
        new ValidationModel(
          WarningCode.OVERLAPPING_MEDIA_QUERIES,
          new Set([id1, id2])
        )
      );
    }
    return;
  }
};
