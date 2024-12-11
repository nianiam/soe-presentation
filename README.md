# Reveal.js Presentation Template for Next.js

This repo is a useful starting point for creating a presentation with [Reveal.js](https://revealjs.com/) and Next.js. It's _fairly_ unopinionated about how you build the presentation, however, provides support for tailwind.css out of the box since it sits well with Reveal's design patterns, however, it is not necessary.

## Installation

The repo is set up to go immediately:

1. Clone this repo
2. Install dependencies (e.g. `pnpm install`)

## Usage

See the [Reveal Docs](https://revealjs.com) for the full API. Below is a simple summary to get you started.

### Lazy loading

Reveal.js has a lot of browser-specific features that are not supported on the server. As such, to use the package in next.js, you need to lazy load the reveal.js using `next/dynamic`. With the app router, this means creating an intermediary client component "`<Presentation>`" to load `<RevealSlides>` since the `dynamic` function cannot be run in a server component (e.g. `page.tsx`).

If you were using something without SSR (e.g. Vite), you could use the `<RevealSlides>` component directly.

### Creating slides

Reveal converts all `section` elements into slides. It's as simple as:

```tsx
<section>
  <h1>Hello World</h1>
</section>
```

### Vertical slides

You can create a vertical stack of slides as follows:

```tsx
<section>
  <section>
    <h1>hello world</h1>
  </section>
  <section>
    <h1>Hello World</h1>
  </section>
</section>
```

### Fragments

Fragments are revealed one at a time _in the order they appear in the document_.

```tsx
<section>
  <h1>hello world</h1>
  <p className="fragment">I appear first</p>
  <p className="fragment">I appear second</p>
  <p className="fragment">I appear third</p>
</section>
```

### Slide transitions

Slide transitions are controlled by the `transition` option in the Reveal config _OR_ in the `data-transition` attribute on the slide element. See the [docs](https://revealjs.com/transitions/) for more info.

### Slide State

This repo captures the following events from Reveal.js and makes them available to the app via the `useSlides` hook:

- `slidechanged`
- `fragmentshown`
- `fragmenthidden`
- `overviewshown`
- `overviewhidden`

The return type of `useSlides` is:

```ts
type SlideState = {
  x: number;
  y: number;
  f: number;
  overview: boolean;
  paused: boolean;
};
```

This is useful for co-ordinating state around slide and fragment visibility.

> Similarly, the `useTheme` and `useConfig` hooks can be used to update the theme and config respectively.

### A note on styling

Reveal has a lot of opinions on styling. It applies default styles to a lot of different elements (such as `h{1-6}` and `p`) to make the presentation work. To override their styles you have to either:

1. Make sure your css class uses `!important`
2. Use React's `style` prop
3. Use Tailwind's `!important` modifier in `tailwind.config.ts` (on by default here)
