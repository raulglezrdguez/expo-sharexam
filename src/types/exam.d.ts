import { Edge } from "./edge";
import { Node } from "./node";

interface Exam {
  _id: string;
  title: string;
  description: string;
  author: { name: string; email: string };
  nodes: Node[];
  edges: Edge[];
  result: { label: string; value: string; reference: string }[];
}
