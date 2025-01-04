'use client'
import React from 'react'
import { cn } from './utils';

type OffcanvasProps = {
   children: React.ReactNode;
};
type OffcanvasContentProps = {
   isOpen: boolean;
   toggle: () => void;
   onOpen?: () => void;
   onClose?: () => void;
   direction: "start" | "end" | "top" | "bottom";
   children: React.ReactNode;
   className?: string;
};
type OffcanvasBackdropProps = React.HTMLAttributes<HTMLDivElement> & {
   className?: string;
};
type OffcanvasCloseProps = React.HTMLAttributes<HTMLDivElement> & {
   className?: string;
};

const Offcanvas = React.forwardRef<HTMLDivElement, OffcanvasProps>(
   ({ children }, ref: React.ForwardedRef<HTMLDivElement>) => {
      return <div ref={ref}>{children}</div>;
   }
);
Offcanvas.displayName = "Offcanvas";

const OffcanvasBackdrop = React.forwardRef<HTMLDivElement, OffcanvasBackdropProps>(
   ({ className, ...props }, ref: React.ForwardedRef<HTMLDivElement>) => {
      return (
         <div
            ref={ref}
            className={cn(
               "fixed z-1040 inset-0 bg-black/50",
               className
            )}
            {...props}
         ></div>
      );
   }
);
OffcanvasBackdrop.displayName = "OffcanvasBackdrop";

const OffcanvasClose = React.forwardRef<HTMLDivElement, OffcanvasCloseProps>(
   ({ className, ...props }, ref: React.ForwardedRef<HTMLDivElement>) => {
      return (
         <div
            ref={ref}
            className={cn(
               "absolute top-0 right-3",
               className
            )}
            {...props}
         >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368 144 144m224 0L144 368"></path></svg>
         </div>
      );
   }
);
OffcanvasClose.displayName = "OffcanvasClose";

const OffcanvasContent = React.forwardRef<HTMLDivElement, OffcanvasContentProps>(
   (
      {
         direction = "end",
         children,
         className,
         ...props
      },
      ref: React.ForwardedRef<HTMLDivElement>
   ) => {
      return (
         <>
            <div
               ref={ref}
               className={cn(
                  "fixed z-1050 bg-white p-4 transition ease-in-out",
                  {
                     "inset-y-0 left-0 h-full w-5/12 border-r": direction === "start",
                     "inset-x-0 top-0 w-full h-96 border-b": direction === "top",
                     "inset-y-0 right-0 h-full w-5/12 border-l": direction === "end",
                     "inset-x-0 bottom-0 border-t h-96": direction === "bottom",
                  },
                  className
               )}
               {...props}
            >
               {children}

            </div>
            <OffcanvasBackdrop />
         </>
      );
   }
);
OffcanvasContent.displayName = "OffcanvasContent";

const OffcanvasHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         "flex space-y-2 gap-2 text-left p-4",
         className
      )}
      {...props}
   >
      {children}
      <OffcanvasClose />
   </div>
)
OffcanvasHeader.displayName = "OffcanvasHeader"


export default Object.assign(Offcanvas, {
   Content: OffcanvasContent,
   Backdrop: OffcanvasBackdrop,
   Header: OffcanvasHeader,
});
