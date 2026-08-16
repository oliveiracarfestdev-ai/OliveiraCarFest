---
name: AutoElite
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e3bfb1'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#aa8a7d'
  outline-variant: '#5a4136'
  surface-tint: '#ffb596'
  primary: '#ffb596'
  on-primary: '#581e00'
  primary-container: '#ff6600'
  on-primary-container: '#561d00'
  inverse-primary: '#a33e00'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#989696'
  on-tertiary-container: '#2f2f2f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ffb596'
  on-primary-fixed: '#360f00'
  on-primary-fixed-variant: '#7c2e00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 72px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system for this automotive event portal embodies the precision and velocity of high-performance engineering. It is crafted for an exclusive audience of collectors, enthusiasts, and industry professionals who value both technical excellence and aesthetic aggression.

The visual direction combines **High-Contrast Modernism** with **Glassmorphism**. It utilizes deep, "infinite" blacks to create a high-end showroom atmosphere, allowing vibrant accent colors and high-resolution automotive photography to command attention. The interface should feel like a digital cockpit: precise, responsive, and unapologetically premium. Elements use subtle metallic gradients and translucent overlays to simulate carbon fiber and tinted glass, evoking the materials of a supercar.

## Colors
The palette is rooted in a "Deep Black" (#0a0a0a) foundation to maximize contrast and visual depth. 

- **Primary (Vibrant Orange):** Used exclusively for high-priority actions, critical information, and active states. It represents ignition and energy.
- **Secondary (Graphite):** Used for structural surfaces, card backgrounds, and secondary buttons to provide subtle separation from the background.
- **Tertiary (Deep Black):** The primary canvas color. It creates a seamless, immersive environment.
- **Surface Accents:** Use linear gradients (e.g., `linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)`) to create a brushed metal or machined finish on interactive containers.

## Typography
The typography system prioritizes impact and legibility. **Montserrat** is used for all headlines in bold and heavy weights to mirror the presence of automotive branding. Large display text should be set in uppercase with tight letter spacing for a technical, aggressive look.

**Hanken Grotesk** serves as the primary body face, offering a contemporary, sharp aesthetic that remains highly readable in dense event descriptions or technical specifications. Use uppercase labels with increased letter spacing for metadata (e.g., event dates, engine specs) to maintain a systematic, organized appearance.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

The layout philosophy is "Full-Bleed Impact." Hero sections should use the entire viewport width to showcase high-quality automotive photography. Content containers within the grid should use generous vertical padding (`xl`) to allow the high-contrast elements to "breathe" and maintain an premium, editorial feel. 

Use an 8px base grid for all internal component spacing to ensure mathematical precision. Components like cards should use the `md` (24px) spacing for internal padding to ensure they feel substantial.

## Elevation & Depth
Depth is created through **Layered Translucency** rather than traditional shadows.

1.  **Level 0 (Base):** Solid #0a0a0a background.
2.  **Level 1 (Cards):** #1f1f1f with a 1px solid border of #2a2a2a to define edges.
3.  **Level 2 (Glass Overlays):** Background blur (20px) with 40% opacity secondary color and a subtle top-down white-to-transparent gradient border (0.5px) to simulate a "glass edge" catchlight.
4.  **Interactions:** When an item is hovered, use a subtle "Glow" effect using the Primary Orange color with a very wide spread (40px+) and low opacity (15%), rather than a drop shadow. This simulates the light from a dashboard or taillights.

## Shapes
In alignment with the high-performance automotive theme, this design system utilizes **Sharp Edges**. 0px border radii are used across all primary UI components (buttons, input fields, cards, and images) to convey a sense of precision-milled metal and aerodynamic aggression. 

Exceptions: Use 100% circular shapes only for status indicators or small profile avatars to maintain a distinction between functional UI and human elements.

## Components
- **Buttons:** Primary buttons are solid #ff6600 with black uppercase text. They feature a 45-degree clipped corner effect or a subtle "metallic" sheen gradient. Secondary buttons use a ghost style with a 2px graphite border.
- **Input Fields:** Dark #1f1f1f backgrounds with a bottom-only 2px border that turns primary orange on focus. Label text is always uppercase `label-sm`.
- **Cards:** No rounded corners. Background is a dark gradient. Use "Glassmorphism" for info-overlays on top of vehicle images.
- **Progress Bars / Gauges:** Use linear, sharp-edged bars for technical specs (e.g., 0-60mph, Horsepower). The fill color is always the primary accent.
- **Navigation:** A fixed top bar with a backdrop-blur (glass effect). Use thin 1px separators between items to mimic a technical schematic.
- **Event Badges:** Small, sharp-edged rectangular tags with high-contrast backgrounds (e.g., "SOLD OUT" in red, "VIP" in primary orange).