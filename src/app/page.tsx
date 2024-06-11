import Hero from "@/components/theme/homepage/Hero";
import Review from "@/components/theme/homepage/Review";
import YourPlan from "@/components/theme/homepage/YourPlan";

export default function Home() {
   return (
      <div className="bg-[#FAFBFC]">
         <Hero />
         <YourPlan />
         <div className="w-full theme-container">
            <div className="flex flex-wrap -m-4">
               <div className="w-6/12 p-4">
                  <div style={{ backgroundImage: `url('/images/img-10.jpg')` }} className="relative bg-cover bg-center aspect-[600/550]">
                     <div className="text-white text-center absolute w-full left-0 bottom-0 z-10 p-5">
                        <div className="">Flights</div>
                        <p>Search Flights & Places Hire to our most popular destinations</p>
                        <button type="button">Show Filghts</button>
                     </div>
                  </div>
               </div>
               <div className="w-6/12 p-4">
                  <div style={{ backgroundImage: `url('/images/img-11.jpg')` }} className="relative bg-cover bg-center aspect-[600/550]">
                     <div className="text-white text-center absolute w-full left-0 bottom-0 z-10 p-5">
                        <div className="">Flights</div>
                        <p>Search Flights & Places Hire to our most popular destinations</p>
                        <button type="button">Show Filghts</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Review />
      </div>
   );
}
