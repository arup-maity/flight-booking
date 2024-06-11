export function convertMinutesToHoursMinutes(totalMinutes: number) {
   // Calculate the number of hours (discarding decimals)
   const hours = Math.floor(totalMinutes / 60);

   // Calculate the remaining minutes (after removing full hours)
   const minutes = totalMinutes % 60;

   // Return an object with hours and minutes
   return { hours, minutes };
}