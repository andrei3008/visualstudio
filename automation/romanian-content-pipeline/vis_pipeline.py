#!/usr/bin/env python3
"""Romanian marketing automation pipeline (dry-run scaffold).

Creates 3 posts per channel/day for:
- blog
- x
- instagram
- youtube_shorts

Execution is dry-run by default and writes payload artifacts plus a run summary.
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import random
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

CHANNELS = ["blog", "x", "instagram", "youtube_shorts"]
POSTS_PER_CHANNEL = 3
MAX_RETRIES = 2
DEFAULT_SCHEDULE_HOURS = [9, 13, 17]

CHANNEL_GUIDANCE = {
    "blog": {
        "format": "SEO intro + practical takeaway",
        "constraint": "Use clear B2B Romanian, avoid unverifiable ROI claims, include one consultative CTA.",
        "cta": "Cere o evaluare rapida a oportunitatilor de automatizare.",
    },
    "x": {
        "format": "single insight + one CTA",
        "constraint": "Keep under 280 characters, no more than two hashtags, no thread dependency.",
        "cta": "Scrie-ne pentru un audit tehnic scurt.",
    },
    "instagram": {
        "format": "caption hook + benefit + CTA",
        "constraint": "Keep the first line self-contained; use 3-5 relevant hashtags.",
        "cta": "Salveaza postarea pentru urmatorul sprint.",
    },
    "youtube_shorts": {
        "format": "15-30 second script",
        "constraint": "Use hook/problem/next step structure; must work with voiceover and captions.",
        "cta": "Urmareste-ne pentru idei aplicabile in echipe software.",
    },
}


@dataclass
class PublishResult:
    channel: str
    post_id: str
    attempt: int
    success: bool
    error: str | None = None


def build_romanian_templates() -> Dict[str, List[str]]:
    """CMO-approved baseline templates for dry-run fixtures."""
    return {
        "blog": [
            "Cum prioritizezi automatizarile care reduc munca repetitiva fara sa blochezi livrarea",
            "Checklist pentru un MVP B2B: ce validezi inainte sa scrii codul de productie",
            "De la procese manuale la fluxuri digitale: unde apar primele castiguri masurabile",
        ],
        "x": [
            "Automatizarea buna incepe cu un proces clar, nu cu un tool nou. Cartografiaza pasii, masoara blocajele, apoi implementeaza.",
            "Un MVP B2B nu trebuie sa fie mare. Trebuie sa testeze riscul corect: cerere, integrare sau operatie.",
            "Daca echipa copiaza aceleasi date in trei locuri, ai deja un candidat bun pentru automatizare.",
        ],
        "instagram": [
            "Mai putina munca manuala, mai multa claritate in livrare.",
            "Inainte de sprint: defineste riscul pe care il validezi.",
            "Automatizarea nu inlocuieste procesul. Il face vizibil.",
        ],
        "youtube_shorts": [
            "Hook: Echipa ta pierde timp pe aceleasi operatii? Problema: fara un flux clar, automatizarea doar muta haosul. Pasul urmator: documenteaza procesul si alege un singur blocaj de testat.",
            "Hook: Vrei un MVP mai rapid? Problema: prea multe functionalitati ascund riscul real. Pasul urmator: testeaza intai cererea, integrarea sau operarea.",
            "Hook: Un dashboard nu rezolva lipsa de decizie. Problema: datele fara actiune creeaza zgomot. Pasul urmator: leaga fiecare metric de o decizie concreta.",
        ],
    }


def build_payloads(templates: Dict[str, List[str]]) -> Dict[str, List[dict]]:
    payloads: Dict[str, List[dict]] = {}
    run_date = datetime.now(timezone.utc).date().isoformat()

    for channel in CHANNELS:
        payloads[channel] = []
        for idx in range(POSTS_PER_CHANNEL):
            template = templates[channel][idx % len(templates[channel])]
            payloads[channel].append(
                {
                    "id": f"{channel}-{run_date}-{idx + 1}",
                    "language": "ro",
                    "channel": channel,
                    "guidance": CHANNEL_GUIDANCE[channel],
                    "title": template,
                    "body": build_channel_body(channel, template),
                    "scheduled_for": f"{run_date}T{DEFAULT_SCHEDULE_HOURS[idx]:02d}:00:00Z",
                    "dry_run": True,
                }
            )
    return payloads


def build_channel_body(channel: str, template: str) -> str:
    guidance = CHANNEL_GUIDANCE[channel]
    cta = guidance["cta"]
    if channel == "blog":
        return (
            f"{template}\n\n"
            "Porneste de la un obiectiv operational, nu de la o lista de functionalitati. "
            "Alege un flux repetitiv, noteaza costul erorilor si valideaza impactul intr-un dry-run controlat.\n\n"
            f"{cta}"
        )
    if channel == "x":
        return f"{template} {cta} #automatizare #software"
    if channel == "instagram":
        return f"{template}\n\n{cta}\n\n#automatizare #software #produsdigital #echipetech"
    if channel == "youtube_shorts":
        return f"{template} CTA: {cta}"
    raise ValueError(f"Unsupported channel: {channel}")


def dry_run_publish(payload: dict, attempt: int, failure_rate: float) -> PublishResult:
    """Fake publisher; failures are opt-in so validation is deterministic by default."""
    success = random.random() >= failure_rate
    if success:
        return PublishResult(
            channel=payload["channel"],
            post_id=payload["id"],
            attempt=attempt,
            success=True,
        )
    return PublishResult(
        channel=payload["channel"],
        post_id=payload["id"],
        attempt=attempt,
        success=False,
        error="Transient publishing adapter timeout",
    )


def publish_with_retries(payloads: Dict[str, List[dict]], max_retries: int, failure_rate: float) -> List[PublishResult]:
    results: List[PublishResult] = []
    for channel, items in payloads.items():
        for payload in items:
            final: PublishResult | None = None
            for attempt in range(1, max_retries + 2):
                result = dry_run_publish(payload, attempt, failure_rate)
                if result.success:
                    final = result
                    break
                final = result
                time.sleep(0.02)
            assert final is not None
            logging.info(
                "publish channel=%s post_id=%s success=%s attempt=%s error=%s",
                channel,
                payload["id"],
                final.success,
                final.attempt,
                final.error,
            )
            results.append(final)
    return results


def write_artifacts(artifacts_dir: Path, payloads: Dict[str, List[dict]], results: List[PublishResult], max_retries: int) -> Path:
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    run_dir = artifacts_dir / f"run-{timestamp}"
    run_dir.mkdir(parents=True, exist_ok=True)

    (run_dir / "payloads.json").write_text(json.dumps(payloads, indent=2), encoding="utf-8")

    result_dicts = [
        {
            "channel": r.channel,
            "post_id": r.post_id,
            "attempt": r.attempt,
            "success": r.success,
            "error": r.error,
        }
        for r in results
    ]
    (run_dir / "results.json").write_text(json.dumps(result_dicts, indent=2), encoding="utf-8")

    total = len(results)
    failures = len([r for r in results if not r.success])
    summary = {
        "timestamp": timestamp,
        "total_posts": total,
        "failures": failures,
        "success_rate": round((total - failures) / total, 3) if total else 0,
        "channels": CHANNELS,
        "posts_per_channel": POSTS_PER_CHANNEL,
        "mode": "dry-run",
        "max_retries": max_retries,
    }
    (run_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return run_dir


def run(workspace: Path, artifacts_dir: Path, max_retries: int, failure_rate: float, seed: int) -> Path:
    random.seed(seed)
    templates = build_romanian_templates()
    payloads = build_payloads(templates)
    results = publish_with_retries(payloads, max_retries, failure_rate)
    resolved_artifacts_dir = artifacts_dir if artifacts_dir.is_absolute() else workspace / artifacts_dir
    return write_artifacts(resolved_artifacts_dir, payloads, results, max_retries)


def env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    return int(value) if value else default


def env_float(name: str, default: float) -> float:
    value = os.getenv(name)
    return float(value) if value else default


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="VIS dry-run automation pipeline")
    parser.add_argument(
        "--workspace",
        default=".",
        help="Workspace directory where artifacts are written",
    )
    parser.add_argument(
        "--artifacts-dir",
        default=os.getenv("VIS_ARTIFACTS_DIR", "./artifacts"),
        help="Artifact output directory; relative paths resolve under --workspace",
    )
    parser.add_argument(
        "--max-retries",
        type=int,
        default=env_int("VIS_MAX_RETRIES", MAX_RETRIES),
        help="Retry count for dry-run publisher failures",
    )
    parser.add_argument(
        "--dry-run-failure-rate",
        type=float,
        default=env_float("VIS_DRY_RUN_FAILURE_RATE", 0.0),
        help="Optional mock failure rate between 0 and 1; default 0 for deterministic validation",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=env_int("VIS_RANDOM_SEED", 20260406),
        help="Random seed used when dry-run failures are enabled",
    )
    return parser.parse_args()


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    args = parse_args()
    if not 0 <= args.dry_run_failure_rate <= 1:
        raise ValueError("--dry-run-failure-rate must be between 0 and 1")
    run_dir = run(
        Path(args.workspace).resolve(),
        Path(args.artifacts_dir),
        args.max_retries,
        args.dry_run_failure_rate,
        args.seed,
    )
    print(f"Dry-run completed. Artifacts: {run_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
