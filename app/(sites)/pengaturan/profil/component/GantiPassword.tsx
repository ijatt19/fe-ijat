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
  gantiPasswordSchema,
  GantiPasswordValues,
} from "@/lib/schemas/pengaturan";
import { gantiPassword } from "@/services/user.service";
import { ErrorResponse } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { KeyRound, Save } from "lucide-react";

function GantiPassword({ token }: { token: string }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GantiPasswordValues>({
    resolver: zodResolver(gantiPasswordSchema),
    defaultValues: {
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: GantiPasswordValues) => {
      return await gantiPassword(token, values);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;
      reset();
      toast.success(response.message);
      setOpenDialog(false);
      router.refresh();
    },
    onError: async (error: ErrorResponse) => {
      if (error.statusCode === 401) {
        toast.error(error.message);
        await signOut({ redirect: true, redirectTo: "/" });
      }
      toast.error(error.message);
    },
  });

  const submitHandler = (data: GantiPasswordValues) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={openDialog} onOpenChange={(v) => { reset(); setOpenDialog(v); }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-lg border-slate-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200">
          <KeyRound className="w-4 h-4" />
          Ganti Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                <KeyRound className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Ganti Password
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Masukkan password lama dan baru
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="lama" className="text-sm font-medium text-slate-700">
                Password Lama
              </Label>
              <Input
                type="password"
                id="lama"
                placeholder="Masukkan password lama"
                className="h-10"
                {...register("passwordLama")}
                disabled={mutation.isPending}
              />
              {errors.passwordLama && (
                <p className="text-xs text-red-500">{errors.passwordLama.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="baru" className="text-sm font-medium text-slate-700">
                Password Baru
              </Label>
              <Input
                type="password"
                id="baru"
                placeholder="Masukkan password baru"
                className="h-10"
                {...register("passwordBaru")}
                disabled={mutation.isPending}
              />
              {errors.passwordBaru && (
                <p className="text-xs text-red-500">{errors.passwordBaru.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="konfirmasi" className="text-sm font-medium text-slate-700">
                Konfirmasi Password Baru
              </Label>
              <Input
                type="password"
                id="konfirmasi"
                placeholder="Ulangi password baru"
                className="h-10"
                {...register("konfirmasiPasswordBaru")}
                disabled={mutation.isPending}
              />
              {errors.konfirmasiPasswordBaru && (
                <p className="text-xs text-red-500">{errors.konfirmasiPasswordBaru.message}</p>
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
              className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengubah...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Ubah Password
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default GantiPassword;
