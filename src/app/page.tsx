import { PresentationSlides } from "@/components/Presentation";
import { DesignPatternsSlide } from "@/components/Presentation/Slides/DesignPatternsSlide";
import { FeatureIsolationSlide } from "@/components/Presentation/Slides/FeatureIsolation";
import { IsometricSlide } from "@/components/Presentation/Slides/IsometricSlide";
import { TitleSlide } from "@/components/Presentation/Slides/TitleSlide";
import { WhySlide } from "@/components/Presentation/Slides/WhySlide";

// We use "disableLayout" and mange the basic centering of the slides in the
// "Slide.tsx" component. By making the slide 100% width and height position
// it makes positioning non-reveal elements _relative_ to the visible
// presentation much easier.

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <PresentationSlides disableLayout margin={0}>
        <FeatureIsolationSlide />
        <DesignPatternsSlide />
        <TitleSlide />
        <WhySlide />
        <IsometricSlide />
      </PresentationSlides>
    </main>
  );
}
