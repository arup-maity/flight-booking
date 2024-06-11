import React from "react";

type ContextType = {
   open?: boolean;
   toggle?: (value: boolean) => void;
}

export const DropdownContext = React.createContext<ContextType>({});