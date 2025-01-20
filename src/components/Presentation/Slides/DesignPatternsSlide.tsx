"use client";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Slide } from "@/components/Reveal/Slide";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useSlides } from "@/hooks/useSlides";

export const DesignPatternsSlide = () => {
  const { fragment } = useSlides();

  return (
    <Slide above data-transition="fade" className="p-20">
      <h1>SNAP! Design Patterns</h1>
      <div className="grid grid-cols-2 gap-20 h-full">
        <div className="px-10 fragment">
          <h2 className="text-yellow-300">Feature Isolation</h2>
          <CodeBlock
            customStyle={{
              fontSize: "1.5rem",
              height: "calc(100%-3rem)",
            }}
            codeTagProps={{ className: "max-h-[calc(100%-3rem)]" }}
            lineProps={(n) => {
              if (
                fragment.index > 0 &&
                (n === 1 ||
                  n === 7 ||
                  (n >= 14 && n <= 25) ||
                  n === 28 ||
                  n === 29)
              ) {
                return {
                  className: "text-gray-700 [&>span]:text-gray-700",
                };
              }

              return {};
            }}
            language="tsx"
            style={oneDark}
            showLineNumbers
            wrapLines
          >
            {`<Centered flexDirection="column" gap="3rem" position="relative">
  <MapContainer>
    <Map>
      <Spawns accountNumber={accountNumber} />
    </Map>
  </MapContainer>
  <CameraContainer>
    <Gallery ref={galleryRef}>
      <BackToMap galleryRef={galleryRef} />
      <GalleryPhoto />
      <ShareCopy />
      <GalleryBackground galleryY={galleryHeight} />
    </Gallery>
    <Controls>
      <SnapFacts />
      <TakePhotoButton canvasRef={canvasRef} />
      <ShareOrSwitch />
    </Controls>
    <SnapError />
    <CaughtCopy />
    <SetComplete width={width} height={height} />
    <TakePhotoCopy width={width} height={height} />
    <CameraVideo />
    <CameraCanvas ref={canvasRef} height={height} width={width} />
  </CameraContainer>
  <Snap />
  <SnapCollection height={height} />
  <APIError />
</Centered>`}
          </CodeBlock>
          <div className="fragment hidden" data-fragment-name={"map"} />
        </div>
        <div className="p-10 relative fragment">
          <h2 className="text-yellow-300 text-[6rem]">
            Building a back-end on the frontend
          </h2>
          <div>
            <img src="/spawns.png" className="rounded-xl object-cover" />
          </div>
          <div>Testing UI and mutations at the speed we needed to</div>
        </div>
      </div>
    </Slide>
  );
};
