"use client";
import React, { useState, useEffect, ReactElement } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { RiArrowRightSLine } from "react-icons/ri";
// import { useSession } from "@/config/Context";
import { BsCircle, BsChatDots } from "react-icons/bs";
import AdminMenu from "./MenuConfig";
import PerfectScrollbar from 'react-perfect-scrollbar'


// function filterSidebarMenu(userRole, menuItems) {
//    return menuItems.filter(menuItem => {
//       // Check if user has the required permission for the main menu item
//       const hasPermission = !menuItem.permissions || userRole.some(role => menuItem.permissions.includes(role));

//       // If there are child menus, filter them recursively
//       const filteredChildren = menuItem.children ? filterSidebarMenu(userRole, menuItem.children) : [];

//       // Return the menu item if it's allowed or has allowed children
//       return hasPermission || filteredChildren.length > 0;
//    });
// }
interface PropsType {
   menuCollapsed?: boolean;
   menuHover?: boolean;
}
const SidebarMenu: React.FC<PropsType> = ({ menuCollapsed, menuHover }) => {
   const [groupOpen, setGroupOpen] = useState([]);
   const [groupActive, setGroupActive] = useState([]);
   const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
   const [activeItem, setActiveItem] = useState(null);

   // const auth = useSession()
   // const filteredMenu = filterSidebarMenu([`${auth?.role}`], SidebarMenu);

   return (
      <div className="sidebar-menu-content w-full h-[calc(100%-70px)] p-1">
         <PerfectScrollbar component="ul" className="" >
            <MenuItems
               items={AdminMenu}
               groupOpen={groupOpen}
               activeItem={activeItem}
               groupActive={groupActive}
               setGroupOpen={setGroupOpen}
               setActiveItem={setActiveItem}
               setGroupActive={setGroupActive}
               currentActiveGroup={currentActiveGroup}
               setCurrentActiveGroup={setCurrentActiveGroup}
               menuCollapsed={menuCollapsed}
               menuHover={menuHover}
            />
         </PerfectScrollbar>
      </div>
   );
};

export default SidebarMenu;

const MenuItems = (props: any) => {
   const { items, ...rest } = props;
   const FatchItems = items.map((item: any, index: number) => {
      if (item.children) {
         return <NavItemGroup item={item} key={index} {...rest} />;
      }
      return <NavItem item={item} key={index} {...rest} />;
   });
   return <>{FatchItems}</>;
};

const NavItem = (props: any) => {
   const { item, menuCollapsed, menuHover } = props;
   const currentURL = usePathname();
   return (
      <li className="webx-menu-item">
         <Link
            href={item.Link}
            className={clsx(
               `flex text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 items-center gap-3 overflow-hidden rounded p-2 mb-[2px]`,
               {
                  "bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-white": item.navLink === currentURL
               }
            )}>
            <span className="menu-icon flex items-center transition-all duration-300 ease-in-out">{item.icon}</span>
            <span className="flex-grow font-medium line-clamp-1">{item.title}</span>
         </Link>
      </li>
   );
};

export const NavItemGroup = (props: any) => {
   const { item, groupOpen, activeItem, parentItem, groupActive, setGroupOpen, setGroupActive, currentActiveGroup, setCurrentActiveGroup, menuCollapsed, menuHover } = props;

   const currentURL = usePathname();

   const toggleOpenGroup = (item: any, parent: any) => {
      let openGroup = groupOpen || [];
      const activeGroup = groupActive;

      if (openGroup.includes(item.id)) {
         openGroup.splice(openGroup.indexOf(item.id), 1);

         if (item.children) {
            removeChildren(item.children, openGroup, groupActive);
         }
      } else if (activeGroup.includes(item.id) || currentActiveGroup?.includes(item.id)) {
         if (!activeGroup.includes(item.id) && currentActiveGroup?.includes(item.id)) {
            activeGroup.push(item.id);
         } else {
            activeGroup.splice(activeGroup.indexOf(item.id), 1);
         }
         if (setGroupActive) {
            setGroupActive([...activeGroup]);
         }
      } else if (parent) {
         if (parent.children) {
            removeChildren(parent.children, openGroup, groupActive);
         }

         if (!openGroup.includes(item.id)) {
            openGroup.push(item.id);
         }
      } else {
         openGroup = [];

         if (!openGroup.includes(item.id)) {
            openGroup.push(item.id);
         }
      }
      if (setGroupOpen) {
         setGroupOpen([...openGroup]);
      }
   };

   useEffect(() => {
      if (groupActive) {
         if (hasActiveChild(item, currentURL)) {
            if (!groupActive.includes(item.id)) groupActive.push(item.id);
         } else {
            const index = groupActive.indexOf(item.id);
            if (index > -1) groupActive.splice(index, 1);
         }

         if (setGroupActive) {
            setGroupActive([...groupActive]);
         }

         if (setCurrentActiveGroup) {
            setCurrentActiveGroup([...groupActive]);
         }
      }
      if (setGroupOpen) {
         setGroupOpen([]);
      }
   }, [currentURL]);

   const onCollapseClick = (e: any, item: any) => {
      toggleOpenGroup(item, parentItem);
      e.preventDefault();
   };

   const openClassCondition = (id: any) => {
      if ((menuCollapsed && menuHover) || menuCollapsed === false) {
         if (groupActive?.includes(id) || groupOpen?.includes(id)) {
            return true;
         }
      } else if (groupActive?.includes(id) && menuCollapsed && menuHover === false) {
         return false;
      } else {
         return null;
      }
   };

   return (
      <li
         className={clsx("webx-menu-item webx-has-submenu", {
            open: openClassCondition(item.id),
            "menu-collapsed-open": groupActive?.includes(item.id),
            "sidebar-group-active": groupActive?.includes(item.id) || groupOpen?.includes(item.id) || currentActiveGroup?.includes(item.id)
         })}>
         <Link
            href="#"
            className={clsx(
               `flex text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 items-center gap-3 overflow-hidden rounded p-2 mb-[2px]`,
               {
                  "bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-white": groupActive?.includes(item.id) || groupOpen?.includes(item.id) || currentActiveGroup?.includes(item.id)
               }
            )}
            onClick={(e) => onCollapseClick(e, item)}>
            <span className="menu-icon flex items-center">{item.icon}</span>
            <span className="flex-grow font-medium line-clamp-1">{item.title}</span>
            <span
               className={clsx(`flex items-center text-gray-400 transition-transform delay-150 ease-in-out`, {
                  "rotate-90": groupActive?.includes(item.id) || groupOpen?.includes(item.id) || currentActiveGroup?.includes(item.id)
               })}>
               <RiArrowRightSLine size="18" />
            </span>
         </Link>
         <ul
            className={clsx(`grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out ps-4`, {
               "lg:hidden": menuCollapsed && !menuHover,
               "!grid-rows-[1fr]": (groupActive && groupActive?.includes(item.id)) || (groupOpen && groupOpen?.includes(item.id))
            })}>
            <div className="overflow-hidden">
               <MenuItems
                  items={item.children}
                  groupActive={groupActive}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                  groupOpen={groupOpen}
                  setGroupOpen={setGroupOpen}
                  parentItem={item}
                  menuHover={menuHover}
                  activeItem={activeItem}
               />
            </div>
         </ul>
      </li>
   );
};

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (children: any, openGroup: any, currentActiveGroup: any) => {
   children.forEach((child: any) => {
      if (!currentActiveGroup.includes(child.id)) {
         const index = openGroup.indexOf(child.id);
         if (index > -1) openGroup.splice(index, 1);
         if (child.children) removeChildren(child.children, openGroup, currentActiveGroup);
      }
   });
};

/**
 * Check if the given item has the given URL
 * in one of its children
 *
 * @param item
 * @param currentUrl
 */
export const hasActiveChild = (item: any, currentUrl: any) => {
   const { children } = item;
   if (!children) {
      return false;
   }
   for (const child of children) {
      if (child.children) {
         if (hasActiveChild(child, currentUrl)) return true;
      }
      // Check if the child has a link and is active
      if (child && child.navLink && currentUrl && (child.navLink === currentUrl || currentUrl.includes(child.navLink))) return true;
   }
   return false;
};
