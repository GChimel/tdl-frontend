import z from "zod";

export const zodProject = z.object({
  name: z.string().min(1, { message: "Informe o nome do projeto" }),
  description: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof zodProject>;
