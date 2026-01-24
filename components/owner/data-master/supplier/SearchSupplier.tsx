import { Input } from "@/components/ui/input";

function SearchSupplier({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <Input
        placeholder="Cari Supplier..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchSupplier;
