import { Button } from "@/components/button";
import { useCreateTask } from "@/hooks/useTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TaskFormData, zodTask } from "./entities/task.entities";
import { TaskForm } from "./taskForm";

interface Props {
  setCloseModal: (booleand: boolean) => void;
}

export function CreateTask({ setCloseModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(zodTask),
  });

  setValue("status", "pending");

  const { mutateAsync, isPending } = useCreateTask();
  const handleCreateTask = async (data: TaskFormData) => {
    try {
      await mutateAsync(data);
      setCloseModal(false);
    } catch (error) {
      toast.error("Erro ao criar tarefa");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(handleCreateTask)}
        className="bg-base-2 p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-2 border-t-6 border-primary"
      >
        <TaskForm
          title="Criar Tarefa"
          errors={errors}
          watch={watch}
          register={register}
          editPage
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
