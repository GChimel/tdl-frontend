import { Task } from "@/components/task";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface TaskType {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface ProjectTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectDescription?: string;
  tasks: TaskType[];
  onEdit: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function ProjectTasksModal({
  isOpen,
  onClose,
  projectName,
  projectDescription,
  tasks,
  onEdit,
  onToggleComplete,
  onDelete,
}: ProjectTasksModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#232836] p-6 text-left align-middle shadow-xl transition-all">
          <DialogTitle as="h3" className="text-lg font-bold text-white mb-4">
            {projectName}
          </DialogTitle>
          {projectDescription && (
            <div className="text-gray-300 text-sm mb-4 whitespace-pre-line">
              {projectDescription}
            </div>
          )}
          <ul className="space-y-3 max-h-[32rem] overflow-y-auto pr-2">
            {tasks.length === 0 && (
              <li className="text-gray-400">Sem tarefas!</li>
            )}
            {tasks.map((task) => (
              <li key={task.id}>
                <Task
                  onModal
                  name={task.title}
                  description={task.description || ""}
                  completed={task.completed}
                  onEdit={() => onEdit(task.id)}
                  onToggleComplete={() => onToggleComplete(task.id)}
                  onDelete={() => onDelete(task.id)}
                />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              title="Fechar"
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
