import "dotenv/config";
import mongoose from "mongoose";
import { pathToFileURL } from "node:url";
import { connectDatabase } from "./config/db.js";
import { Portfolio } from "./models/Portfolio.js";

export const portfolio = {
  key: "main",
  contentVersion: 5,
  profile: {
    name: "Ahmed Fayyaz",
    title: "Senior Full Stack Developer",
    email: "ahmedfayyaz7891@gmail.com",
    experienceLabel: "6+ years",
    eyebrow: "I turn complex business workflows into dependable software.",
    summary:
      "Senior full-stack developer with 6+ years of experience taking products from business requirements and Figma designs to secure APIs, reliable data models, polished interfaces, and production delivery.",
    location: "Lahore, Pakistan",
    availability: "Open to ambitious products and technical conversations",
    heroImage: "/images/ahmed-profile.jpg",
    workspaceImage: "/images/ahmed-at-work.jpg",
    resumeUrl: "/Ahmed_Fayyaz_CV.pdf",
    linkedinUrl: "https://www.linkedin.com/in/im-ahmed-fayyaz",
    githubUrl: "https://github.com/ahmedfayyaz",
    stats: [
      { value: "6+", label: "Years in product delivery" },
      { value: "8", label: "Selected production systems" },
      { value: "End to end", label: "Interface, API, data, delivery" },
    ],
  },
  site: {
    navigation: [
      { label: "Work", href: "#work" },
      { label: "Expertise", href: "#expertise" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    header: {
      availabilityLabel: "Available",
      contactCta: "Let’s talk",
    },
    hero: {
      headline: "Complex systems.",
      headlineAccent: "Clear products.",
      primaryCta: "Explore my work",
      resumeCta: "Download CV",
      currentFocusLabel: "Current focus",
      currentFocus: "Multi-tenant SaaS & workflow automation",
    },
    ticker: ["SaaS products", "API architecture", "E-commerce", "ERP systems", "AI automation", "Product delivery"],
    sections: {
      work: {
        index: "01",
        kicker: "Selected case studies",
        title: "The product, the ownership, the outcome.",
        body: "Production systems presented through the problem space, the engineering I owned, and the value delivered.",
      },
      expertise: {
        index: "02",
        kicker: "Technical range",
        title: "Strong on both sides of the stack.",
        body: "I connect product thinking with implementation detail—shaping data, APIs, integrations, and interfaces as one system.",
      },
      experience: {
        index: "03",
        kicker: "Experience",
        title: "From backend foundations to full product ownership.",
        body: "A 6+ year progression from Laravel API delivery to end-to-end ownership across SaaS, commerce, ERP, banking, logistics, and automation.",
      },
    },
    projectLabels: {
      context: "Product context",
      ownership: "What I owned",
      value: "Delivered value",
      selectedSystem: "Selected system",
      fallbackRole: "Full Stack Development",
    },
    feature: {
      quote: "Good software makes a difficult process feel",
      emphasis: "obvious.",
      workspaceImageAlt: "Ahmed Fayyaz working in the office",
      educationLabel: "Education",
      certificationsLabel: "Certifications",
    },
    contact: {
      eyebrow: "Start a conversation",
      title: "Have a product in mind?",
      body: "Share the problem, timeline, or technical challenge. I’ll review it and reply with the most useful next step.",
    },
    footer: {
      resumeLabel: "Résumé",
      backToTopLabel: "Back to top",
    },
  },
  skillGroups: [
    {
      title: "Backend systems",
      description: "Production APIs and business logic designed around clear boundaries, secure access, and maintainable services.",
      skills: ["Laravel", "Symfony", "PHP", "Node.js", "Express", "Python", "FastAPI", "REST", "GraphQL", "OOP / SOLID"],
    },
    {
      title: "Product interfaces",
      description: "Responsive product interfaces translated from real workflows and Figma—not isolated screens.",
      skills: ["Vue.js", "Nuxt.js", "React", "Next.js", "TypeScript", "Pinia", "Tailwind CSS", "Livewire"],
    },
    {
      title: "Data & delivery",
      description: "Data models, storage, caching, and delivery practices that keep products reliable as requirements grow.",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Database Design", "AWS S3", "CI/CD", "Git / GitHub / GitLab", "Docker", "Agile / Scrum"],
    },
    {
      title: "APIs & automation",
      description: "Third-party and AI integrations shaped into dependable features, documented flows, and useful automation.",
      skills: ["OpenAI", "Google APIs", "SEO / Audit APIs", "Shopware", "Stripe", "Swagger / OpenAPI", "VideoGen", "Postman"],
    },
  ],
  experiences: [
    {
      company: "XpertDigi",
      role: "Full Stack Web Developer",
      location: "Lahore",
      period: "Aug 2025 — Present",
      summary: "Owning full-stack delivery across SEO automation, multi-tenant SaaS, and generative video workflows.",
      highlights: [
        "Delivered MY AIO with Laravel, Vue.js, MySQL, Tailwind CSS, and multiple SEO/audit integrations.",
        "Built agency accounts, teams, packages, subscriptions, permissions, and client quotas with Next.js and FastAPI.",
      ],
    },
    {
      company: "Technology Innovation",
      role: "Full Stack Developer",
      location: "Lahore",
      period: "Jun 2024 — Jul 2025",
      summary: "Delivered a B2B commerce platform across sales, inventory, multi-stage pricing, integrations, and reporting.",
      highlights: [
        "Built Capone using Symfony, Shopware, Vue.js, and MySQL.",
        "Implemented third-party pricing, discounts, supplier markups, and comparative dashboards.",
      ],
    },
    {
      company: "The Right Software",
      role: "Full Stack Developer",
      location: "Islamabad",
      period: "May 2022 — Apr 2024",
      summary: "Built e-commerce and ERP products around reusable Laravel architecture, secure access, and operational workflows.",
      highlights: [
        "Developed Cash Black marketplace functionality with Laravel, Vue.js, and MySQL.",
        "Built The Right Apps ERP workflows with Livewire and granular Spatie role permissions.",
      ],
    },
    {
      company: "SoftSquare",
      role: "Laravel Backend Developer",
      location: "Lahore",
      period: "Feb 2020 — Apr 2022",
      summary: "Engineered financial APIs, calculation rules, and mobile integration contracts for the Finwiz banking platform.",
      highlights: [
        "Implemented customer calculations, balance management, and REST API workflows.",
        "Documented integration behavior and coordinated delivery with mobile developers.",
      ],
    },
    {
      company: "Apponative",
      role: "Full Stack Developer",
      location: "Lahore",
      period: "Mar 2019 — Jan 2020",
      summary: "Delivered a logistics product end to end—from customer interfaces and bookings to APIs, data, and integrations.",
      highlights: [
        "Built Moving with Sam using React, Laravel, and MySQL.",
        "Delivered relocation, travel, luggage, parcel, courier, booking, and delivery workflows.",
      ],
    },
  ],
  projects: [
    {
      slug: "my-aio",
      title: "MY AIO",
      category: "SEO automation platform",
      company: "XpertDigi",
      role: "Full Stack Developer",
      description:
        "A unified SEO automation platform that brings website audits, local-search analysis, ranking insights, content workflows, and reporting into one operational workspace.",
      contributions: [
        "Delivered features end to end across the Laravel backend, Vue.js application, and MySQL data workflows.",
        "Translated detailed Figma designs into the complete responsive interface using Tailwind CSS.",
        "Integrated BrightLocal, Substack, and other SEO and audit APIs into consistent analysis and automated reporting workflows.",
      ],
      impact: "Turned multiple SEO services and data sources into one coherent workflow for analysis, content, and reporting.",
      image: "/images/project-myaio-saas.jpg",
      url: "https://app.myaio.com",
      stack: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
      order: 1,
    },
    {
      slug: "my-aio-saas",
      title: "MY AIO SaaS",
      category: "Multi-tenant agency platform",
      company: "XpertDigi",
      role: "Full Stack Developer",
      description:
        "A multi-tenant SaaS layer that allows agencies to offer MY AIO across separate teams and clients while controlling plans, access, and product usage.",
      contributions: [
        "Built multi-tenant product workflows across a Next.js frontend, FastAPI backend, and MySQL database.",
        "Implemented agency and team account structures with role-based permissions and client-level access boundaries.",
        "Developed configurable packages, subscriptions, and quota-allocation workflows to control how clients consume the platform.",
      ],
      impact: "Established the account, permission, subscription, and usage boundaries needed to operate the product across multiple agencies.",
      image: "",
      url: "https://app.myaio.com",
      stack: ["Next.js", "FastAPI", "MySQL", "SaaS"],
      order: 2,
    },
    {
      slug: "bots",
      title: "Bots",
      category: "AI video automation",
      company: "XpertDigi",
      role: "Python / API Integration",
      description:
        "A mobile SEO automation application that turns user prompts into configurable video content, combining generation, narration, and audio choices in one guided workflow.",
      contributions: [
        "Interpreted complex VideoGen API documentation and converted its capabilities into a dependable Python integration.",
        "Developed the prompt-to-video flow and handled the request options required to generate usable video output.",
        "Implemented selectable voices, voice-over configuration, and background-music controls for generated content.",
      ],
      impact: "Made a complex generative-video API accessible through a focused workflow designed for mobile content creation.",
      image: "",
      url: "",
      stack: ["Python", "VideoGen API", "AI Automation"],
      order: 3,
    },
    {
      slug: "capone",
      title: "Capone",
      category: "B2B food commerce",
      company: "Technology Innovation",
      role: "Full Stack Developer",
      description:
        "An Italian B2B food and bakery commerce platform coordinating agent inventory, bakery ordering, supplier pricing, client markups, sales calculations, and management reporting.",
      contributions: [
        "Developed full-stack ordering and inventory workflows across Symfony, Shopware, Vue.js, and MySQL.",
        "Integrated Shopware and third-party pricing APIs and implemented original, discounted, supplier, markup, and sales calculations.",
        "Created monthly, annual, and comparative dashboards for inventory, products, orders, bakeries, and agent activity, with Firebase notifications.",
      ],
      impact: "Connected commercial calculations with day-to-day ordering and gave agents and management a clearer view of inventory and sales activity.",
      image: "/images/project-capone.png",
      url: "https://sales.1-food.com",
      stack: ["Symfony", "Shopware", "Vue.js", "MySQL"],
      order: 4,
    },
    {
      slug: "cash-black",
      title: "Cash Black",
      category: "E-commerce marketplace",
      company: "The Right Software",
      role: "Full Stack Developer",
      description:
        "A multi-category cashback marketplace supporting product and service discovery across retail, local businesses, hospitality, and hotel bookings.",
      contributions: [
        "Built Laravel, Vue.js, and MySQL functionality for varied product and service journeys within a shared marketplace architecture.",
        "Designed layout-driven APIs and structured the backend around reusable services, middleware, authentication, authorization, and database relationships.",
        "Implemented Firebase push notifications and location-aware maps that surface stores around a user’s current location.",
      ],
      impact: "Unified diverse commerce journeys with location-aware discovery and engagement features in a maintainable platform.",
      image: "/images/project-cashblack.png",
      url: "https://cashblack.com",
      stack: ["Laravel", "Vue.js", "MySQL", "REST APIs"],
      order: 5,
    },
    {
      slug: "the-right-apps",
      title: "The Right Apps",
      category: "Business ERP",
      company: "The Right Software",
      role: "Full Stack Developer",
      description:
        "A permission-aware ERP for software companies and their clients to manage staff, customer relationships, documents, invoicing, sales activity, and internal access.",
      contributions: [
        "Developed reusable operational workflows with Laravel, Livewire events, APIs, and Blade-based interfaces.",
        "Built drag-and-drop document handling and an invoicing workflow with printable PDF output.",
        "Implemented granular Spatie roles and permissions with dynamic navigation and access rules tailored to each user role.",
      ],
      impact: "Centralized everyday business operations while keeping navigation, data, and actions aligned with each user’s responsibilities.",
      image: "/images/project-trs.png",
      url: "https://cms.therightapps.com",
      stack: ["Laravel", "Livewire", "MySQL", "Spatie"],
      order: 6,
    },
    {
      slug: "moving-with-sam",
      title: "Moving with Sam",
      category: "Logistics & booking",
      company: "Apponative",
      role: "Full Stack Developer",
      description:
        "An end-to-end booking and logistics platform coordinating home relocation, travel, luggage, parcels, courier jobs, and deliveries between locations.",
      contributions: [
        "Delivered the React interfaces, Laravel REST API architecture, backend business logic, and MySQL database design and operations.",
        "Built booking and end-to-end delivery workflows that connect the customer journey with operational fulfilment.",
        "Integrated Amazon S3 storage, SMTP email, middleware, and role-based permissions to support secure day-to-day use.",
      ],
      impact: "Connected customer bookings with the backend workflows and integrations required to coordinate different delivery services.",
      image: "/images/project-moving.jpg",
      url: "https://movingwithsam.com.au",
      stack: ["React", "Laravel", "MySQL", "REST APIs"],
      order: 7,
    },
    {
      slug: "finwiz",
      title: "Finwiz",
      category: "Banking platform",
      company: "SoftSquare",
      role: "Laravel Backend Developer",
      description:
        "A banking platform whose backend supports customer financial calculations, balance management, and consistent data exchange with a mobile application.",
      contributions: [
        "Built Laravel REST APIs that exposed the banking workflows required by the mobile application.",
        "Implemented financial business rules for customer calculations and balance-management operations.",
        "Documented API behavior and integration requirements and coordinated implementation details with mobile developers.",
      ],
      impact: "Provided the mobile application with consistent financial rules and clearly defined API contracts for reliable integration.",
      image: "",
      url: "",
      stack: ["Laravel", "MySQL", "REST APIs"],
      order: 8,
    },
  ],
  education: [
    {
      degree: "BSIT — Bachelor of Science in Information Technology",
      institution: "University of Management & Technology, Lahore",
      year: "2020",
    },
  ],
  certifications: [
    { name: "Advanced Laravel", issuer: "LinkedIn Learning", year: "2024" },
    {
      name: "Vue.js: Creating and Hosting a Full-Stack Site",
      issuer: "LinkedIn Learning",
      year: "2024",
    },
  ],
};

async function seed() {
  await connectDatabase();
  await Portfolio.findOneAndUpdate(
    { key: "main" },
    { $set: portfolio },
    { upsert: true, returnDocument: "after", runValidators: true }
  );
  console.log("Portfolio content seeded successfully.");
  await mongoose.disconnect();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  seed().catch(async (error) => {
    console.error("Seed failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  });
}
