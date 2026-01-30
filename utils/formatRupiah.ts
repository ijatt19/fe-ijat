export const formatRupiah = (value?: string) => {
  if (!value) return "";
  const clean = value.replace(/\D/g, "");
  if (!clean) return "";
  return Number(clean).toLocaleString("id-ID", { maximumFractionDigits: 0 });
};
