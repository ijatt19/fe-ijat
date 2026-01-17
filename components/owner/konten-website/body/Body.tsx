"use client";

import ForceClose from "@/components/ForceClose";
import {
  getDataBodyKonten,
  getDataFiturUnggulan,
} from "@/services/konten-website.service";
import { BodyKonten, ErrorResponse, FiturUnggulan } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import UpdateImage from "../UpdateImage";
import UpdateKey from "../UpdateKey";
import FiturUpdate from "./FiturUpdate";

function Body({ token }: { token: string }) {
  const { data, isLoading, error } = useQuery<BodyKonten, ErrorResponse>({
    queryKey: ["body-konten"],
    queryFn: async () => {
      const res = await getDataBodyKonten(token);
      if (!res.success || !("data" in res)) throw res;

      return res.data;
    },
    retry: false,
  });

  const fitur = useQuery<FiturUnggulan[], ErrorResponse>({
    queryKey: ["fitur-unggulan"],
    queryFn: async () => {
      const res = await getDataFiturUnggulan(token);
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

  if (fitur.error) {
    if (fitur.error.statusCode === 401) return <ForceClose />;

    return <div>{fitur.error.message}</div>;
  }

  if (fitur.isLoading) return <div>Loading</div>;

  if (!fitur.data) return null;

  return (
    <div className="flex flex-col gap-y-8">
      {data && data !== null
        ? data.sections.map((item, index) => {
            return (
              <div
                className="shadow rounded p-2 flex flex-col gap-y-4"
                key={index}
              >
                <h2 className="text-xl">Section {index + 1}</h2>
                <UpdateImage
                  fileName={item.image.key}
                  label="Image"
                  maxWidth={564}
                  query="body-konten"
                  image={item.image}
                  token={token}
                />
                <UpdateKey
                  data={[item.title, item.description]}
                  query="body-konten"
                  token={token}
                />
              </div>
            );
          })
        : null}

      <FiturUpdate data={fitur.data} token={token} query="fitur-unggulan" />
    </div>
  );
}

export default Body;
