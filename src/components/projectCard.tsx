import { useDeleteProject } from "@/hooks/useProject";
import { cn } from "@/lib/cn";
import { PencilSimple, Trash } from "phosphor-react";
import toast from "react-hot-toast";

interface ProjectCardProps {
  name: string;
  projectId: string;
  completedTasks: number;
  totalTasks: number;
  color?: "blue" | "red" | "green" | "yellow" | "purple";
  onEdit?: (projectId: string) => void;
}

const colorMap: Record<string, string> = {
  blue: "#b1ddfe",
  red: "#ff7461",
  green: "#adcd92",
  yellow: "#f9aa4b",
  purple: "#aa99ff",
};

export function ProjectCard({
  name,
  projectId,
  completedTasks,
  totalTasks,
  color = "blue",
  onEdit,
}: ProjectCardProps) {
  const { mutateAsync: deleteProject, isPending } = useDeleteProject();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteProject(projectId);
      toast.success("Projeto excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir projeto");
    }
  };

  const percent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const stroke = 6;
  const radius = 32;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = circumference - (percent / 100) * circumference;
  const progressColor = colorMap[color];

  return (
    <div
      className={cn(
        "bg-base-2 h-52 w-52 rounded-2xl p-4 flex flex-col shadow-lg border-t-6"
      )}
      style={{ borderTopColor: progressColor }}
    >
      <div>
        <h1 className="font-bold text-center tracking-[-1px] truncate text-lg mb-1">
          {name}
        </h1>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-300">Tarefas: {totalTasks}</span>
          <span className="text-sm text-gray-300">
            Completas: {completedTasks}
          </span>
        </div>
        <div className="w-full flex mt-1 justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(projectId);
            }}
            className="text-primary focus:outline-1 hover:bg-primary/10 rounded-full p-2 transition-transform hover:scale-110 cursor-pointer"
            title="Editar"
          >
            <PencilSimple size={20} weight="fill" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 focus:outline-1 hover:bg-red-500/10 rounded-full p-2 transition-transform hover:scale-110 cursor-pointer"
            title="Excluir"
            disabled={isPending}
          >
            <Trash size={20} weight="fill" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center relative">
        <svg height={radius * 2} width={radius * 2} className="block">
          <circle
            stroke="#374151"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={progressColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: "stroke-dashoffset 0.5s" }}
          />
        </svg>
        <span
          className={`absolute text-xs font-bold`}
          style={{
            color: progressColor,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        >
          {percent}%
        </span>
      </div>
    </div>
  );
}
