#!/usr/bin/env python3
"""Root entrypoint for the VIS Romanian content pipeline."""

from __future__ import annotations

import runpy
from pathlib import Path


PIPELINE_SCRIPT = Path(__file__).parent / "automation" / "romanian-content-pipeline" / "vis_pipeline.py"


if __name__ == "__main__":
    runpy.run_path(str(PIPELINE_SCRIPT), run_name="__main__")
