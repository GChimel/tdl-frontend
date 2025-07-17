import z from "zod";

export const zodTask = z.object({
  title: z.string().min(1, { message: "Informe o nome da tarefa" }),
  description: z.string().min(1, { message: "Informe os detalhes da terefa" }),
  status: z.enum(["completed", "pending"]),
  projectId: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export type TaskFormData = z.infer<typeof zodTask>;
