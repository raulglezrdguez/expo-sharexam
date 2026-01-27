interface Options {
  id: string;
  value: string;
}

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
  data?: {
    label?: string;
    // question
    options?: Options[];
    question?: string;
    questionType?: string;
    // http-request
    endpoint?: string;
    method?: string;
    responseType: string;
    // gemini
    prompt?: string;
    model?: string;
    temperature?: string;
  };
}
