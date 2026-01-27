export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: { condition?: string };
}
