import { TaskFormData } from "@/forms/task/entities/task.entities";
import { httpClient } from "@/services/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; projectId?: string }) => {
      await httpClient.delete(`/task/${id}`);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (variables && variables.projectId) {
        queryClient.invalidateQueries({
          queryKey: ["projects", variables.projectId],
        });
      }
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Taks> }) => {
      const response = await httpClient.patch(`/task/${id}`, data);
      return response.data;
    },
    onSuccess: (_updatedTask, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskFormData) => {
      const response = await httpClient.post("/task", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useTaskById(id: string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await httpClient.get(`/task/${id}`);

      return response.data;
    },
    staleTime: 0,
  });
}
