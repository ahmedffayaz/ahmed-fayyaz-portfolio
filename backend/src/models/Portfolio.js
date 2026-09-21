import mongoose from "mongoose";

const { Schema } = mongoose;

const portfolioSchema = new Schema(
  {
    key: { type: String, unique: true, required: true, default: "main" },
    contentVersion: { type: Number, default: 1 },
    profile: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      email: String,
      experienceLabel: String,
      eyebrow: String,
      summary: String,
      location: String,
      availability: String,
      heroImage: String,
      workspaceImage: String,
      resumeUrl: String,
      linkedinUrl: String,
      githubUrl: String,
      stats: [{ value: String, label: String }],
    },
    site: {
      navigation: [{ label: String, href: String }],
      header: {
        availabilityLabel: String,
        contactCta: String,
      },
      hero: {
        headline: String,
        headlineAccent: String,
        primaryCta: String,
        resumeCta: String,
        currentFocusLabel: String,
        currentFocus: String,
      },
      ticker: [String],
      sections: {
        work: { index: String, kicker: String, title: String, body: String },
        expertise: { index: String, kicker: String, title: String, body: String },
        experience: { index: String, kicker: String, title: String, body: String },
      },
      projectLabels: {
        context: String,
        ownership: String,
        value: String,
        selectedSystem: String,
        fallbackRole: String,
      },
      feature: {
        quote: String,
        emphasis: String,
        workspaceImageAlt: String,
        educationLabel: String,
        certificationsLabel: String,
      },
      contact: {
        eyebrow: String,
        title: String,
        body: String,
      },
      footer: {
        resumeLabel: String,
        backToTopLabel: String,
      },
    },
    skillGroups: [
      {
        title: String,
        description: String,
        skills: [String],
      },
    ],
    experiences: [
      {
        company: String,
        role: String,
        location: String,
        period: String,
        summary: String,
        highlights: [String],
      },
    ],
    projects: [
      {
        slug: String,
        title: String,
        category: String,
        company: String,
        role: String,
        description: String,
        contributions: [String],
        impact: String,
        image: String,
        url: String,
        stack: [String],
        order: Number,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        year: String,
      },
    ],
  },
  { timestamps: true }
);

export const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
