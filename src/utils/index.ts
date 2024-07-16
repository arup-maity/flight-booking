import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode('uzpd4naVxw31hptHmpUaaPlBE1aFcWrrQTP18Gmk');
export async function encrypt(payload: any) {
   return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24 hrs")
      .sign(key);
}

export async function decrypt(data: string) {
   const { payload } = await jwtVerify(data, key, {
      algorithms: ["HS256"],
   });
   return payload;
}
export function convertMinutesToHoursMinutes(totalMinutes: number) {
   // Calculate the number of hours (discarding decimals)
   const hours = Math.floor(totalMinutes / 60);

   // Calculate the remaining minutes (after removing full hours)
   const minutes = totalMinutes % 60;

   // Return an object with hours and minutes
   return { hours, minutes };
}

export function handleApiError(error: any) {
   if (error.response && error.response.status === 409) {
      if (!error.response.data?.success) {
         return error.response.data?.message
      }
   } else {
      console.error('API request failed:', error);
      return 'Something went wrong'
   }
}