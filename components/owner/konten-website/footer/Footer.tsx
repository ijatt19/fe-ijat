"use client";
import { getDataFooterKonten } from "@/services/konten-website.service";
import { ErrorResponse, FooterKonten } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import ForceClose from "@/components/ForceClose";
import UpdateKeyFooter from "./UpdateKeyFooter";
import UpdateKeyMap from "./UpdateKeyMap";

function Footer({ token }: { token: string }) {
  const { data, isLoading, error } = useQuery<FooterKonten, ErrorResponse>({
    queryKey: ["footer-konten"],
    queryFn: async () => {
      const res = await getDataFooterKonten(token);

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

  return (
    <div className="flex flex-col gap-y-8">
      <div className="shadow rounded p-2 flex flex-col gap-y-4">
        <h2 className="text-xl">Section</h2>
        <UpdateKeyFooter
          data={data.sections}
          query="footer-konten"
          token={token}
        />
      </div>
      <div className="shadow rounded p-2 flex flex-col gap-y-4">
        <h2 className="text-xl">Maps</h2>
        <UpdateKeyMap data={data.maps} query="footer-konten" token={token} />
      </div>
    </div>
  );
}

export default Footer;
