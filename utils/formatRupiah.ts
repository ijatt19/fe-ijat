export const formatRupiah = (value: string | number) => {
  if (!value) return "";
  return Number(value).toLocaleString("id-ID", { maximumFractionDigits: 0 });
};
