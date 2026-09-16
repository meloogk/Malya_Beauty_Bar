export type Service = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  href: string;
};

export type GalleryItem = {
  category: "Ongles" | "Cils" | "Coiffure";
  title: string;
  image: string;
};

export type PricingItem = {
  name: string;
  price: string;
};

export type PricingGroup = {
  category: "Onglerie" | "Cils" | "Coiffure";
  items: PricingItem[];
};

export type Value = {
  number: string;
  title: string;
  description: string;
};

export type ExperienceStep = {
  number: string;
  title: string;
  description: string;
};

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    city: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    script: string;
    descriptor: string;
    body: string;
    image: string;
    imageAlt: string;
  };
  services: Service[];
  signature: {
    eyebrow: string;
    title: string;
    values: Value[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    items: GalleryItem[];
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ExperienceStep[];
  };
  testimonial: {
    eyebrow: string;
    quote: string;
    author: string;
    detail: string;
    initials: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
    philosophyTitle: string;
    philosophyText: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    instagram: string;
  };
  bookingCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
  pricing: PricingGroup[];
};
