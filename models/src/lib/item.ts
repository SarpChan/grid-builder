export interface Item {
  id: string;
  name: string;
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  color: string;
}

export type AddItem = Omit<Item, 'id' | 'name' | 'color'>;

export type AddItemSuccess = Omit<Item, 'id' | 'name'>;
