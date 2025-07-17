import { ProjectFormData } from "@/forms/project/entities/project.entities";
import { httpClient } from "@/services/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Taks } from "./useTask";

export interface Projects {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  tasks: Taks[];
}

interface ProjectResponse {
  projects: Projects[];
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await httpClient.get<ProjectResponse>("/project");

      return response.data.projects.map((project) => ({
        ...project,
        tasks: project.tasks ?? [],
      }));
    },
  });
}

export function useProjectById(id: string) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      const response = await httpClient.get<Projects>(`/project/${id}`);

      return response.data;
    },
    staleTime: 0,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const response = await httpClient.post<Projects>("/project", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ProjectFormData>;
    }) => {
      const response = await httpClient.patch<Projects>(`/project/${id}`, data);
      return response.data;
    },
    onSuccess: (_updatedProject, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await httpClient.delete(`/project/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
