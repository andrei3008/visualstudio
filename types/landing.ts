export type PainPoint = {
  icon: string;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

export type Step = {
  number: number;
  title: string;
  description: string;
  icon: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type LandingContent = {
  painPoints: PainPoint[];
  testimonials: Testimonial[];
  steps: Step[];
  heroStats: HeroStat[];
};
