import { Button } from "@/components/button";
import { useProjectById, useUpdateProject } from "@/hooks/useProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ProjectFormData, zodProject } from "./entities/project.entities";
import { ProjectForm } from "./projectForm";

interface Props {
  setCloseModal: (booleand: boolean) => void;
  projectId: string;
}

export function EditProject({ setCloseModal, projectId }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(zodProject),
  });

  const { mutateAsync, isPending } = useUpdateProject();
  const { data, isFetching, isError } = useProjectById(projectId);

  const handleEditProject = async (data: ProjectFormData) => {
    try {
      await mutateAsync({ id: projectId, data });
      setCloseModal(false);
    } catch (error) {
      toast.error("Erro ao atualizar projeto");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFetching || !data) return;

    if (isError) {
      toast.error("Erro ao buscar os dados");
    }

    setValue("description", data.description);
    setValue("name", data.name);
  }, [isFetching, isError, data]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={handleSubmit(handleEditProject)}
        className="bg-base-2 p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-2 border-t-6 border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectForm
          title="Editar projeto"
          errors={errors}
          register={register}
        />

        <div className="flex justify-between gap-2 mt 2">
          <Button
            title="Fechar"
            type="button"
            className="bg-transparent hover:bg-gray-600"
            onClick={() => setCloseModal(false)}
          >
            Fechar
          </Button>
          <Button type="submit" title="Atualizar" disabled={isPending}>
            {isPending ? "Atualizando..." : "Atualizar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
