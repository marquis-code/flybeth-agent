import{L as o}from"./zDESe98U.js";const a={getTenantBookings(t,n){return o.get(`/bookings/tenant/${t}`,{params:n})},getStats(t){return o.get("/bookings/stats",{params:{tenantId:t}})}};export{a as b};
