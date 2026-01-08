"use client";

import ForceClose from "@/components/ForceClose";
import { getDataBodyKonten } from "@/services/konten-website.service";
import { BodyKonten, ErrorResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import UpdateImage from "../UpdateImage";
import UpdateKey from "../UpdateKey";

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

  if (error) {
    if (error.statusCode === 401) return <ForceClose />;

    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading</div>;

  if (!data) return null;

  console.log(data);

  return (
    <div>
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
    </div>
  );
}

export default Body;
