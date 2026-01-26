import { Input } from "@/components/ui/input";

function SearchPelanggan({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <Input
        placeholder="Cari Pelanggan..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchPelanggan;
