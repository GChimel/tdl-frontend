import { Button } from "@/components/button";
import { useCreateProject } from "@/hooks/useProject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ProjectFormData, zodProject } from "./entities/project.entities";
import { ProjectForm } from "./projectForm";

interface Props {
  setCloseModal: (booleand: boolean) => void;
}

export function CreateProject({ setCloseModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(zodProject),
  });

  const { mutateAsync, isPending } = useCreateProject();

  const handleCreateProject = async (data: ProjectFormData) => {
    try {
      await mutateAsync(data);
      setCloseModal(false);
    } catch (error) {
      toast.error("Erro ao criar projeto");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(handleCreateProject)}
        className="bg-base-2 p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-2 border-t-6 border-primary"
      >
        <ProjectForm
          title="Criar projeto"
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
          <Button type="submit" title="Cadastrar" disabled={isPending}>
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
