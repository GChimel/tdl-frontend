"use client";

import { ProjectTasksModal } from "@/components/projectTasksModal";
import { useProjectById } from "@/hooks/useProject";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface WrapperProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (taskId: string) => void;
  onToggleComplete: (taskId: string, status: string) => void;
}

export function ProjectTasksModalWrapper({
  projectId,
  isOpen,
  onClose,
  onEdit,
  onToggleComplete,
}: WrapperProps) {
  const { data: project, error } = useProjectById(projectId);

  useEffect(() => {
    if (error) toast.error("Erro ao carregar dados do projeto.");
  }, [error]);

  if (!project) return null;

  return (
    <ProjectTasksModal
      isOpen={isOpen}
      onClose={onClose}
      projectId={project.id}
      projectName={project.name}
      projectDescription={project.description}
      tasks={project.tasks}
      onEdit={onEdit}
      onToggleComplete={onToggleComplete}
    />
  );
}
