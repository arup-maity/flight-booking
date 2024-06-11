"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Container from "../utils/Container";
import { cn } from "../utils";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";



const Modal = (props) => {
   const {
      isOpen,
      toggle,
      children,
      onOpen = () => { },
      onClose = () => { },
      className
   } = props;

   const backdropRef = useRef(null);
   const [backdropId, setBackdropId] = useState("");
   const [modal, setModal] = useState(false);
   const [state, setState] = useState(false);

   useEffect(() => {
      callbackStatus();

      if (isOpen) {
         setModal(isOpen);
         const id = window.setTimeout(() => {
            setState(isOpen);
         }, 100);
         return () => {
            window.clearTimeout(id);
         };
      } else {
         setState(isOpen);
         const id = window.setTimeout(() => {
            setModal(isOpen);
         }, 350);
         return () => {
            window.clearTimeout(id);
         };
      }
   }, [isOpen]);

   function handleBackdropClick(e) {
      if (e.currentTarget.id === backdropId) {
         if (!isOpen) return;
         toggle();
      }
   }

   function handleBackdropMouseDown(e) {
      setBackdropId(e.currentTarget.id);
   }

   function callbackStatus() {
      if (isOpen) {
         onOpen();
         // Disable body scrolling
         document.body.style.overflow = "hidden";
      } else {
         onClose();
         document.body.style.overflow = "auto";
      }
   }

   if (!modal) return null;

   return (
      <Container>
         <div className={cn(`fixed w-full h-full flex justify-center items-center overflow-hidden overflow-y-auto top-0 left-0 z-[1048] opacity-0 transition-opacity duration-200 ease-in-out`,
            {
               "opacity-100": state === true,
            },
            className
         )}>
            {children}
            {/* <div className="relative max-w-full m-auto">
               <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 rounded-md m-4">
               </div>
            </div> */}
         </div>
         <div
            id="backdrop"
            ref={backdropRef}
            onClick={(e) => { handleBackdropClick(e); console.log('click') }}
            onMouseDown={(e) => { handleBackdropMouseDown(e); console.log('mouseDown') }}
            className={`fixed top-0 left-0 w-screen h-screen bg-[#000] transition-opacity duration-300 ease-linear z-[1040] opacity-40`}
         ></div>
      </Container>
   );
};

Modal.displayName = "Offcanvas";

export default Object.assign(Modal, {
   Header: ModalHeader,
   Body: ModalBody,
   Footer: ModalFooter
});
