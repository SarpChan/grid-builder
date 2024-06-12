import { ValueUnit, gridMock } from '@grid-builder/models';
import { validate } from './generation';
import { ErrorCode } from 'models/src/lib/errors';
import { WarningCode } from 'models/src/lib/warnings';

describe('Generate Raw', () => {
  it('should generate html and css', () => {});
});

describe('Generate Tailwind', () => {
  it('should generate html with Tailwind', () => {});
});

describe('Validate', () => {
  it.each([
    [
      /*hasError*/ false,
      /*hasWarning*/ false,
      /*Errorcodes*/ [],
      /*Grids*/ [gridMock],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.MEDIA_QUERY_MISSING_FOR_MULTIPLE_GRIDS],
      /*Grids*/ [
        { ...gridMock, name: '1' },
        {
          ...gridMock,
          name: '2',
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ false,
      /*hasWarning*/ true,
      /*Errorcodes*/ [WarningCode.OVERLAPPING_MEDIA_QUERIES],
      /*Grids*/ [
        {
          ...gridMock,
          name: '1',
          viewport: {
            ...gridMock.viewport,
            limiter: 'from',
            from: { value: 8, unit: 'rem' } as ValueUnit,
          },
        },
        {
          ...gridMock,
          name: '2',
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 10, unit: 'rem' } as ValueUnit,
          },
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.UPPER_BOUNDARY_IS_ZERO],
      /*Grids*/ [
        { ...gridMock, name: '1' },
        {
          ...gridMock,
          name: '2',
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 0, unit: 'rem' } as ValueUnit,
          },
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.EQUAL_BOUNDARIES],
      /*Grids*/ [
        {
          ...gridMock,
          name: '1',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 10, unit: 'rem' } as ValueUnit,
          },
        },
        {
          ...gridMock,
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
          name: '2',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 10, unit: 'rem' } as ValueUnit,
          },
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ false,
      /*hasWarning*/ true,
      /*Errorcodes*/ [WarningCode.OVERLAPPING_MEDIA_QUERIES],
      /*Grids*/ [
        {
          ...gridMock,
          name: '1',
          viewport: {
            ...gridMock.viewport,
            limiter: 'from',
            to: { value: 8, unit: 'rem' } as ValueUnit,
          },
        },
        {
          ...gridMock,
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
          name: '2',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 10, unit: 'rem' } as ValueUnit,
          },
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.GRIDS_WITH_SAME_NAME],
      /*Grids*/ [
        {
          ...gridMock,
          name: '1',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 8, unit: 'rem' } as ValueUnit,
          },
        },
        {
          ...gridMock,
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
          name: '1',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 10, unit: 'rem' } as ValueUnit,
          },
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.GRID_MISSING_NAME],
      /*Grids*/ [
        {
          ...gridMock,
          name: '',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 8, unit: 'rem' } as ValueUnit,
          },
        },
        {
          ...gridMock,
          id: 'fb9eb65f-391b-48cc-a9fa-b655ac632d53',
          name: '1',
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 10, unit: 'rem' } as ValueUnit,
          },
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.NO_ROWS_DEFINED],
      /*Grids*/ [
        {
          ...gridMock,
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 8, unit: 'rem' } as ValueUnit,
          },
          rows: [],
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.NO_COLUMNS_DEFINED],
      /*Grids*/ [
        {
          ...gridMock,
          viewport: {
            ...gridMock.viewport,
            limiter: 'to',
            to: { value: 8, unit: 'rem' } as ValueUnit,
          },
          columns: [],
        },
      ],
      /*Areas*/ [],
    ],
    [
      /*hasError*/ true,
      /*hasWarning*/ false,
      /*Errorcodes*/ [ErrorCode.NO_GRIDS_DEFINED],
      /*Grids*/ [],
      /*Areas*/ [],
    ],
  ])(
    'should produce error: %p, warning: %p with codes: %p',
    (hasError, hasWarning, expectedCodes, grids, areas) => {
      const { warnings, errors } = validate(grids, areas);

      const keys = [
        ...Array.from(errors.values()).map((e) => e.code),
        ...Array.from(warnings.values()).map((e) => e.code),
      ];
      expect(!!Array.from(warnings.values()).length).toEqual(hasWarning);
      expect(!!Array.from(errors.values()).length).toEqual(hasError);
      expect(keys).toEqual(expectedCodes);
    }
  );
});
