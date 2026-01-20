import { auth } from "@/auth";
import SearchBarangJadi from "@/components/owner/data-master/barang/barang-jadi/SearchBarangJadi";
import TableBarangJadi from "@/components/owner/data-master/barang/barang-jadi/TableBarangJadi";
import TambahBarang from "@/components/owner/data-master/barang/barang-jadi/TambahBarang";
import NavDataMaster from "@/components/owner/data-master/barang/NavDataMaster";
import { redirect } from "next/navigation";

export default async function BarangJadiPage() {
  const session = await auth();

  if (!session || !session.user.token) redirect("/");
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-end gap-x-4 md:w-2/3">
        <SearchBarangJadi />
        <TambahBarang token={session.user.token} />
      </div>
      <NavDataMaster />
      <TableBarangJadi token={session.user.token} />
    </div>
  );
}
