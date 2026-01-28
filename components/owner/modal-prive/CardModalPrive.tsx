import React from "react";

function CardModalPrive({
  nominal,
  title,
  v2 = false,
}: {
  title: string;
  nominal: string;
  v2?: boolean;
}) {
  return (
    <div
      className={`relative top-0 left-0 ${v2 ? "bg-primary-red" : "bg-primary-green"} pl-4 rounded`}
    >
      <div className="font-semibold bg-white py-4 flex flex-col gap-y-4">
        <p className=" text-base pl-4">{title}</p>
        <p className="text-xl pl-4">Rp {nominal}</p>
      </div>
    </div>
  );
}

export default CardModalPrive;
