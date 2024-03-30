import { Area } from './area';
import { Grid } from './grid';
import { MediaType } from './mediaType';
import { ReferenceContainer } from './referenceContainer';

export interface Preset {
  id: string;
  name: string;
  grids: Grid[];
  areas: Area[];
  globals: {
    mediaType: MediaType;
    referenceContainer: ReferenceContainer;
    useTailwind: boolean;
    useClassName: boolean;
  };
}

export interface PresetOption {
  id: string;
  name: string;
}

const mobileTabletDesktipWithNavSideMainFooter: Preset = {
  id: crypto.randomUUID(),
  name: 'Mobile Tablet Desktop With Nav Side Main Footer',
  globals: {
    mediaType: 'both',
    referenceContainer: 'viewport',
    useTailwind: false,
    useClassName: false,
  },
  areas: [
    {
      name: 'Navbar',
      connections: [
        {
          areaInstanceId: '69a5c84b-e664-4b19-a041-0f7b41014924',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
        {
          areaInstanceId: '569423b4-90ff-4fe9-86ba-98b5ca689769',
          gridId: '7886f1d3-8195-46c4-a05f-c91d20332057',
        },
        {
          areaInstanceId: '6bd4381f-cb5e-47c9-baeb-c91b28b8446f',
          gridId: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
        },
      ],
      color: '#d0a1aa',
      id: '8fa32f16-ecd9-4418-9265-79966bf8e29c',
    },
    {
      name: 'Sidebar',
      connections: [
        {
          areaInstanceId: 'cdd01081-ef06-48e9-925a-c8582fb74c9e',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
        {
          areaInstanceId: '8d5fb3cb-42d0-4f5b-a5b2-5721a581eb27',
          gridId: '7886f1d3-8195-46c4-a05f-c91d20332057',
        },
        {
          areaInstanceId: '026e52e4-a6b8-4648-a6f8-f8d5dffa0666',
          gridId: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
        },
      ],
      color: '#cbf379',
      id: 'd016e8c9-b2e9-4703-a60b-586ab3d4eb2d',
    },
    {
      name: 'Main',
      connections: [
        {
          areaInstanceId: '9b39c4e7-2142-47c8-bbd4-cf705283fd43',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
        {
          areaInstanceId: '3631a886-ff28-4c7c-ad47-48a200c0626d',
          gridId: '7886f1d3-8195-46c4-a05f-c91d20332057',
        },
        {
          areaInstanceId: '9982d644-2ca2-404d-b3d6-f340f327e128',
          gridId: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
        },
      ],
      color: '#8798ee',
      id: 'fda57e2e-8e0b-474c-bbea-9bbbbb8594b0',
    },
    {
      name: 'Footer',
      connections: [
        {
          areaInstanceId: '7840d56f-892d-4be1-8236-52d64987adb8',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
      ],
      color: '#be8de9',
      id: 'c8a92f97-99ed-427e-bdcc-6d37df8b4825',
    },
  ],
  grids: [
    {
      id: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
      name: 'Desktop',
      items: [
        {
          areaId: '8fa32f16-ecd9-4418-9265-79966bf8e29c',
          name: '',
          colStart: 1,
          colEnd: 13,
          rowStart: 1,
          rowEnd: 2,
          id: '69a5c84b-e664-4b19-a041-0f7b41014924',
        },
        {
          areaId: 'c8a92f97-99ed-427e-bdcc-6d37df8b4825',
          name: '',
          colStart: 1,
          colEnd: 13,
          rowStart: 3,
          rowEnd: 4,
          id: '7840d56f-892d-4be1-8236-52d64987adb8',
        },
        {
          areaId: 'd016e8c9-b2e9-4703-a60b-586ab3d4eb2d',
          name: '',
          colStart: 1,
          colEnd: 2,
          rowStart: 2,
          rowEnd: 3,
          id: 'cdd01081-ef06-48e9-925a-c8582fb74c9e',
        },
        {
          areaId: 'fda57e2e-8e0b-474c-bbea-9bbbbb8594b0',
          name: '',
          colStart: 2,
          colEnd: 13,
          rowStart: 2,
          rowEnd: 3,
          id: '9b39c4e7-2142-47c8-bbd4-cf705283fd43',
        },
      ],
      rows: [
        {
          id: 'd6b90c43-475c-4a49-bc00-03f722727de1',
          height: {
            value: 80,
            unit: 'px',
          },
        },
        {
          id: 'f061163b-064f-4c39-b051-050d63f4419b',
          height: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '5d335d66-71ed-430f-9371-f67c83a41349',
          height: {
            value: 240,
            unit: 'px',
          },
        },
      ],
      columns: [
        {
          id: 'd48bd985-4ab0-49ef-8be3-7e767bb1eba5',
          width: {
            value: 200,
            unit: 'px',
          },
        },
        {
          id: 'c32e16ee-1eac-4915-8494-e393d00f3ad8',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'a6620ca4-d0d3-4544-9985-493d462b94a6',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'f42f0eba-157f-4df2-8f26-2385a31fee76',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '9e62884f-cec5-438a-b3c8-da172b3381fe',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '322d92cb-75bb-41b6-b09d-9a552ab725b2',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '089a36f0-5c49-48f7-aa29-265809f6a9a2',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '9236bc76-da87-47d0-980c-05501a450045',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '5137cbf6-cc34-47bc-af1a-25838a666c77',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'cbc61b5f-25d1-49cc-b5f2-dcbdcb3045ee',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'b4bf9ef6-5610-49b3-b554-0bcb181642cc',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '6fe0e3ea-3445-4119-9f16-1d490f8617e9',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
      ],
      vGap: {
        value: 0,
        unit: 'rem',
      },
      hGap: {
        value: 0,
        unit: 'rem',
      },
      viewport: {
        mediaType: 'both',
        limiter: 'none',
        from: {
          value: 100,
          unit: 'px',
        },
        to: {
          value: 100,
          unit: 'px',
        },
      },
      shouldUseWidth: true,
      width: {
        value: 100,
        unit: '%',
      },
      shouldUseHeight: true,
      height: {
        value: 100,
        unit: '%',
      },
    },
    {
      name: 'Mobile',
      items: [
        {
          areaId: '8fa32f16-ecd9-4418-9265-79966bf8e29c',
          name: '',
          colStart: 1,
          colEnd: 2,
          rowStart: 1,
          rowEnd: 2,
          id: '569423b4-90ff-4fe9-86ba-98b5ca689769',
        },
        {
          areaId: 'd016e8c9-b2e9-4703-a60b-586ab3d4eb2d',
          name: '',
          colStart: 1,
          colEnd: 2,
          rowStart: 3,
          rowEnd: 4,
          id: '8d5fb3cb-42d0-4f5b-a5b2-5721a581eb27',
        },
        {
          areaId: 'fda57e2e-8e0b-474c-bbea-9bbbbb8594b0',
          name: '',
          colStart: 1,
          colEnd: 2,
          rowStart: 2,
          rowEnd: 3,
          id: '3631a886-ff28-4c7c-ad47-48a200c0626d',
        },
      ],
      rows: [
        {
          id: '49e3e855-32e1-4ace-aa30-d53ab0e37b96',
          height: {
            value: 60,
            unit: 'px',
          },
        },
        {
          id: 'd75c5b9d-47dc-4c62-aa05-5f382500b89d',
          height: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '0e9f4a7a-f3c5-4c3d-901a-cfe30247e0e4',
          height: {
            value: 60,
            unit: 'px',
          },
        },
      ],
      columns: [
        {
          id: '94edf462-b6c1-4d2a-89e6-7610f50ad753',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
      ],
      vGap: {
        value: 0,
        unit: 'rem',
      },
      hGap: {
        value: 0,
        unit: 'rem',
      },
      viewport: {
        mediaType: 'both',
        limiter: 'none',
        from: {
          value: 100,
          unit: 'px',
        },
        to: {
          value: 100,
          unit: 'px',
        },
      },
      shouldUseWidth: true,
      width: {
        value: 100,
        unit: '%',
      },
      shouldUseHeight: true,
      height: {
        value: 100,
        unit: '%',
      },
      id: '7886f1d3-8195-46c4-a05f-c91d20332057',
    },
    {
      name: 'Tablet',
      items: [
        {
          areaId: '8fa32f16-ecd9-4418-9265-79966bf8e29c',
          name: '',
          colStart: 1,
          colEnd: 5,
          rowStart: 1,
          rowEnd: 2,
          id: '6bd4381f-cb5e-47c9-baeb-c91b28b8446f',
        },
        {
          areaId: 'fda57e2e-8e0b-474c-bbea-9bbbbb8594b0',
          name: '',
          colStart: 1,
          colEnd: 5,
          rowStart: 2,
          rowEnd: 3,
          id: '9982d644-2ca2-404d-b3d6-f340f327e128',
        },
        {
          areaId: 'd016e8c9-b2e9-4703-a60b-586ab3d4eb2d',
          name: '',
          colStart: 1,
          colEnd: 5,
          rowStart: 3,
          rowEnd: 4,
          id: '026e52e4-a6b8-4648-a6f8-f8d5dffa0666',
        },
      ],
      rows: [
        {
          id: '49e3e855-32e1-4ace-aa30-d53ab0e37b96',
          height: {
            value: 80,
            unit: 'px',
          },
        },
        {
          id: 'd75c5b9d-47dc-4c62-aa05-5f382500b89d',
          height: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '0e9f4a7a-f3c5-4c3d-901a-cfe30247e0e4',
          height: {
            value: 60,
            unit: 'px',
          },
        },
      ],
      columns: [
        {
          id: '94edf462-b6c1-4d2a-89e6-7610f50ad753',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'fb0527c4-2dd8-4a8e-968b-ca1f692a9fff',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '7ac1c8b0-ec14-43f1-87cb-b8fee3fa7b8d',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'fcb21142-4c7c-4385-ae01-972aa395fcff',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
      ],
      vGap: {
        value: 0,
        unit: 'rem',
      },
      hGap: {
        value: 0,
        unit: 'rem',
      },
      viewport: {
        mediaType: 'both',
        limiter: 'none',
        from: {
          value: 100,
          unit: 'px',
        },
        to: {
          value: 100,
          unit: 'px',
        },
      },
      shouldUseWidth: true,
      width: {
        value: 100,
        unit: '%',
      },
      shouldUseHeight: true,
      height: {
        value: 100,
        unit: '%',
      },
      id: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
    },
  ],
};

const desktop12ColWithNavSideMainFooter: Preset = {
  id: crypto.randomUUID(),
  name: 'Desktop 12 Col With Nav Side Main Footer',
  globals: {
    mediaType: 'both',
    referenceContainer: 'viewport',
    useTailwind: false,
    useClassName: false,
  },
  areas: [
    {
      name: 'Navbar',
      connections: [
        {
          areaInstanceId: '69a5c84b-e664-4b19-a041-0f7b41014924',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
        {
          areaInstanceId: '569423b4-90ff-4fe9-86ba-98b5ca689769',
          gridId: '7886f1d3-8195-46c4-a05f-c91d20332057',
        },
        {
          areaInstanceId: '6bd4381f-cb5e-47c9-baeb-c91b28b8446f',
          gridId: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
        },
      ],
      color: '#d0a1aa',
      id: '8fa32f16-ecd9-4418-9265-79966bf8e29c',
    },
    {
      name: 'Sidebar',
      connections: [
        {
          areaInstanceId: 'cdd01081-ef06-48e9-925a-c8582fb74c9e',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
        {
          areaInstanceId: '8d5fb3cb-42d0-4f5b-a5b2-5721a581eb27',
          gridId: '7886f1d3-8195-46c4-a05f-c9      1d20332057',
        },
        {
          areaInstanceId: '026e52e4-a6b8-4648-a6f8-f8d5dffa0666',
          gridId: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
        },
      ],
      color: '#cbf379',
      id: 'd016e8c9-b2e9-4703-a60b-586ab3d4eb2d',
    },
    {
      name: 'Main',
      connections: [
        {
          areaInstanceId: '9b39c4e7-2142-47c8-bbd4-cf705283fd43',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
        {
          areaInstanceId: '3631a886-ff28-4c7c-ad47-48a200c0626d',
          gridId: '7886f1d3-8195-46c4-a05f-c91d20332057',
        },
        {
          areaInstanceId: '9982d644-2ca2-404d-b3d6-f340f327e128',
          gridId: 'ec76f99f-0bce-4880-bb84-25a1f6df70ca',
        },
      ],
      color: '#8798ee',
      id: 'fda57e2e-8e0b-474c-bbea-9bbbbb8594b0',
    },
    {
      name: 'Footer',
      connections: [
        {
          areaInstanceId: '7840d56f-892d-4be1-8236-52d64987adb8',
          gridId: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
        },
      ],
      color: '#be8de9',
      id: 'c8a92f97-99ed-427e-bdcc-6d37df8b4825',
    },
  ],
  grids: [
    {
      id: 'c9f69980-99ac-43b4-b66d-5dfca50054f5',
      name: 'Desktop',
      items: [
        {
          areaId: '8fa32f16-ecd9-4418-9265-79966bf8e29c',
          name: '',
          colStart: 1,
          colEnd: 13,
          rowStart: 1,
          rowEnd: 2,
          id: '69a5c84b-e664-4b19-a041-0f7b41014924',
        },
        {
          areaId: 'c8a92f97-99ed-427e-bdcc-6d37df8b4825',
          name: '',
          colStart: 1,
          colEnd: 13,
          rowStart: 3,
          rowEnd: 4,
          id: '7840d56f-892d-4be1-8236-52d64987adb8',
        },
        {
          areaId: 'd016e8c9-b2e9-4703-a60b-586ab3d4eb2d',
          name: '',
          colStart: 1,
          colEnd: 2,
          rowStart: 2,
          rowEnd: 3,
          id: 'cdd01081-ef06-48e9-925a-c8582fb74c9e',
        },
        {
          areaId: 'fda57e2e-8e0b-474c-bbea-9bbbbb8594b0',
          name: '',
          colStart: 2,
          colEnd: 13,
          rowStart: 2,
          rowEnd: 3,
          id: '9b39c4e7-2142-47c8-bbd4-cf705283fd43',
        },
      ],
      rows: [
        {
          id: 'd6b90c43-475c-4a49-bc00-03f722727de1',
          height: {
            value: 80,
            unit: 'px',
          },
        },
        {
          id: 'f061163b-064f-4c39-b051-050d63f4419b',
          height: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '5d335d66-71ed-430f-9371-f67c83a41349',
          height: {
            value: 240,
            unit: 'px',
          },
        },
      ],
      columns: [
        {
          id: 'd48bd985-4ab0-49ef-8be3-7e767bb1eba5',
          width: {
            value: 200,
            unit: 'px',
          },
        },
        {
          id: 'c32e16ee-1eac-4915-8494-e393d00f3ad8',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'a6620ca4-d0d3-4544-9985-493d462b94a6',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'f42f0eba-157f-4df2-8f26-2385a31fee76',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '9e62884f-cec5-438a-b3c8-da172b3381fe',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '322d92cb-75bb-41b6-b09d-9a552ab725b2',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '089a36f0-5c49-48f7-aa29-265809f6a9a2',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '9236bc76-da87-47d0-980c-05501a450045',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '5137cbf6-cc34-47bc-af1a-25838a666c77',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'cbc61b5f-25d1-49cc-b5f2-dcbdcb3045ee',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: 'b4bf9ef6-5610-49b3-b554-0bcb181642cc',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
        {
          id: '6fe0e3ea-3445-4119-9f16-1d490f8617e9',
          width: {
            value: 1,
            unit: 'fr',
          },
        },
      ],
      vGap: {
        value: 0,
        unit: 'rem',
      },
      hGap: {
        value: 0,
        unit: 'rem',
      },
      viewport: {
        mediaType: 'both',
        limiter: 'none',
        from: {
          value: 100,
          unit: 'px',
        },
        to: {
          value: 100,
          unit: 'px',
        },
      },
      shouldUseWidth: true,
      width: {
        value: 100,
        unit: '%',
      },
      shouldUseHeight: true,
      height: {
        value: 100,
        unit: '%',
      },
    },
  ],
};

export const presets: Preset[] = [
  mobileTabletDesktipWithNavSideMainFooter,
  desktop12ColWithNavSideMainFooter,
];

export const presetOptions: PresetOption[] = presets.map((preset) => ({
  id: preset.id,
  name: preset.name,
}));
