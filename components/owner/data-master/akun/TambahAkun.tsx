"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAkunSchema, CreateAkunValues } from "@/lib/schemas/akun";
import { createAkun } from "@/services/akun.service";
import { AkunRole, ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, UserPlus } from "lucide-react";

function TambahAkun({ token }: { token: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateAkunValues>({
    resolver: zodResolver(createAkunSchema),
  });
  const status = watch("role");

  const mutation = useMutation({
    mutationFn: async (values: CreateAkunValues) => {
      return await createAkun(values, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["akun"],
      });
      reset();
      setOpenDialog(false);
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const onSubmit = (data: CreateAkunValues) => {
    mutation.mutate(data);
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(v) => {
        reset();
        setOpenDialog(v);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2 h-10 px-4 rounded-lg shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Akun
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                <UserPlus className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Tambah Akun Baru
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Isi data untuk membuat akun baru
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {/* Nama Depan & Belakang */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="namaDepan" className="text-sm font-medium text-slate-700">
                  Nama Depan
                </Label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="namaDepan"
                  type="text"
                  placeholder="Nama depan"
                  className="h-10"
                  {...register("namaDepan")}
                />
                {errors.namaDepan && (
                  <p className="text-xs text-red-500">{errors.namaDepan.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="namaBelakang" className="text-sm font-medium text-slate-700">
                  Nama Belakang
                </Label>
                <Input
                  autoComplete="off"
                  disabled={mutation.isPending}
                  id="namaBelakang"
                  type="text"
                  placeholder="Nama belakang"
                  className="h-10"
                  {...register("namaBelakang")}
                />
                {errors.namaBelakang && (
                  <p className="text-xs text-red-500">{errors.namaBelakang.message}</p>
                )}
              </div>
            </div>
            
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                Username
              </Label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="username"
                type="text"
                placeholder="Masukkan username"
                className="h-10"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="email"
                type="email"
                placeholder="contoh@email.com"
                className="h-10"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            {/* No HP */}
            <div className="space-y-2">
              <Label htmlFor="noHp" className="text-sm font-medium text-slate-700">
                No. HP
              </Label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="noHp"
                type="text"
                placeholder="08xxxxxxxxxx"
                className="h-10"
                {...register("noHp")}
              />
              {errors.noHp && (
                <p className="text-xs text-red-500">{errors.noHp.message}</p>
              )}
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </Label>
              <Input
                autoComplete="off"
                disabled={mutation.isPending}
                id="password"
                type="text"
                placeholder="Masukkan password"
                className="h-10"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
            
            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-slate-700">
                Role
              </Label>
              <Select
                disabled={mutation.isPending}
                value={status}
                onValueChange={(value) => {
                  setValue("role", value as AkunRole, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value={AkunRole.STAFF}>Staff</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-2 pt-4 border-t border-slate-100">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
                className="flex-1 sm:flex-none"
              >
                Batal
              </Button>
            </DialogClose>
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="flex-1 sm:flex-none bg-violet-600 hover:bg-violet-700 text-white"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Simpan
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TambahAkun;
