import { HeroStat } from "@/types/landing";

type HeroStatsProps = {
  stats: HeroStat[];
};

export default function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div
      className="landing-hero-stats"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        marginTop: "2rem",
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat, idx) => (
        <div key={idx} className="landing-hero-stats__item">
          <span className="landing-hero-stats__value">{stat.value}</span>
          <span className="landing-hero-stats__label">{stat.label}</span>
          {idx < stats.length - 1 && (
            <span className="landing-hero-stats__separator">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
