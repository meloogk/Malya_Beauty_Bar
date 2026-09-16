import { BookingForm } from "@/app/rendez-vous/BookingForm";
import { getSiteContent } from "@/lib/content";

export default async function BookingPage() {
  const { services } = await getSiteContent();
  const bookingServices = services.map((service, index) => ({ id: service.href.replace("/", "") || `service-${index}`, title: service.title, duration: index === 0 ? "60 min" : index === 1 ? "75 min" : "90 min", price: index === 0 ? "À partir de 7 500 FCFA" : index === 1 ? "À partir de 15 000 FCFA" : "À partir de 10 000 FCFA" }));
  return <BookingForm services={bookingServices} />;
}
