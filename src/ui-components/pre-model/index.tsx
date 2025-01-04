'use client'
import React, { forwardRef, Ref } from 'react';
import ReactDOM from 'react-dom';

import { Transition } from 'react-transition-group';
import {
   TransitionProps as RTGTransitionProps,
   TransitionStatus,
} from 'react-transition-group/Transition';

interface ModalProps {
   className?: string; // Optional `className` prop
   show: boolean; // Whether the modal should be shown or hidden
   children: React.ReactNode  // The modal content
   onEnter?: (node: HTMLElement, param: any) => void; // Optional callback when the modal enters
   onExited?: (node: HTMLElement, param: any) => void; // Optional callback when the modal exits
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ className, children, show = false, onEnter, onExited }, ref: Ref<HTMLDivElement>) => {

   const container = document.body;
   const dialog = utTransition({
      in: show,
      onEnter,
      onExited,
      children
   })
   const backdropElement = ''
   return (
      <>
         {ReactDOM.createPortal(
            <>
               {backdropElement}
               {dialog}
            </>,
            container,
         )}
      </>
   )
});

Modal.displayName = 'Modal'; // for better debugging in React DevTools

export default Modal;

// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////


interface UtTransitionProps {
   children: React.ReactNode | ((status: TransitionStatus) => React.ReactNode);
   onEnter?: (node: HTMLElement, param: any) => void;
   onExited?: (node: HTMLElement, param: any) => void;
   [key: string]: any; // Accept other props for flexibility
}

export function utTransition({
   children,
   onEnter,
   onExited,
   ...props
}: UtTransitionProps) {
   const nodeRef = React.useRef<HTMLElement>(null);

   const normalize =
      (callback?: (node: HTMLElement, param: any) => void) =>
         (param: any) => {
            if (callback && nodeRef.current) {
               callback(nodeRef.current, param);
            }
         };

   const handleEnter = React.useCallback(normalize(onEnter), [onEnter]);
   const handleExited = React.useCallback(normalize(onExited), [onExited]);

   return (
      <Transition
         {...props}
         nodeRef={nodeRef}
         onEnter={handleEnter}
         onExited={handleExited}
      >
         {(status: TransitionStatus, innerProps: Record<string, unknown>) => {

            console.log(status)
            // If `children` is a function, call it with `status`
            if (typeof children === "function") {
               return children(status, { ...innerProps });
            }

            // Otherwise, clone the `children` element and pass the `ref`
            return React.cloneElement(children as React.ReactElement, {
               ref: nodeRef,
            });
         }}
      </Transition>
   );
}
