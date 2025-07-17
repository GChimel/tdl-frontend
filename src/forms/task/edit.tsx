import { Button } from "@/components/button";
import { useTaskById, useUpdateTask } from "@/hooks/useTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TaskFormData, zodTask } from "./entities/task.entities";
import { TaskForm } from "./taskForm";

interface Props {
  setCloseModal: (booleand: boolean) => void;
  taskId: string;
}

export function EditTask({ setCloseModal, taskId }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(zodTask),
  });

  const { mutateAsync, isPending } = useUpdateTask();
  const { data, isFetching, isError } = useTaskById(taskId);

  const handleEditTask = async (data: TaskFormData) => {
    try {
      await mutateAsync({ id: taskId, data });
      setCloseModal(false);
    } catch (error) {
      toast.error("Erro ao atualizar a tarefa");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFetching || !data) return;

    if (isError) {
      toast.error("Erro ao buscar os dados");
    }

    setValue("description", data.description);
    setValue("title", data.title);
    setValue("status", data.status);
    setValue("projectId", data.projectId || "");
  }, [isFetching, isError, data]);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]"
      onClick={(e) => e.stopPropagation()}
    >
      <form
        onSubmit={handleSubmit(handleEditTask)}
        className="bg-base-2 p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-2 border-t-6 border-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <TaskForm
          editPage={false}
          title="Editar Tarefa"
          errors={errors}
          watch={watch}
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
