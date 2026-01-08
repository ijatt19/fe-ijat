"use client";
import { useQuery } from "@tanstack/react-query";
import UpdateLogo from "./UpdateLogo";
import { getDataHeaderKonten } from "@/services/konten-website.service";
import ForceClose from "@/components/ForceClose";
import { ErrorResponse, HeaderKonten } from "@/types/api";

function Header({ token }: { token: string }) {
  const { data, isLoading, error } = useQuery<HeaderKonten, ErrorResponse>({
    queryKey: ["header-konten"],
    queryFn: async () => {
      const res = await getDataHeaderKonten(token);

      if (!res.success || !("data" in res)) throw res;

      return res.data;
    },
    retry: false,
  });

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading</div>;

  if (!data) return null;

  return <UpdateLogo dataLogo={data.logo} token={token} />;
}

export default Header;
