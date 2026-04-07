# VIS Automation Pipeline

Initial engineering scaffold for [VIS-6](/VIS/issues/VIS-6).

## What it does

- Generates CMO-approved Romanian dry-run templates for blog, X, Instagram, and YouTube Shorts.
- Schedules 3 posts per channel per day at 09:00, 13:00, and 17:00 UTC.
- Runs dry-run publishing adapters with retry simulation.
- Writes run artifacts (`payloads.json`, `results.json`, `summary.json`) under `artifacts/`.
- Reads the non-production env contract from `.env.example` where applicable.

## CMO Template Guidance

These templates are safe placeholders for engineering validation until final campaign copy is approved:

- Blog: SEO intro plus practical B2B takeaway; avoid unverifiable ROI claims; include one consultative CTA.
- X: one insight plus one CTA; keep under 280 characters; use at most two hashtags; no thread dependency.
- Instagram: first line must work as the hook; benefit-led caption; 3-5 relevant hashtags.
- YouTube Shorts: 15-30 second hook/problem/next-step script that works with voiceover and captions.

Acceptance gate for dry-run output:

- Language is Romanian (`language=ro`) and uses a natural B2B register.
- Each payload includes channel guidance, one CTA, and a channel-specific body format.
- Dry-run artifacts remain local and do not imply public posting or production credential readiness.

## Run

From the repository root:

```bash
python3 vis_pipeline.py --workspace .
```

Or call the package script directly from the repository root:

```bash
python3 automation/romanian-content-pipeline/vis_pipeline.py --workspace .
```

Dry-run validation is deterministic by default. To exercise retry handling locally, set:

```bash
VIS_DRY_RUN_FAILURE_RATE=0.25 VIS_RANDOM_SEED=20260406 python3 vis_pipeline.py --workspace .
```

## Next steps

- Replace dry-run adapter with channel API clients once credentials are approved.
- Replace dry-run placeholders with final campaign copy only after CMO approval; current templates are valid for [VIS-6](/VIS/issues/VIS-6) test paths.
- Wire cron entry to execute at production cadence.
