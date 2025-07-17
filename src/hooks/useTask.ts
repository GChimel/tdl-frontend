import { httpClient } from "@/services/httpClient";
import { useQuery } from "@tanstack/react-query";

export interface Taks {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  project?: {
    id: string;
  };
}

interface TasksResponse {
  tasks: Taks[];
}

export function useTaks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await httpClient.get<TasksResponse>("/task");
      return response.data.tasks;
    },
  });
}
