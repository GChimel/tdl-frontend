"use client";
import { ProjectCard } from "@/components/projectCard";
import { ProjectTasksModal } from "@/components/projectTasksModal";
import { ProtectedRoute } from "@/components/protectedRoute";
import { Task } from "@/components/task";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

const mockProjects = [
  {
    id: "1",
    name: "Projeto Alpha",
    description:
      "Projeto para inicialização do repositório e configuração de CI/CD.",
    tasks: [
      { id: "a1", title: "Setup repo", completed: true },
      { id: "a2", title: "Config CI", completed: false },
      { id: "a3", title: "Primeira feature", completed: false },
      { id: "a4", title: "Deploy", completed: false },
      { id: "a5", title: "Documentação", completed: true },
    ],
  },
];

const mockSoloTasks = [
  {
    id: "s1",
    title: "Tarefa avulsa 1",
    description: "Descrição da tarefa avulsa 1",
    completed: false,
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<
    null | (typeof mockProjects)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleEditTask = (taskId: string) => alert(`Edit task ${taskId}`);
  const handleToggleComplete = (taskId: string) =>
    alert(`Toggle complete ${taskId}`);
  const handleDeleteTask = (taskId: string) => alert(`Delete task ${taskId}`);

  const handleEditSoloTask = (taskId: string) =>
    alert(`Edit solo task ${taskId}`);
  const handleToggleCompleteSoloTask = (taskId: string) =>
    alert(`Toggle complete solo task ${taskId}`);
  const handleDeleteSoloTask = (taskId: string) =>
    alert(`Delete solo task ${taskId}`);

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const showLeftFade = scrollLeft > 0;
  const showRightFade =
    carouselRef.current &&
    carouselRef.current.scrollWidth >
      carouselRef.current.clientWidth + scrollLeft + 100;

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white flex flex-col items-center p-8">
        {/* Projects */}
        <section className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-extrabold mb-6 text-center tracking-tight">
            Projetos
          </h1>
          <div className="relative w-full max-w-6xl flex items-center">
            {/* Fade + Arrow left */}
            {showLeftFade && (
              <div className="absolute left-0 top-0 h-full w-12 z-20 flex items-center justify-center">
                <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-base-1 to-transparent pointer-events-none" />
                <button
                  className="cursor-pointer bg-gray-600 bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition z-30"
                  onClick={() => scrollByAmount(-350)}
                  tabIndex={0}
                  aria-label="Scroll para a esquerda"
                  style={{ pointerEvents: "auto" }}
                >
                  <CaretLeft size={28} className="text-white" />
                </button>
              </div>
            )}
            {/* Fade + Arrow right */}
            {showRightFade && (
              <div className="absolute right-0 top-0 h-full w-12 z-20 flex items-center justify-center">
                <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-base-1 to-transparent pointer-events-none" />
                <button
                  className="cursor-pointer bg-gray-600 bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition z-30"
                  onClick={() => scrollByAmount(350)}
                  tabIndex={0}
                  aria-label="Scroll para a direita"
                  style={{ pointerEvents: "auto" }}
                >
                  <CaretRight size={28} className="text-white" />
                </button>
              </div>
            )}

            {/* Cards */}
            <div
              ref={carouselRef}
              className="flex flex-nowrap overflow-x-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent select-none"
              onScroll={handleScroll}
            >
              {mockProjects.map((project, idx) => {
                const colors: (
                  | "blue"
                  | "red"
                  | "green"
                  | "yellow"
                  | "purple"
                )[] = ["blue", "red", "green", "yellow", "purple"];
                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                    className="cursor-pointer flex-shrink-0 mr-10"
                  >
                    <ProjectCard
                      name={project.name}
                      completedTasks={
                        project.tasks.filter((t) => t.completed).length
                      }
                      totalTasks={project.tasks.length}
                      color={colors[idx % colors.length]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <ProjectTasksModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectName={selectedProject?.name || ""}
          projectDescription={selectedProject?.description || ""}
          tasks={selectedProject?.tasks || []}
          onEdit={handleEditTask}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
        {/* Tasks */}
        <section className="mt-12 w-full flex flex-col items-center">
          <h1 className="text-2xl font-extrabold mb-6 text-center tracking-tight">
            Tarefas avulsas
          </h1>
          <div className="w-full max-w-lg">
            <ul className="space-y-3 max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent mx-auto">
              {mockSoloTasks.length === 0 && (
                <li className="text-gray-400 text-center">
                  Adicione uma tarefa!
                </li>
              )}
              {mockSoloTasks.map((task) => (
                <li key={task.id}>
                  <Task
                    onModal={false}
                    name={task.title}
                    description={task.description}
                    completed={task.completed}
                    onEdit={() => handleEditSoloTask(task.id)}
                    onToggleComplete={() =>
                      handleToggleCompleteSoloTask(task.id)
                    }
                    onDelete={() => handleDeleteSoloTask(task.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
