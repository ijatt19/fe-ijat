"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/lib/schemas/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

export default function Home() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = async (data: LoginSchema) => {
    setIsPending(true);
    setGlobalError("");

    try {
      const response = await api.post("/auth/login", data);

      await signIn("credentials", {
        token: response.data.data.token,
        id: response.data.data.id,
        role: response.data.data.role,
        redirect: false,
      });

      router.push("/dashboard");
    } catch (error) {
      let msg = "Terjadi kesalahan sistem.";

      if (error instanceof AxiosError) {
        msg =
          error.response?.data?.message ||
          error.message ||
          "Gagal menghubungi server";
      } else if (error instanceof Error) {
        msg = error.message;
      }

      setGlobalError(msg);
      setIsPending(false);
    }
  };
  return (
    <div className="min-h-screen flex py-16 px-8 justify-center xl:justify-start xl:p-0">
      <div className="hidden xl:flex xl:items-center xl:justify-center xl:w-1/2 xl:bg-black xl:text-white xl:text-4xl">
        <div>NAZMA PLASTIK</div>
      </div>
      <div className="w-full md:w-2/3 xl:w-1/2 xl:flex xl:items-center xl:justify-center">
        <div className="border w-full rounded overflow-hidden flex flex-col gap-y-4 shadow h-min pb-8 xl:w-1/2 xl:py-8 xl:border-none">
          <div className="bg-black text-white text-center p-8 text-2xl xl:hidden">
            <div>NAZMA PLASTIK</div>
          </div>
          <div className="px-4">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="text-center"
            >
              {globalError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <span className="block sm:inline">{globalError}</span>
                </div>
              )}
              <FieldSet>
                <FieldLegend className="text-5xl mb-6">Login</FieldLegend>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="username">Username/Email</FieldLabel>
                    <Input
                      id="username"
                      autoComplete="off"
                      placeholder="username/username@mail.com"
                      {...register("username")}
                    />
                    {errors.username && (
                      <FieldError className="text-red-500 text-sm mt-1 text-left">
                        {errors.username.message}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="off"
                      placeholder="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <FieldError className="text-red-500 text-sm mt-1 text-left">
                        {errors.password.message}
                      </FieldError>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-4"
                  >
                    {isPending ? "Sedang Masuk..." : "Login"}
                  </Button>

                  <Link href={"/"} className="text-right block mt-2 text-sm">
                    Lupa Password ?
                  </Link>
                </FieldGroup>
              </FieldSet>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
