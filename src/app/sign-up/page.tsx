"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuthStore } from "@/hooks/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Informe seu nome" }),
  email: z
    .string({ message: "Informe seu e-mail" })
    .email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const signUp = useAuthStore((s) => s.signUp);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signUp(data.name, data.email, data.password);
      router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error("E-mail já está em uso!");
        } else {
          toast.error("Erro ao fazer login. Tente novamente.");
        }
      } else {
        toast.error("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#303642]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-2 p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-2 border-t-6 border-primary"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Crie sua conta!
        </h1>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Nome</label>
          <Input
            type="text"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">E-mail</label>
          <Input
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="Digite seu e-mail"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Senha</label>
          <Input
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Digite sua senha"
          />
        </div>
        <Button className="mt-2" title="Criar conta">
          Criar conta
        </Button>
        <div className="text-gray-400 text-xs text-center mt-2">
          Já tem uma conta?{" "}
          <Link
            title="Login"
            href="/sign-in"
            className="text-blue-400 hover:underline"
          >
            Clique aqui
          </Link>
        </div>
      </form>
    </div>
  );
}
