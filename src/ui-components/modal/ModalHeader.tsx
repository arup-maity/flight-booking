import React from 'react'
import { cn } from '../utils';

interface PropsType {
   className?: string;
   children?: React.ReactNode;
   toggle?: () => void;
}
const ModalHeader: React.FC<PropsType> = ({ children, className, toggle }) => {
   return (
      <div className={cn(`flex shrink-0 items-center justify-between`, className)}>
         {children}
         <button onClick={toggle}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
         </button>
      </div>
   )
}

export default ModalHeader