import { LuUsers2 } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { MdFlightLand, MdFlight, MdConnectingAirports, MdOutlineLocationCity } from "react-icons/md";

const AdminMenu = [
   {
      id: "city-list",
      title: "City List",
      icon: <MdOutlineLocationCity size={20} />,
      permissions: ["administrator", "admin"],
      Link: "/admin/city-list",
      navLink: "/admin/city-list",
   },
   {
      id: "airport-list",
      title: "Airport List",
      icon: <MdConnectingAirports size={20} />,
      permissions: ["administrator", "admin"],
      Link: "/admin/airport-list",
      navLink: "/admin/airport-list",
   },
   {
      id: "airplanes-list",
      title: "Airplane List",
      icon: <MdFlight size={20} />,
      permissions: ["administrator", "admin"],
      Link: "/admin/airplanes-list",
      navLink: "/admin/airplanes-list",
   },
   {
      id: "flight-list",
      title: "Flights List",
      icon: <MdFlightLand size={20} />,
      permissions: ["administrator", "admin"],
      Link: "/admin/flight-list",
      navLink: "/admin/flight-list",
   },
   {
      id: "booking-list",
      title: "Booking List",
      icon: <IoTicketOutline size={20} />,
      permissions: ["administrator", "admin"],
      Link: "/admin/booking-list",
      navLink: "/admin/booking-list",
   },
   {
      id: "user",
      title: "User",
      icon: <LuUsers2 size={20} />,
      permissions: ["administrator", "admin"],
      Link: "/admin/user",
      navLink: "/admin/user",
   },
];

export default AdminMenu;
