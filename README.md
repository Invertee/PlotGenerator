# PlotGenerator

A static browser application for generating artwork and G-code for pen plotters.

The app runs entirely client-side. Imported PNG, JPEG, and SVG files are decoded in the browser and are not uploaded to a server.

## Current functionality

- Image import for PNG, JPEG, and SVG.
- Large SVG preview with paper bounds, millimetre grid, margin overlay, source-image overlay, pass colours, and optional travel moves.
- Image-to-plot algorithms:
  - threshold contours;
  - Sobel-style edge lines;
  - directional hatching;
  - cross-hatching;
  - displaced scanlines;
  - stipple dots.
- Single-pen output and multi-colour pass generation using browser-side colour clustering.
- Per-pass colour selection for pen assignment.
- Page, placement, threshold, blur, contrast, spacing, angle, smoothing, and simplification controls.
- Pattern Lab with deterministic wave fields, flow fields, layered spirals, and topographic rings.
- SVG export.
- Configurable G-code export with editable start, end, pen-up, and pen-down commands.
- Path, point, travel, drawing-distance, and estimated-time statistics.

Direct plotter communication is not included in this version. The app generates downloadable files only.

## Deployment

This is a no-build static site. The GitHub Pages workflow in `.github/workflows/pages.yml` uploads the repository root as the Pages artifact on every push to `main`.

The repository must be configured to use **GitHub Actions** as its Pages source.

## G-code caution

The default profile uses generic GRBL-style pen commands:

```gcode
M5
M3 S1000
```

Review the machine profile before running generated files on hardware. Test with the pen lifted or removed first.

## Notes

- SVG imports are currently rasterised before tracing. Native SVG path preservation can be added later as a separate pipeline.
- Browser processing is bounded by a configurable working resolution to avoid excessive UI blocking.
- Path optimisation uses a nearest-neighbour ordering strategy for moderate documents.
