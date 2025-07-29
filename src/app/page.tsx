"use client";
import { ProjectCard } from "@/components/projectCard";
import { ProjectTasksModalWrapper } from "@/components/projectTasksModalWrapper";
import { ProtectedRoute } from "@/components/protectedRoute";
import { Task } from "@/components/task";
import { CreateProject } from "@/forms/project/create";
import { EditProject } from "@/forms/project/edit";
import { CreateTask } from "@/forms/task/create";
import { EditTask } from "@/forms/task/edit";
import { useAuthStore } from "@/hooks/useAuthStore";
import type { Projects } from "@/hooks/useProject";
import { useProjects } from "@/hooks/useProject";
import { useTaks, useUpdateTask } from "@/hooks/useTask";
import { CaretLeft, CaretRight, SignOut } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const signOut = useAuthStore((s) => s.signOut);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const { data: projectData, error: projectError } = useProjects();
  const { data: taksData, error: taskError } = useTaks();
  const { mutateAsync } = useUpdateTask();
  const soloTasks = taksData?.filter((t) => !t.project) ?? [];

  useEffect(() => {
    if (taskError) {
      toast.error("Erro ao buscar as tarefas");
    }

    if (projectError) {
      toast.error("Erro ao buscar os projetos");
    }
  }, [taskError, projectError]);

  const [selectedProject, setSelectedProject] = useState<null | Projects>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollByAmount = (amount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleToggleTask = async (taskId: string, status: string) => {
    await mutateAsync({
      id: taskId,
      data: {
        status: status === "completed" ? "pending" : "completed",
      },
    });
  };

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

  const handleLogout = async () => {
    signOut();
    toast.success("Deslogado com sucesso!");
  };

  return (
    <>
      <ProtectedRoute>
        {/* Header */}
        <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-base-2 shadow-md z-30">
          <span className="font-extrabold text-xl tracking-tight text-white select-none">
            Tdl <span className="text-primary">| TODO</span>
          </span>
          <div className="flex gap-3">
            <button
              className="bg-gray-700 cursor-pointer text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition flex items-center justify-center"
              onClick={handleLogout}
              title="Deslogar"
              aria-label="Deslogar"
            >
              <SignOut size={22} weight="bold" />
            </button>
          </div>
        </header>
        <div className="h-20" />
        {showCreateProject && (
          <CreateProject setCloseModal={setShowCreateProject} />
        )}
        {showCreateTask && <CreateTask setCloseModal={setShowCreateTask} />}
        {editProjectId && (
          <EditProject
            setCloseModal={() => setEditProjectId(null)}
            projectId={editProjectId}
          />
        )}

        <div className="flex-1 w-full text-white flex flex-col items-center p-8">
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
                {/* Create project card */}
                <div
                  onClick={() => setShowCreateProject(true)}
                  className="cursor-pointer flex flex-col h-52 w-52 min-h-52 min-w-52 items-center justify-center bg-base-2 border-2 border-dashed border-primary rounded-2xl mr-10 hover:bg-[#26304a] transition group"
                  title="Criar novo projeto"
                >
                  <div className="flex flex-col items-center justify-center h-full w-full p-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                      <span className="text-primary text-4xl font-bold">+</span>
                    </div>
                    <span className="text-primary font-bold text-lg group-hover:underline">
                      Novo Projeto
                    </span>
                  </div>
                </div>
                {!projectData ? (
                  <div className="text-gray-400 text-center w-full">
                    Carregando projetos...
                  </div>
                ) : projectData.length === 0 ? (
                  <div className="text-gray-400 text-center w-full">
                    Nenhum projeto encontrado.
                  </div>
                ) : (
                  projectData.map((project, idx) => {
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
                          projectId={project.id}
                          completedTasks={
                            project.tasks.filter(
                              (t) => t.status === "completed"
                            ).length
                          }
                          totalTasks={project.tasks.length}
                          color={colors[idx % colors.length]}
                          onEdit={(id) => setEditProjectId(id)}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
          {selectedProject && (
            <ProjectTasksModalWrapper
              projectId={selectedProject.id}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onEdit={setEditTaskId}
              onToggleComplete={handleToggleTask}
            />
          )}
          {/* Tasks */}
          <section className="mt-8 w-full flex flex-col items-center">
            <h1 className="text-2xl font-extrabold mb-6 text-center tracking-tight">
              Tarefas avulsas
            </h1>
            <div className="w-full max-w-lg">
              <ul className="space-y-3 max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent mx-auto">
                {/* Create task card*/}
                <li>
                  <div
                    onClick={() => setShowCreateTask(true)}
                    className="cursor-pointer flex items-center bg-base-2 border-2 border-dashed border-primary rounded-xl p-3 mb-2 shadow gap-3 hover:bg-[#26304a] transition group min-h-[64px]"
                    title="Criar nova tarefa avulsa"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                      <span className="text-primary text-2xl font-bold">+</span>
                    </div>
                    <span className="text-primary font-bold text-base group-hover:underline ml-2">
                      Nova Tarefa
                    </span>
                  </div>
                </li>
                {!soloTasks || soloTasks.length === 0 ? (
                  <li className="text-gray-400 text-center">
                    Adicione uma tarefa!
                  </li>
                ) : (
                  soloTasks.map((task) => (
                    <li key={task.id}>
                      <Task
                        id={task.id}
                        projectId=""
                        onModal={false}
                        name={task.title}
                        description={task.description}
                        completed={task.status === "completed" ? true : false}
                        onEdit={() => setEditTaskId(task.id)}
                        onToggleComplete={() =>
                          handleToggleTask(task.id, task.status)
                        }
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>
        </div>
      </ProtectedRoute>
      {editTaskId && (
        <EditTask
          setCloseModal={() => setEditTaskId(null)}
          taskId={editTaskId}
        />
      )}
    </>
  );
}
