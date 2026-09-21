"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Braces,
  CalendarDays,
  Check,
  Database,
  Download,
  ExternalLink,
  Landmark,
  Layers3,
  Mail,
  MapPin,
  Menu,
  ServerCog,
  Sparkles,
  X,
} from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { fetchPortfolio } from "@/lib/api";
import type { PortfolioData } from "@/types/portfolio";

const skillIcons = [Braces, Layers3, Database, ServerCog];

export function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolio(controller.signal)
      .then(setData)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      });
    return () => controller.abort();
  }, []);

  const projects = useMemo(
    () => data?.projects.toSorted((a, b) => a.order - b.order) || [],
    [data]
  );

  if (error) return <ErrorState message={error} />;
  if (!data) return <LoadingState />;

  const { profile, site } = data;
  const initials = profile.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="overflow-hidden bg-[#eef2f5] text-[#0b1e33]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-[#0b1e33]/10 bg-[#eef2f5]/90 px-4 py-3 shadow-[0_8px_40px_rgba(11,30,51,0.1)] backdrop-blur-xl md:px-6">
          <a className="flex items-center gap-3" href="#top" aria-label={`${profile.name} home`}>
            <span className="grid size-9 place-items-center rounded-full bg-[#0b1e33] text-xs font-extrabold text-[#b9ddff]">
              {initials}
            </span>
            <span className="hidden text-sm font-extrabold tracking-[-0.03em] sm:block">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {site.navigation.map((item) => (
              <a className="nav-link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-2 text-xs font-semibold text-black/60">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
              </span>
              {site.header.availabilityLabel}
            </span>
            <a className="button-dark" href="#contact">
              {site.header.contactCta} <ArrowUpRight className="size-4" />
            </a>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-full bg-[#0b1e33] text-white sm:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mx-auto mt-2 grid max-w-[1440px] gap-1 rounded-3xl bg-[#0b1e33] p-4 text-white shadow-2xl sm:hidden">
            {site.navigation.map((item) => (
              <a
                className="rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-white/10"
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="relative min-h-[840px] px-5 pb-20 pt-32 md:px-8" id="top">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-55" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <div className="pt-6 lg:pt-14">
            <div className="mb-8 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em] text-black/55">
              <span className="h-px w-10 bg-black/30" />
              {profile.location}
            </div>

            <h1 className="max-w-5xl text-[clamp(4rem,8vw,8rem)] font-extrabold leading-[0.86] tracking-[-0.075em]">
              {site.hero.headline}
              <span className="block font-serif font-normal italic text-[#2d69a7]">{site.hero.headlineAccent}</span>
            </h1>

            <div className="mt-10 grid gap-8 border-t border-black/15 pt-7 md:grid-cols-[1fr_1fr] md:gap-12">
              <p className="max-w-md text-xl font-semibold leading-relaxed tracking-[-0.03em] md:text-2xl">
                {profile.eyebrow}
              </p>
              <div>
                <p className="max-w-xl text-base leading-7 text-black/60">{profile.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="button-dark" href="#work">
                    {site.hero.primaryCta} <ArrowDown className="size-4" />
                  </a>
                  <a className="button-light" href={profile.resumeUrl} download>
                    {site.hero.resumeCta} <Download className="size-4" />
                  </a>
                  {profile.linkedinUrl && (
                    <a className="button-light" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
                      LinkedIn <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[470px] lg:mt-14">
            <div className="portrait-aura absolute inset-0 rounded-[4rem]" />
            <div className="relative mx-auto max-w-[390px] p-5 md:p-7">
              <div className="relative aspect-square overflow-hidden rounded-[2.75rem] border-[10px] border-white bg-[#9ba3a8] shadow-[0_35px_90px_rgba(11,30,51,0.24)]">
                <Image
                  alt={`${profile.name}, ${profile.title}`}
                  className="object-contain"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 640px) 300px, 340px"
                  src={profile.heroImage}
                />
              </div>
            </div>
            <div className="absolute -left-2 top-12 hidden rounded-2xl border border-[#0b1e33]/10 bg-white/90 p-4 shadow-xl backdrop-blur md:block">
              <Sparkles className="mb-5 size-5 text-[#2d69a7]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b1e33]/45">{site.hero.currentFocusLabel}</p>
              <p className="mt-1 max-w-40 text-sm font-bold">{site.hero.currentFocus}</p>
            </div>
            <div className="absolute -bottom-5 right-0 rounded-2xl bg-[#0b1e33] px-5 py-4 text-white shadow-2xl md:right-1">
              <p className="text-xl font-extrabold tracking-[-0.04em]">{profile.name}</p>
              <p className="mt-1 text-[11px] text-[#b9ddff]">{profile.title} · {profile.experienceLabel}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#0b1e33]/10 bg-[#0b1e33] py-5 text-white">
        <div className="ticker flex min-w-max items-center gap-8 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          {[...site.ticker, ...site.ticker].map((item, index) => (
            <span className="flex items-center gap-8" key={`${item}-${index}`}>
              {item} <span className="text-[#8cc8ff]">✦</span>
            </span>
          ))}
        </div>
      </section>

      <section className="section-shell" id="work">
        <SectionIntro {...site.sections.work} />

        <div className="mx-auto mt-12 grid max-w-[1280px] grid-cols-1 gap-7 lg:grid-cols-2 xl:gap-8">
          {projects.map((project, index) => (
            <article className="project-card group flex h-full flex-col" key={project.slug}>
              <div className="project-window relative bg-[#cbd6df] px-3 pb-3 pt-10 sm:px-4 sm:pb-4 sm:pt-11">
                <div className="absolute left-5 top-4 flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[#6f8293]" />
                  <span className="size-2.5 rounded-full bg-[#91a4b5]" />
                  <span className="size-2.5 rounded-full bg-[#b2c2cf]" />
                  <span className="ml-3 hidden text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b1e33]/55 sm:block">{project.category}</span>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-[#0b1e33]/10 bg-white shadow-[0_14px_35px_rgba(11,30,51,0.12)]">
                  {project.image && project.slug !== "my-aio-saas" ? (
                    <Image
                      alt={`${project.title} interface`}
                      className={project.slug === "my-aio" ? "object-cover object-top" : "object-contain object-center"}
                      fill
                      sizes="(max-width: 767px) 94vw, 46vw"
                      src={project.image}
                      unoptimized
                    />
                  ) : (
                    <ProjectVisual project={project} selectedSystemLabel={site.projectLabels.selectedSystem} />
                  )}
                </div>
                {project.url && (
                  <a
                    aria-label={`Visit ${project.title}`}
                    className="absolute right-5 top-3 grid size-9 place-items-center rounded-full bg-[#0b1e33] text-white shadow-lg transition group-hover:rotate-45 md:size-10"
                    href={project.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ArrowUpRight className="size-5" />
                  </a>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {project.company || project.category}
                  </p>
                  <span className="role-pill">{project.role || site.projectLabels.fallbackRole}</span>
                </div>

                <h3 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] md:text-4xl">{project.title}</h3>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.17em] text-[#2d69a7]">
                  {site.projectLabels.context}
                </p>
                <p className="mt-2 max-w-2xl leading-7 text-black/60">{project.description}</p>

                <div className="contribution-panel mt-6">
                  <p className="contribution-label">{site.projectLabels.ownership}</p>
                  <ul className="mt-4 grid gap-3">
                    {(project.contributions ?? (project.impact ? [project.impact] : [])).map((contribution) => (
                      <li className="flex gap-3 text-sm leading-6 text-[#0b1e33]/75" key={contribution}>
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#dcecff] text-[#2d69a7]">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.impact && (
                  <div className="project-outcome mt-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#2d69a7]">{site.projectLabels.value}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#0b1e33]/75">{project.impact}</p>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.stack.map((technology) => (
                    <span className="tech-pill" key={technology}>{technology}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#dce8f1]" id="expertise">
        <div className="section-shell">
          <SectionIntro {...site.sections.expertise} />

          <div className="mt-16 grid border-l border-t border-black/20 md:grid-cols-2 lg:grid-cols-4">
            {data.skillGroups.map((group, index) => {
              const Icon = skillIcons[index % skillIcons.length];
              return (
                <article className="border-b border-r border-black/20 p-7 md:p-8" key={group.title}>
                  <div className="mb-16 grid size-12 place-items-center rounded-full border border-black/20">
                    <Icon className="size-5" />
                  </div>
                  <p className="mb-2 text-xs font-black">0{index + 1}</p>
                  <h3 className="text-2xl font-extrabold tracking-[-0.04em]">{group.title}</h3>
                  <p className="mt-4 min-h-20 text-sm leading-6 text-black/60">{group.description}</p>
                  <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-sm font-bold">
                    {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1e33] text-white" id="experience">
        <div className="section-shell">
          <SectionIntro dark {...site.sections.experience} />

          <div className="mt-16 border-t border-white/15">
            {data.experiences.map((experience, index) => (
              <article className="experience-row" key={`${experience.company}-${experience.period}`}>
                <div className="text-xs font-bold text-[#8cc8ff]">0{index + 1}</div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.04em] md:text-3xl">{experience.company}</h3>
                  <p className="mt-1 text-sm text-white/45">{experience.location}</p>
                </div>
                <div>
                  <p className="font-bold">{experience.role}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">{experience.summary}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-white/70">
                    {experience.highlights.map((highlight) => (
                      <li className="flex gap-3" key={highlight}>
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#8cc8ff]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-sm font-semibold text-white/50 lg:text-right">{experience.period}</div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid overflow-hidden rounded-[2rem] bg-[#132f4b] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[420px]">
              <Image
                alt={site.feature.workspaceImageAlt}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                src={profile.workspaceImage}
              />
            </div>
            <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16">
              <blockquote className="font-serif text-4xl leading-tight tracking-[-0.04em] md:text-5xl">
                “{site.feature.quote} <span className="italic text-[#8cc8ff]">{site.feature.emphasis}</span>”
              </blockquote>
              <div className="mt-14 grid gap-6 border-t border-white/15 pt-7 sm:grid-cols-3">
                {profile.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-[#8cc8ff]">{stat.value}</p>
                    <p className="mt-1 text-xs text-white/45">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow-dark">{site.feature.educationLabel}</p>
              {data.education.map((item) => (
                <div className="mt-5" key={item.degree}>
                  <p className="text-xl font-bold">{item.degree}</p>
                  <p className="mt-2 text-sm text-white/50">{item.institution} · {item.year}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="eyebrow-dark">{site.feature.certificationsLabel}</p>
              <div className="mt-5 grid gap-4">
                {data.certifications.map((item) => (
                  <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4" key={item.name}>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="mt-1 text-xs text-white/45">{item.issuer}</p>
                    </div>
                    <span className="text-xs text-[#8cc8ff]">{item.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e5ebef]" id="contact">
        <div className="section-shell">
          <div className="grid overflow-hidden rounded-[2.5rem] bg-[#0b1e33] text-white lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-[#102940] p-8 md:p-12 lg:border-b-0 lg:border-r lg:p-14">
              <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-white/[0.06]" />
              <div className="pointer-events-none absolute -right-4 -top-8 size-44 rounded-full border border-[#8cc8ff]/10" />
              <div className="relative">
                <div className="mb-10 flex size-12 items-center justify-center rounded-full bg-[#8cc8ff] text-[#0b1e33]">
                  <CalendarDays className="size-5" />
                </div>
                <p className="eyebrow-dark">{site.contact.eyebrow}</p>
                <h2 className="mt-5 text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] md:text-6xl">
                  {site.contact.title}
                </h2>
                <p className="mt-6 max-w-md leading-7 text-white/55">
                  {site.contact.body}
                </p>
              </div>
              <div className="relative mt-16 grid gap-4 text-sm text-white/65">
                <span className="flex items-center gap-3"><MapPin className="size-4 text-[#8cc8ff]" /> {profile.location}</span>
                <a className="flex items-center gap-3 transition hover:text-white" href={`mailto:${profile.email}`}>
                  <Mail className="size-4 text-[#8cc8ff]" /> {profile.email}
                </a>
                <span className="flex items-center gap-3"><Sparkles className="size-4 text-[#8cc8ff]" /> {profile.availability}</span>
              </div>
            </div>
            <div className="p-8 md:p-12 lg:p-14">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#e5ebef] px-5 pb-8 md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-t border-black/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-4xl italic tracking-[-0.04em]">{profile.name}</p>
            <p className="mt-2 text-xs text-black/45">{profile.title} · {profile.location}</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs font-bold">
            {profile.linkedinUrl && (
              <a className="inline-flex items-center gap-2 hover:text-[#2d69a7]" href={profile.linkedinUrl} rel="noreferrer" target="_blank">
                LinkedIn <ExternalLink className="size-3.5" />
              </a>
            )}
            {profile.githubUrl && (
              <a className="inline-flex items-center gap-2 hover:text-[#2d69a7]" href={profile.githubUrl} rel="noreferrer" target="_blank">
                GitHub <ExternalLink className="size-3.5" />
              </a>
            )}
            <a className="inline-flex items-center gap-2 hover:text-[#2d69a7]" href={profile.resumeUrl} download>
              {site.footer.resumeLabel} <Download className="size-3.5" />
            </a>
            <a className="inline-flex items-center gap-2 hover:text-[#2d69a7]" href="#top">
              {site.footer.backToTopLabel} <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectVisual({
  project,
  selectedSystemLabel,
}: {
  project: PortfolioData["projects"][number];
  selectedSystemLabel: string;
}) {
  const isAutomation = project.slug === "bots" || project.slug === "my-aio-saas";
  const Icon = isAutomation ? Bot : project.slug === "finwiz" ? Landmark : Layers3;

  return (
    <div className={`project-placeholder ${isAutomation ? "project-placeholder-ai" : "project-placeholder-finance"}`}>
      <div className="project-placeholder-grid" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/55">
            {selectedSystemLabel}
          </span>
          <span className="size-2 rounded-full bg-[#8cc8ff] shadow-[0_0_18px_#8cc8ff]" />
        </div>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="mb-4 grid size-12 place-items-center rounded-2xl border border-white/15 bg-white/10 text-[#8cc8ff] backdrop-blur">
              <Icon className="size-6" />
            </div>
            <p className="text-3xl font-extrabold tracking-[-0.05em] text-white sm:text-4xl">{project.title}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-white/45">{project.category}</p>
          </div>
          <div className="hidden items-end gap-1 sm:flex" aria-hidden="true">
            {[38, 58, 44, 76, 62, 88].map((height, index) => (
              <span
                className="w-2 rounded-full bg-[#8cc8ff]/60"
                key={`${height}-${index}`}
                style={{ height: `${height}px`, opacity: 0.35 + index * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({
  index,
  kicker,
  title,
  body,
  dark = false,
}: {
  index: string;
  kicker: string;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div className={`grid gap-8 border-t pt-6 lg:grid-cols-[0.3fr_1.25fr_0.65fr] ${dark ? "border-white/15" : "border-black/15"}`}>
      <p className={`text-xs font-black ${dark ? "text-[#8cc8ff]" : "text-[#2d69a7]"}`}>{index}</p>
      <div>
        <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${dark ? "text-white/45" : "text-black/45"}`}>{kicker}</p>
        <h2 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.97] tracking-[-0.06em] md:text-7xl">{title}</h2>
      </div>
      <p className={`max-w-md self-end text-sm leading-7 ${dark ? "text-white/50" : "text-black/55"}`}>{body}</p>
    </div>
  );
}

function LoadingState() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#eef2f5] p-6 text-[#0b1e33]">
      <div className="text-center">
        <div className="mx-auto mb-5 grid size-14 animate-pulse place-items-center rounded-full bg-[#0b1e33] text-sm font-black text-[#8cc8ff]">AF</div>
        <p className="text-sm font-bold">Loading </p>
      </div>
    </main>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b1e33] p-6 text-white">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8cc8ff]">Connection needed</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">The API is not available.</h1>
        <p className="mt-4 text-sm leading-6 text-white/55">{message}</p>
        <p className="mt-6 text-xs text-white/35">Start the backend and seed MongoDB using the commands in COMMANDS.md.</p>
      </div>
    </main>
  );
}
