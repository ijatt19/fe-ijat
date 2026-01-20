"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteOneBarangJadi } from "@/services/barang-jadi.service";
import { BarangJadi, ErrorResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

function DeleteBarangJadi({
  data,
  token,
}: {
  data: BarangJadi;
  token: string;
}) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await deleteOneBarangJadi(data.id, token);
    },
    onSuccess: (response) => {
      if (!response.success) throw response;

      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["barang-jadi"],
      });
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

  const onSubmit = () => {
    mutation.mutate();
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="bg-primary-red">Hapus</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
          <DialogHeader>
            <DialogTitle>Hapus {data.name}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={mutation.isPending}
                className="bg-primary-orange"
              >
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-primary-red">
              {mutation.isPending ? "Menyimpan" : "Hapus"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBarangJadi;
