import { Reveal } from "@/components/animations/Reveal";
import type { SiteContent } from "@/types/content";

export function Experience({
  content,
}: {
  content: SiteContent["experience"];
}) {
  return (
    <section className="experience section-pad">
      <div className="experience-copy">
        <Reveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </Reveal>
      </div>
      <div className="steps">
        {content.steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.08} className="step">
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
