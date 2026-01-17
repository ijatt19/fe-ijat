import { FiturUnggulan } from "@/types/api";
import FiturUpdateItem from "./FiturUpdateItem";

function FiturUpdate({
  data,
  query,
  token,
}: {
  data: FiturUnggulan[];
  token: string;
  query: string;
}) {
  return (
    <div className="shadow rounded p-2 flex flex-col gap-y-4">
      <h2 className="text-xl">Fitur Unggulan</h2>
      {data && data.length > 0
        ? data.map((item, index) => (
            <FiturUpdateItem
              key={index}
              dataItem={item}
              index={index}
              token={token}
              query={query}
            />
          ))
        : null}
    </div>
  );
}

export default FiturUpdate;
