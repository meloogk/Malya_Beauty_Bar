import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/types/content";

export function BookingCTA({
  content,
}: {
  content: SiteContent["bookingCta"];
}) {
  return (
    <section id="tarifs" className="booking-cta section-pad">
      <Reveal>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        <Button href="/rendez-vous">Prendre rendez-vous</Button>
      </Reveal>
    </section>
  );
}
