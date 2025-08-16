"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "lucide-react"
import { Menu, X, Mail, Github, Linkedin, Download, School, Briefcase, Cpu, Rocket, ChevronRight, ChevronDown } from "lucide-react";

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
    linkedin: "https://linkedin.com/in/ryanhuynh2", // TODO: update
  },
  resumeUrl: "/Ryan_Huynh_Resume.pdf", // TODO: add a real file
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
      tags: ["Soldering", "Hardware", "Electrical"],
      href: "#",
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
      period: "Starting Fall 2025",
    },
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
            I’m a passionate Computer Engineering student with a strong foundation in both hardware and software development.
            Currently preparing to begin my journey at UC Davis in Fall 2025, where I’ll continue expanding my expertise
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
        </div>
      )}
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
          <div className="size-9 rounded-2xl overflow-hidden">
            <Image
              src="/Cpu-logo.svg"
              alt="Ryan Huynh"
              width={36}
              height={36}
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
              className="inline-flex items-center gap-2 text-sm bg-slate-900 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow transition"
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
        className="mt-2 w-full inline-flex items-center justify-center gap-2 text-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-sm hover:shadow transition"
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
                <Mail className="size-4" /> Contact
              </a>
              <a
                href={CONFIG.socials.github}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
              >
                <Github className="size-4" /> GitHub
              </a>
              <a
                href={CONFIG.socials.linkedin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-2 mt-8 mb-0.05">
              <User className="size-5" />
              <h2 className="text-2xl font-bold">About</h2>
            </div> 
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
              <div className="min-w-[80px] min-h-[80px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/profile-picture.jpeg" // make sure the file is in /public with this name
                  alt="Ryan Huynh"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="leading-tight">
                <div className="font-semibold">{CONFIG.name}</div>
                <div className="text-xs text-slate-500">{CONFIG.location}</div>
              </div>
            </div>
                <div>
                  <div className="font-semibold">Computer Engineering</div>
                  <div className="text-sm text-slate-500">UC Davis · Fall 2025</div>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONFIG.projects.map((p) => (
            <Card key={p.title}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <a href={p.href} className="text-sm text-slate-500 hover:text-slate-900">View</a>
              </div>
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
        {CONFIG.education.map((ed) => (
          <Card key={ed.school}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{ed.school}</div>
                <div className="text-slate-600">{ed.degree}</div>
              </div>
              <div className="text-sm text-slate-500 whitespace-nowrap">{ed.period}</div>
            </div>
          </Card>
        ))}
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact" icon={<Mail className="size-5" />}>        
        <Card>
          <p className="text-slate-700">Want to collaborate or chat? Reach out and I’ll get back quickly.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${CONFIG.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"><Mail className="size-4"/> Email</a>
            <a href={CONFIG.socials.github} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"><Github className="size-4"/> GitHub</a>
            <a href={CONFIG.socials.linkedin} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"><Linkedin className="size-4"/> LinkedIn</a>
          </div>
        </Card>
      </Section>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {CONFIG.name}. All rights reserved.
      </footer>
    </div>
  );
}

function Section({ id, title, icon, children }: { id: string; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 py-10">
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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition">
      {children}
    </div>
  );
}
