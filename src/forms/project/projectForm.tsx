import { Input } from "@/components/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProjectFormData } from "./entities/project.entities";

interface Props {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
  title: string;
}

export function ProjectForm({ title, errors, register }: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-white mb-2">
        {title}
      </h1>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Nome</label>
        <Input
          type="text"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Nome do projeto"
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
    </>
  );
}
