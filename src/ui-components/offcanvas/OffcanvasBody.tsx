import React, { FC } from "react";
import { cn } from "../utils";

type BodyProps = {
   children: React.ReactNode;
   className?: string;
};

const OffcanvasBody: FC<BodyProps> = ({ children, className }) => {
   return <div className={cn(`flex-grow p-4 overflow-y-scroll`, className)}>{children}</div>;
};

export default OffcanvasBody;
