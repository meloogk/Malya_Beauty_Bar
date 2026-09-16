import { z } from "zod";

const serviceSchema = z.object({
  number: z.string().min(1), title: z.string().min(1), eyebrow: z.string().min(1), description: z.string().min(1), image: z.string().min(1), href: z.string().min(1)
});

const galleryItemSchema = z.object({
  category: z.enum(["Ongles", "Cils", "Coiffure"]), title: z.string().min(1), image: z.string().min(1)
});

const pricingItemSchema = z.object({ name: z.string().min(1), price: z.string().min(1) });
const pricingGroupSchema = z.object({ category: z.enum(["Onglerie", "Cils", "Coiffure"]), items: z.array(pricingItemSchema).min(1) });
const valueSchema = z.object({ number: z.string().min(1), title: z.string().min(1), description: z.string().min(1) });
const experienceStepSchema = z.object({ number: z.string().min(1), title: z.string().min(1), description: z.string().min(1) });

export const siteContentSchema = z.object({
  brand: z.object({ name: z.string().min(1), tagline: z.string().min(1), description: z.string().min(1), phone: z.string().min(1), email: z.string().email(), city: z.string().min(1) }),
  hero: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), script: z.string(), descriptor: z.string(), body: z.string().min(1), image: z.string().min(1), imageAlt: z.string().min(1) }),
  services: z.array(serviceSchema).min(1),
  signature: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), values: z.array(valueSchema).min(1) }),
  gallery: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), description: z.string().min(1), items: z.array(galleryItemSchema).min(1) }),
  experience: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), description: z.string().min(1), steps: z.array(experienceStepSchema).min(1) }),
  testimonial: z.object({ eyebrow: z.string().min(1), quote: z.string().min(1), author: z.string().min(1), detail: z.string().min(1), initials: z.string().min(1).max(4) }),
  about: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), intro: z.string().min(1), image: z.string().min(1), imageAlt: z.string().min(1), philosophyTitle: z.string().min(1), philosophyText: z.string().min(1) }),
  contact: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), description: z.string().min(1), instagram: z.string().min(1) }),
  bookingCta: z.object({ eyebrow: z.string().min(1), title: z.string().min(1), description: z.string().min(1) }),
  pricing: z.array(pricingGroupSchema).min(1)
});
