import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/types/content";

export function Testimonial({
  content,
}: {
  content: SiteContent["testimonial"];
}) {
  return (
    <section className="testimonial section-pad">
      <Reveal>
        <p className="eyebrow">{content.eyebrow}</p>
        <blockquote>“{content.quote}”</blockquote>
        <div className="testimonial-author">
          <span>{content.initials}</span>
          <div>
            <strong>{content.author}</strong>
            <small>{content.detail}</small>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
