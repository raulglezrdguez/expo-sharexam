import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants/consts";
import { Exam } from "../types/exam";

export const useExams = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async (): Promise<Exam[]> => {
      const response = await fetch(`${BASE_API_URL}/diagrams`, {
        method: "GET",
      });

      if (!response.ok) return [];

      const result = await response.json();
      return result.diagrams as Exam[];
    },
  });
};
