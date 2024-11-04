"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Offcanvas = DialogPrimitive.Root

const OffcanvasTrigger = DialogPrimitive.Trigger

const OffcanvasPortal = DialogPrimitive.Portal

const OffcanvasClose = DialogPrimitive.Close

const OffcanvasOverlay = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
         "fixed inset-0 z-50 bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
         className
      )}
      {...props}
   />
))
OffcanvasOverlay.displayName = DialogPrimitive.Overlay.displayName

const OffcanvasContent = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
   <OffcanvasPortal>
      <OffcanvasOverlay />
      <DialogPrimitive.Content
         ref={ref}
         className={cn(
            "fixed z-50 bg-white top-0 bottom-0 right-0 max-w-3xl translate-x-full transition-transform duration-1000 ease-linear data-[state=open]:translate-x-0  shadow-lg",
            className
         )}
         {...props}
      >
         {children}
         <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
         </DialogPrimitive.Close>
      </DialogPrimitive.Content>
   </OffcanvasPortal>
))
OffcanvasContent.displayName = DialogPrimitive.Content.displayName

const OffcanvasHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         "flex flex-col space-y-1.5 text-center sm:text-left",
         className
      )}
      {...props}
   />
)
OffcanvasHeader.displayName = "OffcanvasHeader"

const OffcanvasFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
         className
      )}
      {...props}
   />
)
OffcanvasFooter.displayName = "OffcanvasFooter"

const OffcanvasTitle = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Title
      ref={ref}
      className={cn(
         "text-lg font-semibold leading-none tracking-tight",
         className
      )}
      {...props}
   />
))
OffcanvasTitle.displayName = DialogPrimitive.Title.displayName

const OffcanvasDescription = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
      {...props}
   />
))
OffcanvasDescription.displayName = DialogPrimitive.Description.displayName

export {
   Offcanvas,
   OffcanvasPortal,
   OffcanvasOverlay,
   OffcanvasTrigger,
   OffcanvasClose,
   OffcanvasContent,
   OffcanvasHeader,
   OffcanvasFooter,
   OffcanvasTitle,
   OffcanvasDescription,
}
