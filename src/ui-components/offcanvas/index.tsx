"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Container from "../utils/Container";
import { twMerge } from "tailwind-merge";
import { clsx } from "../utils/clsx";
import OffcanvasHeader from "./OffcanvasHeader";
import OffcanvasBody from "./OffcanvasBody";
import OffcanvasFooter from "./OffcanvasFooter";

type OffcanvasProps = {
  isOpen: boolean;
  toggle: () => void;
  direction?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
};

const Offcanvas: FC<OffcanvasProps> = (props) => {
  const {
    isOpen,
    toggle,
    direction = "left",
    children,
    onOpen = () => {},
    onClose = () => {},
    className
  } = props;

  const backdropRef = useRef<HTMLDivElement>(null);
  const [backdropId, setBackdropId] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);

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

  function handleBackdropClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (e.currentTarget.id === backdropId) {
      if (!isOpen) return;
      toggle();
    }
  }

  function handleBackdropMouseDown(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
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
      <div>
        <div
          className={twMerge(
            clsx(
              `fixed max-w-full flex flex-col bottom-0 z-[1050] transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800`,
              {
                "w-96 top-0 right-0 border-s border-gray-50 translate-x-full":
                  direction === "left",
                "translate-x-0": direction === "left" && state === true,
                "w-96 top-0 left-0 border-e border-gray-50 -translate-x-full":
                  direction === "right",
                "-translate-x-0": direction === "right" && state === true,
                "top-0 left-0 right-0 border-b border-gray-50 -translate-y-full h-[30vh] max-h-full":
                  direction === "top",
                "-translate-y-0": direction === "top" && state === true,
                "left-0 right-0 border-t border-gray-50 translate-y-full h-[30vh] max-h-full":
                  direction === "bottom",
                "translate-y-0": direction === "bottom" && state === true
              }
            ),
            className
          )}
        >
          {children}
        </div>
      </div>
      <div
        id="backdrop"
        ref={backdropRef}
        onClick={(e) => handleBackdropClick(e)}
        onMouseDown={(e) => handleBackdropMouseDown(e)}
        className={`fixed top-0 left-0 w-screen h-screen bg-[#000] transition-opacity duration-300 ease-linear z-[1040] opacity-40`}
      ></div>
    </Container>
  );
};

Offcanvas.displayName = "Offcanvas";

export default Object.assign(Offcanvas, {
  Header: OffcanvasHeader,
  Body: OffcanvasBody,
  Footer: OffcanvasFooter
});
