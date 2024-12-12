import { PresentationSlides } from "@/components/Presentation";
import { TitleSlide } from "@/components/Presentation/Slides/TitleSlide";

// We use "disableLayout" and mange the basic centering of the slides in the
// "Slide.tsx" component. By making the slide 100% width and height position
// it makes positioning non-reveal elements _relative_ to the visible
// presentation much easier.

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <PresentationSlides disableLayout margin={0}>
        <TitleSlide />
      </PresentationSlides>
    </main>
  );
}
