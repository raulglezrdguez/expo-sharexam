export interface Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  measured: {
    width: number;
    height: number;
  };
  data?: Record<string, unknown>;
}
