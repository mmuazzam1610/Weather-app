import { CSSProperties, FC } from "react";
import { HeaderMeta } from "../HeaderMeta";

interface AppLayoutModel {
  children: JSX.Element | JSX.Element[];
  classname?: string;
  style?: CSSProperties;
}

export const AppLayout: FC<AppLayoutModel> = ({
  children,
  classname,
  style,
}) => {
  return (
    <>
      <HeaderMeta />
      <div className="flex flex-col grow min-h-screen bg-white">
        <div
          className={"bg-black w-screen h-screen " + classname}
          style={style}
        >
          {children}
        </div>
      </div>
    </>
  );
};
