import { Slide } from "@/components/Reveal/Slide";

export const ExampleVerticalSlide = () => {
  return (
    <Slide centered>
      <Slide centered>Example Vertical Slide 1</Slide>
      <Slide centered>
        Example Vertical Slide 2
        <div>
          <p className="fragment">Fragment 1</p>
          <p className="fragment">Fragment 2</p>
          <p className="fragment">Fragment 3</p>
          <p className="fragment">Fragment 4</p>
        </div>
      </Slide>
    </Slide>
  );
};
