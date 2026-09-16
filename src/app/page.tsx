import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Signature } from "@/components/sections/Signature";
import { Gallery } from "@/components/sections/Gallery";
import { Experience } from "@/components/sections/Experience";
import { Testimonial } from "@/components/sections/Testimonial";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <>
      <Navbar name={content.brand.name} tagline={content.brand.tagline} />
      <main>
        <Hero content={content.hero} />
        <Services services={content.services} />
        <Signature content={content.signature} />
        <Gallery content={content.gallery} />
        <Experience content={content.experience} />
        <Testimonial content={content.testimonial} />
        <BookingCTA content={content.bookingCta} />
      </main>
      <Footer {...content.brand} />
    </>
  );
}
