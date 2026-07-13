# PlotGenerator

PlotGenerator is a dependency-free static browser application for turning imported artwork and generated line systems into SVG and G-code files for pen plotters.

All image decoding, vector generation, previewing, and export happen in the browser. Imported images are not uploaded to a service.

## Implemented functionality

### Image Trace

Import PNG, JPEG, or SVG artwork and rebuild it with six plotter-oriented methods:

- directional hatching;
- cross-hatching;
- threshold contours;
- Sobel edge centre-lines;
- displaced scanlines;
- stipple dots.

The configuration panel includes working resolution, threshold, edge sensitivity, blur, contrast, spacing, angle, smoothing, Ramer-Douglas-Peucker simplification, minimum path length, inversion, page placement, rotation, and nearest-neighbour travel optimisation.

### Colour passes

Images can be quantised into up to five browser-generated colour passes. The lightest cluster can be treated as the paper, neighbouring colour regions can overlap, and every generated pass has an independent enable switch and pen colour.

### Pattern Lab

Pattern Lab produces deterministic line artwork from a numeric seed:

- wave fields;
- flow fields;
- layered spirals;
- topographic rings;
- Lissajous weaves.

### Preview and export

The SVG workspace shows page and margin bounds, an optional millimetre grid, source-artwork overlay, pass colours, and optional pen-up travel lines. It reports path count, point count, drawing distance, travel distance, and an approximate plot duration.

Exports include:

- layered SVG;
- configurable G-code for all enabled passes or one selected pass.

The machine profile supports coordinate origin, X/Y inversion, feed rates, pen delay estimates, numeric precision, and editable start, pen-up, pen-down, inter-pass, and end commands.

Direct plotter communication is deliberately out of scope. PlotGenerator generates files only.

## G-code caution

The default machine profile uses generic GRBL-style commands:

```gcode
M5
M3 S1000
```

Pen-control conventions vary between plotters. Review generated output, adapt the profile to the target firmware, and test with the pen lifted or removed before running hardware.

## Current constraints

- SVG imports are sanitised and rasterised before tracing; original SVG path preservation is a future pipeline.
- Image processing runs on the browser main thread and is bounded to a 720-pixel working dimension.
- Multi-colour separation is an approximate perceptual clustering workflow, not print-production colour management.
- The on-screen preview is capped for responsiveness when a document is extremely large; exported geometry remains complete.
