# PlotGenerator

A static, browser-based toolkit for converting artwork and generative line systems into SVG and G-code for pen plotters.

The application runs locally in the browser. Imported artwork is not uploaded to a server.

## Implemented tools

### Image Trace

Import PNG, JPEG, or SVG artwork and rebuild it as plotter-safe vector paths using:

- threshold contours;
- Sobel edge centre-lines;
- directional hatching;
- cross-hatching;
- displaced scanlines;
- stippling.

The processing controls include resolution, threshold, blur, contrast, smoothing, path simplification, minimum path length, spacing, angle, inversion, placement, rotation, and nearest-neighbour travel optimisation.

### Multi-colour passes

Images can be split into up to five perceptually quantised colour passes. Each pass has:

- an independently editable pen colour;
- visibility control;
- path count;
- a standalone G-code export;
- configurable overlap for overprint-style output.

The lightest detected colour can be treated as the paper rather than a pen pass.

### Pattern Lab

Pattern Lab currently includes four deterministic generators:

- wave fields;
- flow fields;
- layered spirals;
- topographic rings.

A seed and the displayed parameters reproduce the same geometry.

### Preview and export

The shared plot document can be inspected with:

- paper and margin bounds;
- a millimetre grid;
- source-artwork overlay;
- pen-up travel lines;
- pass colours;
- drawing, travel, point, path, and time estimates.

Exports include layered SVG and configurable G-code. G-code is generated as a file only; the application does not connect to a plotter.

## Development

Requirements:

- Node.js 22.12 or later;
- npm 10 or later.

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
npm run preview
```

## Architecture

Every tool produces the same machine-independent document model:

```text
Tool input
  -> PlotDocument
    -> PlotPass[]
      -> PlotPath[]
        -> SVG preview
        -> SVG export
        -> G-code export
```

The preview and exporters therefore consume the same geometry. Image algorithms operate on a bounded working resolution, then map normalised raster coordinates onto the configured page in millimetres.

Important modules:

```text
src/processing/raster.ts        image loading, scaling and colour quantisation
src/processing/algorithms.ts    tracing, hatching, scanlines and stippling
src/processing/imagePipeline.ts image-to-document orchestration
src/processing/patterns.ts      generative line tools
src/export/svg.ts               layered SVG output
src/export/gcode.ts             configurable G-code output
src/utils/geometry.ts           smoothing, simplification, ordering and statistics
```

## GitHub Pages

The workflow in `.github/workflows/pages.yml` builds the application after every push to `main` and publishes the `dist` directory through GitHub Pages. The repository must be configured to use **GitHub Actions** as its Pages source.

Vite uses a relative asset base, so the built site can also be hosted under another static subdirectory without rebuilding it for a specific repository path.

## G-code caution

Pen control is not standardised between plotters. The default profile uses generic GRBL-style spindle/servo commands:

```gcode
M5
M3 S1000
```

Review and replace the start, end, pen-up, pen-down, pause, origin, and axis settings before running a generated file on hardware. Test with the pen removed or raised first.

## Current constraints

- SVG files are rasterised before tracing; original SVG path preservation is a future pipeline.
- Processing runs on the main browser thread. Working resolution is intentionally bounded to keep the interface usable.
- Path ordering uses exact nearest-neighbour optimisation for moderate documents and a serpentine approximation for very large documents.
- G-code dialect validation and direct serial transmission are deliberately out of scope for this version.
- Geometry outside the configured page is shown as a warning rather than automatically clipped.
