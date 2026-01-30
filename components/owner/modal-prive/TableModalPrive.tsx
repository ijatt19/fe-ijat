import ForceClose from "@/components/ForceClose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllModalPrive } from "@/services/modal-prive.service";
import { ErrorResponse, ModalPrive } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import UpdateModalPrive from "./UpdateModalPrive";
import DeleteModalPrive from "./DeleteModalPrive";

function TableModalPrive({
  filter,
  token,
}: {
  filter: {
    jenis?: string;
    bulan?: string;
    tahun?: string;
  };
  token: string;
}) {
  const { data, isLoading, error } = useQuery<ModalPrive[], ErrorResponse>({
    queryKey: [
      "modal-prive",
      filter.tahun || "all",
      filter.bulan || "all",
      filter.jenis || "all",
    ],
    queryFn: async () => {
      const res = await getAllModalPrive(
        token,
        filter.jenis,
        filter.bulan,
        filter.tahun,
      );

      if (!res.success || !("data" in res)) throw res;

      return res.data;
    },
    retry: false,
  });

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return <div>{error.message}</div>;
  }

  if (isLoading)
    return <div className="text-sm text-gray-500">Data tidak ditemukan</div>;

  if (!data) return null;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Nominal</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.jenis}</TableCell>
                <TableCell>{item.keterangan}</TableCell>
                <TableCell>{item.nominal}</TableCell>
                <TableCell className="flex items-center gap-x-4">
                  <UpdateModalPrive
                    data={item}
                    token={token}
                    query="modal-prive"
                  />
                  <DeleteModalPrive data={item} token={token} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Data Kosong</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableModalPrive;
