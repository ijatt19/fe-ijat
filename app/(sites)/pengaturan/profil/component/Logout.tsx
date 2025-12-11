"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { logout } from "@/services/logout.service";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

function Logout({ token }: { token: string }) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => logout(token),
    onSuccess: async (response) => {
      toast.success(response?.message);
      await signOut({ redirect: true, redirectTo: "/" });
    },
    onError: async (err) => {
      console.log(err);

      toast.error(err.message);
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded bg-primary-red border border-primary-red hover:bg-inherit hover:text-primary-red">
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Logout</DialogTitle>
        <div>Yakin ingin keluar?</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="rounded bg-primary-orange border border-primary-orange hover:bg-inherit hover:text-primary-orange"
            >
              Kembali
            </Button>
          </DialogClose>
          <Button
            disabled={mutation.isPending}
            className="rounded bg-primary-red border border-primary-red hover:bg-inherit hover:text-primary-red"
            type="submit"
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? "Sedang keluar..." : "logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Logout;
