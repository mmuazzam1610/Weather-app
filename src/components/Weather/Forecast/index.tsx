import Image from "next/image";
import { FC } from "react";

interface Props {
  data: any;
}

export const Forecast: FC<Props> = ({ data }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{new Date(data.date).toDateString()}</h2>
        <span className="text-4xl font-black">
          {data.day.maxtemp_c}&deg; C / {data.day.mintemp_c}&deg; C
        </span>
        <div className="flex flex-row items-center gap-4">
          <Image
            src={`http:${data.day.condition.icon}`}
            height={64}
            width={64}
            alt="condition"
          />
          <span>{data.day.condition.text}</span>
        </div>
      </div>
    </div>
  );
};
