import { Input } from "@/components/ui/input";

function SearchMesin({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <Input
        placeholder="Cari mesin..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchMesin;
