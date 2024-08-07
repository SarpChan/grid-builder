export interface AreaInstance {
  id: string;
  areaId: string | undefined;

  name: string | undefined;

  colStart: number;
  colEnd: number;

  rowStart: number;
  rowEnd: number;
}

export type AddAreaInstance = Omit<AreaInstance, 'id'>;
