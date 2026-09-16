import type { MetadataRoute } from "next";
const routes=["/","/prestations","/onglerie","/cils","/coiffure","/realisations","/a-propos","/tarifs","/contact","/rendez-vous"];
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; return routes.map(url=>({url:`${base}${url}`,lastModified:new Date()})); }
