import { Input } from "@/components/input";
import { useProjects } from "@/hooks/useProject";
import { Checkbox } from "@headlessui/react";
import { Check } from "phosphor-react";
import { useEffect } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";
import { TaskFormData } from "./entities/task.entities";

interface Props {
  register: UseFormRegister<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
  title: string;
  watch: (field: keyof TaskFormData) => any;
  editPage: boolean;
}

export function TaskForm({
  editPage = false,
  title,
  errors,
  register,
  watch,
}: Props) {
  const { data, isFetching, isError } = useProjects();

  useEffect(() => {
    if (!data && isFetching) return;

    if (isError) {
      toast.error("Erro ao buscar os dados");
    }
  }, [data, isError, isFetching]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white mb-2">
        {title}
      </h1>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Nome</label>
        <Input
          type="text"
          {...register("title")}
          error={errors.title?.message}
          placeholder="Nome da tarefa"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Descrição</label>
        <Input
          type="text"
          {...register("description")}
          error={errors.description?.message}
          placeholder="Detalhes do projeto"
        />
      </div>

      {!editPage && (
        <div className="flex items-center gap-2 mt-4">
          <Checkbox
            checked={watch("status") === "completed"}
            onChange={(checked) => {
              register("status").onChange({
                target: {
                  value: checked ? "completed" : "pending",
                  name: "status",
                },
              });
            }}
            className="group cursor-pointer flex items-center justify-center mr-2 w-6 h-6 rounded border-2 border-gray-500 bg-base-2 data-checked:border-primary data-checked:bg-primary transition-colors focus:outline-1"
          >
            {watch("status") === "completed" && (
              <Check size={18} weight="bold" className="text-white" />
            )}
          </Checkbox>
          <label
            htmlFor="completed-checkbox"
            className="text-sm text-gray-300 select-none cursor-pointer"
          >
            Concluída
          </label>
        </div>
      )}

      {/* Select para projeto */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Projeto</label>
        <select
          {...register("projectId")}
          className="w-full rounded bg-base-2 text-white p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue=""
        >
          <option value="">Nenhum projeto</option>
          {data &&
            data.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
        </select>
        {errors.projectId && (
          <span className="text-xs text-red-400">
            {errors.projectId.message as string}
          </span>
        )}
      </div>
    </>
  );
}
