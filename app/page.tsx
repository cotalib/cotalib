import HeroSection from "@/components/hero";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Awards from "@/components/awards";
import Traction from "@/components/traction";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-[100dvh] px-12">
        <HeroSection />
        <Traction />
        <Awards />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
