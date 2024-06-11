import React from 'react'
import { DropdownContext } from './Context';
import { cn } from '../utils';
interface PropsTypes {
   children: React.ReactNode;
   className?: string;
   id: string;
   tag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}
type ContextType = {
   open?: string;
   toggle?: (value: string) => void;
}
const DropdownMenu: React.FC<PropsTypes> = ({ children, className, id, tag: Tag = 'ul' }) => {
   const { open } = React.useContext<ContextType>(DropdownContext);
   return (
      <Tag className={cn(`absolute z-[9999] left-0 top-full min-w-[10rem] text-left bg-clip-padding border border-slate-400 rounded py-1 m-0 ${open === id ? 'block' : 'hidden'}`, className)}>
         {children}
      </Tag>
   )
}

export default DropdownMenu