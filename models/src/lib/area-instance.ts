export interface AreaInstance {
  id: string;
  areaId: string | undefined;

  name: string;

  colStart: number;
  colEnd: number;

  rowStart: number;
  rowEnd: number;
}

export interface AddAreaInstance extends Omit<AreaInstance, 'id'> {}
