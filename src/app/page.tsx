"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "lucide-react"
import { Menu, X, Mail, Github, Linkedin, Download, School, Briefcase, Cpu, Rocket, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
// Tailwind is available by default in this canvas preview environment.
// This is a single-file React component you can drop into a Vite/Next/CRA app.
// Customize the data in the CONFIG section below.
const CONFIG = {
  name: "Ryan Huynh",
  tagline: "Incoming Computer Engineering student @ UC Davis (Fall 2025)",
  summary:
    "Aspiring computer engineer with a strong foundation in C/C++, embedded systems, and web development. Passionate about building reliable, user-centric solutions.",
  email: "ryhuynh2@gmail.com", // TODO: update
  location: "Hayward, CA",
  socials: {
    github: "https://github.com/ryanhuynh02", // TODO: update
    linkedin: "https://www.linkedin.com/in/ryan-huynh2", // TODO: update
  },
  resumeUrl: "/Ryan_Huynh_Resume.pdf?v=2025-08-19", // TODO: add a real file
  skills: [
    "C/C++",
    "Python",
    "Embedded (Arduino/ESP32)",
    "Verilog/VHDL (basics)",
    "Digital Logic",
    "Data Structures",
    "Algorithms",
    "HTML/CSS/JS",
    "React",
    "TailwindCSS",
    "Git/GitHub",
  ],
  projects: [
    {
      title: "Door Sensor w/ Reed Switch & Piezo",
      description:
        "Designed a low-power door sensor using a magnet and reed switch with audible alert; modeled behavior and tuned thresholds.",
      tags: ["Soldering", "Hardware", "Wiring"],
      href: "/projects/door-sensor",
      images: [
        "/projects/doorSlide1.jpg",
        "/projects/doorSlide2.jpg",
        "/projects/doorSlide3.jpg",
        "/projects/doorSlide5.jpg",
        "/projects/doorSlide6.jpg",
        "/projects/doorSlide7.jpg",
      ],
    },
    {
      title: "Color & Math Game (Ionic)",
      description:
        "A mini suite of color-based memory and recognition games; built reusable components and state management.",
      tags: ["Ionic", "TypeScript", "Mobile"],
      href: "#",
    },
    {
      title: "City Flights (C++ Graphs)",
      description:
        "Reads a connections.txt file to construct adjacency lists and computes shortest path via BFS.",
      tags: ["C++", "Graphs", "Algorithms"],
      href: "#",
    },
  ],
  experience: [
    {
      role: "Engineering Intern",
      org: "San Francisco State University (SFSU)",
      period: "June 2025 – August 2025",
      bullets: [
        "Collaborated with engineering teams on cutting-edge research projects.",
        "Applied theoretical knowledge to real-world engineering challenges.",
        "Constructed the Carmen robot hardware for lab research.",
        "Translated an iOS app game into a web application to help children with complex communication needs express internal states and support individuals with cognitive impairments."
      ],
      
    },
  ],
  education: [
    {
      school: "University of California, Davis",
      degree: "B.S. in Computer Engineering (Incoming)",
      location: "Davis, CA",
      period: "Starting Fall 2025",
    },

    {
      school: "Chabot College",
      degree: "A.S. in Liberal Arts of Science & Math",
      location: "Hayward, CA",
      period: "Graduated June 2025"
    }
    
  ],
};
function AboutCollapse() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-700">More about me</span>
        <ChevronDown className={`h-4 w-4 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-3 text-sm leading-6 text-slate-700 space-y-3">
          <p>
            I’m a passionate Computer Engineering student with practical experience in both hardware and software development.
            Currently preparing to begin my journey at UC Davis in Fall 2025, where I’ll continue expanding my knoweledge
            in cutting-edge technologies.
          </p>
          <p>
            During my internship at San Francisco State University from June to August 2025, I gained hands-on experience
            in real-world engineering projects, collaborating with teams and applying theoretical knowledge to practical solutions.
          </p>
          <p>
            I’m excited about the intersection of hardware and software, with particular interests in embedded systems,
            machine learning, and innovative computing solutions that can make a positive impact on society.
          </p>
          <p>
            In addition to my academic interests, I enjoy sports such as soccer, badminton, billiards, and archery. While soccer was once my primary focus, I recently learned the others when I hang out with my friends. They are really nice and show me step by step on how to play these sports; I am grateful for their support and the memories we’ve made.
          </p>
          <p>
            I also have a passion for cooking. Whenever I have free time, I enjoy helping my mom prepare dinner and learning her cooking techniques. I find joy in trying new recipes, as it allows me to discover new flavors and expand my culinary skills.
          </p>
        </div>
      )}
    </div>
  );
}

function ExperienceMoreSFSU() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-700">More details</span>
        <ChevronDown className={`h-4 w-4 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-3 text-sm leading-6 text-slate-700 space-y-3">
          <p>
            I’ve been selected as a Summer Training Academy for Research Scholars (STARS) Program. 
            During my research, I collaborated with Professor Alyssa Kubota at the Personalized Health
            and Assistive Technologies Laboratory (PHAST Lab) at San Francisco State University. 
            My role in the lab involved constructing the Carmen robot hardware and translating the iOS app game into a web version 
            that aids children with complex communication needs in expressing their internal states and individuals with cognitive impairments.
          </p>
          <p>
            There were lots of documents I needed to read on how robots will impact not only physically but also emotionally to human life. 
            Our labs also work with clinicians to better understand how to engage patients with our Carmen robots. We also have to implement the study of 
            AAC (Augmented and Alternative Communication) and VSD (Visual Scene Display) into our Carmen to make it behave more like a humanoid and assist people with cognitive disabilities
          </p>
          <p>
            When I first started my internship in the lab, I felt overwhelmed and a little bit of nervous because this was my first internship. Additionally, there were many tasks to complete, and I also wasn’t sure which ones to prioritize. I also wondered whether we could finish everything within two months.
          </p>
          <p>
            As time went on, I had to adapt quickly to the workflow and build connections with my teammates by learning from them and through self-teaching. Fortunately, my mentor, Mathew, was very friendly, helpful, and supportive. He regularly checked on our progress, ensured we didn’t get stuck, and guided us in solving problems. I am especially thankful to him for his hard work and valuable advice, and I have learned many meaningful things from him.
          </p>
          <p>
            The most challenging part we faced was setting up the Raspberry Pi, which took nearly three weeks. We had to figure out and test the default position while installing the Dynamixel packages, and we had to flash our drive multiple times while trying to install ROS on the Pi. During the internship, each lab had to give two presentations. I wasn’t very confident speaking in front of a large audience, but it turned out to be a valuable practice environment that helped me improve my communication skills.
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0); // slide width + gap in px

  // measure slide width + gap so scrolling snaps correctly across breakpoints
  const measure = () => {
    const el = ref.current;
    if (!el) return;
    const first = el.querySelector('[data-slide="0"]') as HTMLElement | null;
    const gapPx = parseFloat(getComputedStyle(el).gap || "0");
    const w = (first?.clientWidth ?? 0) + gapPx;
    setStep(w || 1);
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // keep index in sync when the user swipes/scrolls
  useEffect(() => {
    const el = ref.current;
    if (!el || !step) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / step);
        setIdx(Math.max(0, Math.min(images.length - 1, i)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [step, images.length]);

  const scrollToIndex = (i: number) => {
    const el = ref.current;
    if (!el || !step) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    el.scrollTo({ left: clamped * step, behavior: "smooth" });
    setIdx(clamped);
  };

  const atStart = idx <= 0;
  const atEnd = idx >= images.length - 1;

  if (!images?.length) return null;

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-4
                   [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${title} images`}
        role="group"
      >
        {images.map((src, i) => (
          <div
            key={src}
            data-slide={i}
            className="relative snap-start shrink-0 w-[60vw] sm:w-64 aspect-[4/3]
                rounded-xl overflow-hidden border border-slate-200
                transform transition duration-300 md:group-hover:scale-105 md:group-hover:shadow-md"
          >
            <Image
              src={src}
              alt={`${title} image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 288px, (min-width:768px) 288px, 60vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
        {/* tiny end spacer so last slide isn't glued to the edge */}
        <div className="shrink-0 w-3" />
      </div>

      {/* Left arrow: hidden on first image */}
      <button
        type="button"
        onClick={() => scrollToIndex(idx - 1)}
        aria-label="Previous image"
        className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2
                    h-8 w-8 items-center justify-center rounded-full bg-white/90
                    border border-slate-200 shadow hover:bg-white transition
                    ${atStart ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        ‹
      </button>

      {/* Right arrow: hidden on last image */}
      <button
        type="button"
        onClick={() => scrollToIndex(idx + 1)}
        aria-label="Next image"
        className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2
                    h-8 w-8 items-center justify-center rounded-full bg-white/90
                    border border-slate-200 shadow hover:bg-white transition
                    ${atEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        ›
      </button>
    </div>
  );
}

export default function Portfolio() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  useEffect(() => {
    // prevent the page behind the drawer from scrolling
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900 pt-16">
      {/* Header */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-slate-200
                  bg-white supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
          <div className="size-16 rounded-2xl overflow-hidden">
            <Image
              src="/profile-logo.svg"
              alt="Ryan Huynh"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">{CONFIG.name}</div>
            <div className="text-xs text-slate-500">{CONFIG.location}</div>
          </div>
        </div>
       </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-slate-600 hover:text-slate-900 transition"
              >
                {n.label}
              </button>
            ))}
            <a
              href={CONFIG.resumeUrl}
              download                // ⬅️ add this
              className="inline-flex items-center gap-2 text-sm bg-slate-900 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow transition"
              aria-label="Download my resume (PDF)"
            >
              <Download className="size-4" /> Resume
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-100"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (moved outside the header) */}
<div className={`fixed inset-0 z-[9999] ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
  {/* Opaque overlay: blocks underlying content and closes on tap */}
  <button
    type="button"
    aria-label="Close menu overlay"
    onClick={() => setOpen(false)}
    className={`absolute inset-0 transition-opacity ${open ? "opacity-100" : "opacity-0"} bg-black/60 backdrop-blur-sm`}
  />
  {/* Slide-in panel */}
  <aside
    className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl border-r border-slate-200 transform transition-transform duration-300 ${
      open ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200">
      <div className="font-semibold">Menu</div>
      <button className="p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(false)} aria-label="Close menu">
        <X className="size-5" />
      </button>
    </div>
    <nav className="p-2">
      {navItems.map((n) => (
        <button
          key={n.id}
          onClick={() => scrollTo(n.id)}
          className="w-full text-left px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center justify-between"
        >
          <span>{n.label}</span>
          <ChevronRight className="size-4" />
        </button>
      ))}
      <a
        href={CONFIG.resumeUrl}
        download                // ⬅️ add this
        className="mt-2 w-full inline-flex items-center justify-center gap-2 text-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-sm hover:shadow transition"
        aria-label="Download my resume (PDF)"
      >
        <Download className="size-4" /> Download Resume
      </a>
    </nav>
  </aside>
</div>


      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-10">
        <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {CONFIG.name}
            </h1>
            <p className="mt-3 text-lg text-slate-600">{CONFIG.tagline}</p>
            <p className="mt-4 text-slate-700 max-w-prose">{CONFIG.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONFIG.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
              >
                <Mail className="size-4" /> Email
              </a>
              <a
                href={CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
              >
                <Github className="size-4" /> GitHub
              </a>
              <a
                href={CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </div>
            <div id = "about" className="flex items-center gap-2 mt-12 scroll-mt-24">
              <User className="size-5" />
              <h2 className="text-2xl font-bold">About</h2>
            </div> 
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-28 h-28 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0">
              <Image
                src="/profile-picture.jpeg"
                alt="Ryan Huynh"
                width={112}
                height={112}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* min-w-0 lets long text wrap inside flex rows; use smaller line-heights to avoid crowding */}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              {/* Name */}
              <div className="text-xl sm:text-2xl font-semibold leading-tight break-words">
                {CONFIG.name}
              </div>

              {/* Location BELOW name */}
              <div className="mt-1 text-slate-600 text-xs leading-snug">
                {CONFIG.location}
              </div>

              {/* Computer Engineering BELOW location */}
              <div className="mt-1 text-slate-800 font-semibold leading-snug">
                Computer Engineering
              </div>

              {/* UC Davis BELOW computer engineering */}
              <div className="mt-1 text-xs text-slate-500">
                UC Davis · Fall 2025
              </div>
            </div>
          </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2"><Cpu className="size-4"/> Digital logic, microcontrollers, and systems</li>
                <li className="flex items-center gap-2"><Rocket className="size-4"/> Curious, fast-learner, team collaborator</li>
              </ul>
{/* Collapsible “About me” text */}
<AboutCollapse />

            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={<Briefcase className="size-5" />}>        
        {CONFIG.experience.map((e) => (
          <Card key={e.org}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg">{e.role}</h3>
                <div className="text-slate-600">{e.org}</div>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-slate-700">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-slate-500 whitespace-nowrap">{e.period}</div>
            </div>
            {e.org.includes("San Francisco State University") && <ExperienceMoreSFSU />}
          </Card>
        ))}
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Github className="size-5" />}>        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONFIG.projects.map((p) => (
            <Card key={p.title}>
              <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg transition group-hover:text-slate-900 group-hover:underline underline-offset-4">
                {p.title}
              </h3>
                <Link
                  href={p.href}
                  className="px-4 py-1 rounded-full border border-slate-300 text-slate-600
                            hover:bg-[#007AFF] hover:text-white
                            active:bg-[#007AFF] active:text-white
                            transition-colors duration-200"
                >
                  View
                </Link>

              </div>
              {/* ⬇️ add this line */}
              {p.images?.length ? (
                <div className="mt-2">
                  <ProjectCarousel images={p.images} title={p.title} />
                </div>
              ) : null}

              <p className="mt-2 text-slate-700">{p.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs bg-slate-100 border border-slate-200 rounded-full px-2 py-1">{t}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<Cpu className="size-5" />}>        
        <div className="flex flex-wrap gap-2">
          {CONFIG.skills.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" icon={<School className="size-5" />}>
        <div className="space-y-4">  {/* adds gap between items */}
        {CONFIG.education.map((ed) => (
          <Card key={ed.school}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{ed.school}</div>
                <div className="text-slate-600">{ed.degree}</div>
                {ed.location && (
                  <div className="mt-1 text-sm text-slate-500">{ed.location}</div>
                )}
              </div>
              <div className="text-sm text-slate-500 whitespace-nowrap">{ed.period}</div>
            </div>
          </Card>
        ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" icon={<Mail className="size-5" />}>        
        <Card>
          <p className="text-slate-700">Want to collaborate or chat? Reach out and I’ll get back quickly.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a 
            href={`mailto:${CONFIG.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100">
            <Mail className="size-4"/> Email
            </a>
          <a
            href={CONFIG.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
          >
            <Github className="size-4" /> GitHub
          </a>

          <a
            href={CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
          >
            <Linkedin className="size-4" /> LinkedIn
          </a>
          </div>
        </Card>
      </Section>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {CONFIG.name}. All rights reserved.
      </footer>
    </div>
  );
}

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow">
      {children}
    </div>
  );
}

