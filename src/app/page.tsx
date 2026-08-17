import Hero from './_components/sections/hero';
import FeaturedProjects from './_components/sections/featured-projects';
import Skills from './_components/sections/skills';
import AboutPreview from './_components/sections/about-preview';
import ContactCTA from './_components/sections/contact-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
