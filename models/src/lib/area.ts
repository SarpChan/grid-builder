export interface Area {
  id: string;
  name: string;
  color: string;
  connections: { areaInstanceId: string; gridId: string }[];
}
