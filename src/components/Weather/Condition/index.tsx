import { conditionTypes } from "@types";
import Image from "next/image";
import { FC } from "react";

interface Props {
  title: string;
  icon: conditionTypes;
  detail: string;
}

export const Condition: FC<Props> = ({ title, icon, detail }) => {
  return (
    <div className="flex row w-full gap-4">
      <Image src={`/${icon}.png`} alt="condition-icon" width={64} height={64} />
      <div className="flex flex-col">
        <span className="text-2xl font-light">{title}</span>
        <span className="text-4xl font-black">{detail}</span>
      </div>
    </div>
  );
};
