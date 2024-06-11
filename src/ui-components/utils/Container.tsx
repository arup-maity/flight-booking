import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const data = <div className="relative block">{children}</div>;

  const domNode = document.body;

  return createPortal(data, domNode);
};

export default Container;
