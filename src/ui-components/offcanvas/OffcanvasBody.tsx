import React, { FC } from "react";
import { cn } from "../utils";

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

const OffcanvasBody: FC<BodyProps> = ({ children, className }) => {
  return <div className={cn(`w-full h-full p-4`, className)}>{children}</div>;
};

export default OffcanvasBody;
