# Manager Photos

Add manager photos here using the naming convention: `{station-slug}-manager.jpg`

**Example:** For Fugi station (slug: `fugi`), add `fugi-manager.jpg`

**Current manager photos:**
- `humure-manager.jpg` — Nzaramba Straton (Humure CWS)

**To add a new manager photo:**
1. Save the photo to this folder as `{slug}-manager.jpg` (e.g. `fugi-manager.jpg`)
2. Update `backend/lib/washingStationsData.ts` and set the manager's `photo` to `/washing-stations/managers/{slug}-manager.jpg`

Stations without dedicated manager photos currently use station facility photos as placeholders.
