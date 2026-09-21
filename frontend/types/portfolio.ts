export type Stat = { value: string; label: string };

export type PortfolioData = {
  profile: {
    name: string;
    title: string;
    email: string;
    experienceLabel: string;
    eyebrow: string;
    summary: string;
    location: string;
    availability: string;
    heroImage: string;
    workspaceImage: string;
    resumeUrl: string;
    linkedinUrl?: string;
    githubUrl?: string;
    stats: Stat[];
  };
  site: {
    navigation: { label: string; href: string }[];
    header: { availabilityLabel: string; contactCta: string };
    hero: {
      headline: string;
      headlineAccent: string;
      primaryCta: string;
      resumeCta: string;
      currentFocusLabel: string;
      currentFocus: string;
    };
    ticker: string[];
    sections: {
      work: SectionContent;
      expertise: SectionContent;
      experience: SectionContent;
    };
    projectLabels: {
      context: string;
      ownership: string;
      value: string;
      selectedSystem: string;
      fallbackRole: string;
    };
    feature: {
      quote: string;
      emphasis: string;
      workspaceImageAlt: string;
      educationLabel: string;
      certificationsLabel: string;
    };
    contact: { eyebrow: string; title: string; body: string };
    footer: { resumeLabel: string; backToTopLabel: string };
  };
  skillGroups: {
    title: string;
    description: string;
    skills: string[];
  }[];
  experiences: {
    company: string;
    role: string;
    location: string;
    period: string;
    summary: string;
    highlights: string[];
  }[];
  projects: {
    slug: string;
    title: string;
    category: string;
    company?: string;
    role?: string;
    description: string;
    contributions?: string[];
    impact?: string;
    image: string;
    url: string;
    stack: string[];
    order: number;
  }[];
  education: { degree: string; institution: string; year: string }[];
  certifications: { name: string; issuer: string; year: string }[];
};

type SectionContent = {
  index: string;
  kicker: string;
  title: string;
  body: string;
};
