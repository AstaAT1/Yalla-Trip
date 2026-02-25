import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ContactSection from "./partials/AboutUs";
import Header from "./partials/header";

function Contact() {
  return (
    <div className="bg-(--bg-primary) min-h-screen transition-colors duration-500 relative">
      {/* Themed Background Glows */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-100 pointer-events-none">
        <div className="absolute inset-0 bg-radial-[ellipse_80%_50%_at_20%_20%] from-logo-sky/20 to-transparent" />
        <div className="absolute inset-0 bg-radial-[ellipse_60%_40%_at_80%_80%] from-logo-soft/15 to-transparent" />
      </div>
      <Navbar />
      <div className="container pt-10">
        <Header />
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
