import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { getSiteContent } from "@/lib/content";

export default async function Realisations() {
  const { gallery } = await getSiteContent();
  return (
    <PageShell>
      <section className="subpage">
        <section className="page-hero">
          <div>
            <p className="eyebrow">✦ Portfolio</p>
            <h1>
              Nos <em>réalisations.</em>
            </h1>
          </div>
          <p>{gallery.description}</p>
        </section>
        <section className="page-content">
          <div className="gallery-grid">
            {gallery.items.concat(gallery.items.slice(0, 3)).map((item, i) => (
              <div
                className={`gallery-item gallery-${(i % 6) + 1}`}
                key={`${item.title}-${i}`}
              >
                <div className="gallery-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:800px) 90vw, 30vw"
                    className="cover-image"
                  />
                </div>
                <div className="gallery-caption">
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}
