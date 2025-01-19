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
        <div className="px-10">
          <h2 className="text-yellow-300">Feature Isolation</h2>
          <CodeBlock
            customStyle={{
              fontSize: "1.5rem",
              height: "calc(100%-3rem)",
            }}
            codeTagProps={{ className: "max-h-[calc(100%-3rem)]" }}
            lineProps={(n) => {
              if (
                fragment.name === "map" &&
                fragment.isShowing &&
                (n <= 1 || n >= 7)
              ) {
                return {
                  className: "text-gray-700 [&>span]:text-gray-700",
                };
              }

              if (
                fragment.name === "gallery" &&
                fragment.isShowing &&
                (n <= 7 || n >= 14)
              ) {
                return {
                  className: "text-gray-700 [&>span]:text-gray-700",
                };
              }

              if (
                fragment.name === "collection" &&
                fragment.isShowing &&
                (n <= 25 || n >= 28)
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
          <div className="fragment hidden" data-fragment-name={"gallery"} />
          <div className="fragment hidden" data-fragment-name={"collection"} />
        </div>
        <div className="p-10 relative fragment">
          <h2 className="text-yellow-300">Linking msw and React</h2>
          <div>
            <img src="/spawns.png" className="rounded-xl object-cover" />
          </div>
          <div>
            Testing UI and mutations without a BE
            <div className="text-4xl text-red-600">(that wasn't prod)</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};
