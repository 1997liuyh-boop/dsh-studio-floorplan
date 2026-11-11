# dsh-studio-floorplan

[简体中文](README.zh.md)

## Repository

- Repository name: `dsh-studio-floorplan`
- Repository description: Floor-plan and furnishing studio for 2D layout editing, wall changes, 3D walkthroughs, measurements and material estimates.
- Source: `https://github.com/1997liuyh-boop/dsh-studio-floorplan`
- Upstream: `https://github.com/wy51ai/floorplan-3d` at the revision recorded in `UPSTREAM.json`.

## Features

- Edit rooms, walls, windows, doors and furniture in the 2D plan.
- Measure spaces, estimate floor-material cost and inspect the result in 3D bird's-eye or first-person view.
- Save plans in isolated local storage and export or import JSON backups and PNG images.
- Bundle Three.js locally, so the published page does not require a CDN or a separate service.
- Use the shared studio card and project container without modifying the host application.

## Installation

Install the control bundle first, then install this exact studio tag with the official Desktop plugin manager after fully quitting Desktop:

```powershell
& "<Desktop install directory>\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add "github:1997liuyh-boop/dsh-studio-library#v0.1.3"
& "<Desktop install directory>\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add "github:1997liuyh-boop/dsh-studio-floorplan#v0.1.2"
& "<Desktop install directory>\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop list
```

Verify that the installed package exposes `main: lib/index.js`, `exports./client: lib/client.js`, `dsh.bundle.patch: ./cordis.patch.yml`, `static/index.html` and `studio.json`. Restart Desktop and open “Floor plan studio”.

## Requirements and limits

The published package uses the pinned local Three.js copy described in `UPSTREAM.json`. It does not upload plans or recognize an uploaded floor-plan image automatically. Export JSON before clearing browser or DSH data. Custom room data requires source changes and a rebuild.

## License and sources

The studio is MIT licensed and retains the upstream MIT notice. See `UPSTREAM.json` for the source revision and adaptations.
