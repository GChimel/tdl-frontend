import { cn } from "@/lib/cn";

interface ProjectCardProps {
  name: string;
  completedTasks: number;
  totalTasks: number;
  color?: "blue" | "red" | "green" | "yellow" | "purple";
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
  completedTasks,
  totalTasks,
  color = "blue",
}: ProjectCardProps) {
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
        "bg-[#232836] h-52 w-52 rounded-2xl p-4 flex flex-col shadow-lg border-t-6"
      )}
      style={{ borderTopColor: progressColor }}
    >
      <div>
        <h1 className="font-bold text-center tracking-[-1px] truncate text-lg mb-2">
          {name}
        </h1>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-300">Tarefas: {totalTasks}</span>
          <span className="text-sm text-gray-300">
            Completas: {completedTasks}
          </span>
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
