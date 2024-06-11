import React, { FC } from "react";
import { cn } from "../utils";

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

const OffcanvasFooter: FC<BodyProps> = ({ children, className }) => {
  return <div className={cn(`w-full p-4`, className)}>{children}</div>;
};

export default OffcanvasFooter;
