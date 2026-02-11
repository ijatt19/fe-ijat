"use client";

import { Button } from "@/components/ui/button";
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
import Image from "next/image";

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
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Light Gradient Background - kontras dengan logo biru tua */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl" />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-28 h-28 rounded-2xl bg-white shadow-xl shadow-blue-200/50 flex items-center justify-center border border-blue-100">
              <Image 
                src="/logo.svg" 
                alt="Nazma Plastik Logo" 
                width={72} 
                height={72}
              />
            </div>
          </div>
          
          {/* Brand Name */}
          <h1 className="text-4xl xl:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            NAZMA PLASTIK
          </h1>
          
          <p className="text-slate-500 text-lg xl:text-xl text-center max-w-md leading-relaxed">
            Sistem Manajemen Bisnis Terintegrasi
          </p>
          
          {/* Features */}
          <div className="mt-16 space-y-4">
            {[
              "Manajemen Stok & Inventaris",
              "Laporan Keuangan Real-time",
              "Dashboard Analytics",
            ].map((feature, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 text-slate-600"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm xl:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-slate-900 mb-4">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={40} 
                height={40}
                className="invert opacity-90"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">NAZMA PLASTIK</h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Selamat Datang
              </h2>
              <p className="text-slate-500">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            {/* Error Alert */}
            {globalError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-red-700">{globalError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium text-slate-700"
                >
                  Username atau Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <Input
                    id="username"
                    autoComplete="off"
                    placeholder="Masukkan username atau email"
                    className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Masukkan password"
                    className="pl-12 h-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link 
                  href="/" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Lupa password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  "Masuk"
                )}
              </Button>


            </form>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-500">
            © 2024 Nazma Plastik. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
