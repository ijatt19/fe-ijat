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
import { ProfilFormValues, profilSchema } from "@/lib/schemas/pengaturan";
import { updateUserProfile } from "@/services/user.service";
import { ErrorResponse, User } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Save } from "lucide-react";

function UpdateForm({ dataUser, token }: { dataUser: User; token: string }) {
  const router = useRouter();
  const [openUbahDialog, setOpenUbahDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfilFormValues>({
    resolver: zodResolver(profilSchema),
    defaultValues: {
      namaDepan: dataUser.namaDepan,
      namaBelakang: dataUser.namaBelakang,
      username: dataUser.username,
      email: dataUser.email,
      noHp: dataUser.noHp,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ProfilFormValues) => {
      return await updateUserProfile(token, dataUser.id, values);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      setOpenUbahDialog(false);
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

  const ubahSubmitHandler = (data: ProfilFormValues) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={openUbahDialog} onOpenChange={setOpenUbahDialog}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2 rounded-lg">
          <Pencil className="w-4 h-4" />
          Ubah Profil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={handleSubmit(ubahSubmitHandler)}
          className="flex flex-col gap-y-4"
        >
          <DialogHeader className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
                <Pencil className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-slate-900">
                  Ubah Profil
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Perbarui informasi profil Anda
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="n-depan" className="text-sm font-medium text-slate-700">
                  Nama Depan
                </Label>
                <Input
                  type="text"
                  id="n-depan"
                  placeholder="Nama depan"
                  className="h-10"
                  {...register("namaDepan")}
                  disabled={mutation.isPending}
                />
                {errors.namaDepan && (
                  <p className="text-xs text-red-500">{errors.namaDepan.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="n-belakang" className="text-sm font-medium text-slate-700">
                  Nama Belakang
                </Label>
                <Input
                  type="text"
                  id="n-belakang"
                  placeholder="Nama belakang"
                  className="h-10"
                  {...register("namaBelakang")}
                  disabled={mutation.isPending}
                />
                {errors.namaBelakang && (
                  <p className="text-xs text-red-500">{errors.namaBelakang.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="user" className="text-sm font-medium text-slate-700">
                Username
              </Label>
              <Input
                type="text"
                id="user"
                placeholder="Masukkan username"
                className="h-10"
                {...register("username")}
                disabled={mutation.isPending}
              />
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mail" className="text-sm font-medium text-slate-700">
                Email
              </Label>
              <Input
                type="email"
                id="mail"
                placeholder="contoh@email.com"
                className="h-10"
                {...register("email")}
                disabled={mutation.isPending}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="no" className="text-sm font-medium text-slate-700">
                No. HP
              </Label>
              <Input
                type="text"
                id="no"
                placeholder="08xxxxxxxxxx"
                className="h-10"
                {...register("noHp")}
                disabled={mutation.isPending}
              />
              {errors.noHp && (
                <p className="text-xs text-red-500">{errors.noHp.message}</p>
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
              disabled={mutation.isPending || !isDirty}
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
                  <Save className="w-4 h-4" />
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

export default UpdateForm;
