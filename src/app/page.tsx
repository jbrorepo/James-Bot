'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Code, Bot, Users, Briefcase, GraduationCap, Mail, Calendar, FileText, Linkedin, MessageSquare, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.12 } },
};

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const achievements = [
    { number: '120+', label: 'Customers Supported' },
    { number: '95-100%', label: 'Customer Satisfaction' },
    { number: '13 Months', label: 'Promotion Timeline' },
    { number: '3', label: 'Team Members Led' },
];

const experience = [
    {
        title: 'Concierge Security Engineer 3 & Team Lead',
        company: 'Arctic Wolf • May 2024 - Present',
        description: 'Leading a team of 3 engineers supporting 120+ customers. Performing deep log-source analysis, cloud security hardening across AWS, Azure, and GCP, and proactive security posture reviews. Promoted to Team Lead in June 2025 after exceptional performance.',
    },
    {
        title: 'Customer Technical Engineer',
        company: 'Alert Logic by Fortra • Previous Role',
        description: 'Owned technical relationships for enterprise accounts, handled escalated security issues, and guided customers through best practices. Consistently maintained 95-100% CSAT scores across managed accounts.',
    },
    {
        title: 'AI Innovation Projects',
        company: 'Personal Development • Ongoing',
        description: 'Building AI-powered solutions including this portfolio assistant using Google Gemini, Next.js, and the Vercel AI SDK. Also developing OCR and image recognition systems for trading card game applications.',
    },
];

const projects = [
    {
        title: '🤖 AI Resume Assistant',
        company: 'Personal Project • 2025',
        description: 'Built this interactive AI assistant using Google Gemini, Next.js, and retrieval-augmented generation. Features semantic search over curated knowledge data, strict factual constraints, and a premium streaming chat UI.',
        tags: ['Google Gemini', 'Next.js', 'Vercel AI SDK', 'TypeScript'],
    },
    {
        title: '🃏 Card Recognition AI',
        company: 'Riftbound Trading Card Game • Ongoing',
        description: 'Developing OCR and image recognition system for trading card identification and auto-parsing. Combines computer vision with practical gaming applications.',
        tags: ['OCR', 'Computer Vision', 'Python', 'Image Processing'],
    },
    {
        title: '🔧 Customer Automation Tools',
        company: 'Arctic Wolf • 2024-2025',
        description: 'Created Python and PowerShell scripts for bulk account management, log parsing automation, and customer workflow optimization. Reduced manual tasks by 60% and improved team efficiency across 120+ accounts.',
        tags: ['Python', 'PowerShell', 'Automation', 'APIs'],
    },
];

const skillCategories = [
    {
        icon: <Shield className="w-5 h-5" />,
        title: '🔒 Security & Cloud',
        tags: ['AWS Security', 'Azure Security', 'GCP Security', 'IAM Reviews', 'Log Analysis', 'Incident Response'],
    },
    {
        icon: <Code className="w-5 h-5" />,
        title: '💻 Programming & Automation',
        tags: ['Python', 'TypeScript', 'PowerShell', 'Bash', 'Next.js', 'FastAPI'],
    },
    {
        icon: <Bot className="w-5 h-5" />,
        title: '🤖 AI & Modern Tech',
        tags: ['Google Gemini', 'Vercel AI SDK', 'RAG Systems', 'OCR', 'Image Recognition', 'Embeddings'],
    },
    {
        icon: <Users className="w-5 h-5" />,
        title: '👥 Leadership & Customer Success',
        tags: ['Team Leadership', 'Customer Success', 'Technical Account Management', 'Mentoring', 'Stakeholder Management'],
    },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* ── Navigation ────────────────────── */}
            <nav className={[
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-[rgba(10,10,10,0.98)] border-[#1a1a1a] shadow-lg"
                    : "bg-[rgba(10,10,10,0.95)] border-transparent"
            ].join(" ")}>
                <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="text-2xl font-bold gradient-text">James Bell</span>
                    <ul className="hidden md:flex gap-8 list-none">
                        {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map(item => (
                            <li key={item}>
                                <a href={"#" + item.toLowerCase()} className="text-[#e0e0e0] hover:text-[#667eea] font-medium transition-colors no-underline">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* ── Hero ────────────────────────────── */}
            <section id="home" className="min-h-screen flex items-center hero-glow pt-20">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <h1 className="text-[3.5rem] md:text-[4rem] font-bold leading-tight gradient-text mb-4">
                            James Bell
                        </h1>
                        <p className="text-xl md:text-2xl text-[#b0b0b0] font-light mb-6">
                            Concierge Security Engineer 3 & Team Lead
                        </p>
                        <p className="text-lg text-[#d0d0d0] leading-relaxed mb-8 max-w-xl">
                            Leading security teams at Arctic Wolf while pioneering AI-driven solutions.
                            I specialize in cloud security hardening, customer success, and building
                            intelligent systems that enhance human capabilities.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/chat" className="gradient-bg text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(102,126,234,0.3)] transition-all no-underline">
                                <MessageSquare className="w-5 h-5" /> Chat with My AI
                            </Link>
                            <a href="/James Bell Resume 2025.pdf" target="_blank" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                                <FileText className="w-5 h-5" /> Download Resume
                            </a>
                            <a href="https://www.linkedin.com/in/james-bell-tam" target="_blank" rel="noreferrer" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                                <Linkedin className="w-5 h-5" /> LinkedIn
                            </a>
                            <a href="https://calendly.com/jamesbellworkrelated" target="_blank" rel="noreferrer" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                                <Calendar className="w-5 h-5" /> Schedule Call
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full profile-ring shadow-[0_20px_40px_rgba(102,126,234,0.3)]">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2a2a2a] relative">
                                <Image
                                    src="/james-headshot.jpg"
                                    alt="James Bell - Concierge Security Engineer 3 & Team Lead at Arctic Wolf"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── About ───────────────────────────── */}
            <section id="about" className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-[2.5rem] font-bold text-center mb-12 gradient-text">About Me</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16 items-start">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <p className="text-lg text-[#d0d0d0] leading-relaxed mb-6">
                                I'm a security engineer who believes technology should enhance human capabilities, not replace them.
                                At Arctic Wolf, I lead a team of three engineers supporting over 120 customers, focusing on proactive
                                security posture improvements and rapid incident recovery.
                            </p>
                            <p className="text-lg text-[#d0d0d0] leading-relaxed mb-8">
                                My journey from individual contributor to team lead in just over a year demonstrates my commitment
                                to excellence and continuous learning. I'm passionate about AI-driven solutions and have built
                                several projects, including this very AI assistant you can chat with.
                            </p>
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {achievements.map(a => (
                                    <motion.div key={a.label} variants={fadeUp} className="bg-[#2a2a2a] rounded-xl p-5 text-center border border-[#333]">
                                        <div className="text-2xl font-bold text-[#667eea] mb-1">{a.number}</div>
                                        <div className="text-[#b0b0b0] text-sm font-medium">{a.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Chat Preview */}
                        <motion.div
                            className="card p-6 rounded-2xl"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#2a2a2a]">
                                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold text-sm">JB</div>
                                <div>
                                    <h3 className="text-base font-semibold">AI Assistant</h3>
                                    <p className="text-[#999] text-sm">Ask me anything about James</p>
                                </div>
                            </div>
                            <div className="space-y-3 mb-4">
                                <div className="flex gap-2 justify-end">
                                    <div className="gradient-bg text-white py-2 px-3 rounded-xl text-sm max-w-[80%]">
                                        What's your current role at Arctic Wolf?
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-[#2a2a2a] text-[#e0e0e0] py-2 px-3 rounded-xl text-sm max-w-[80%]">
                                        I'm a Concierge Security Engineer 3 and Team Lead at Arctic Wolf. I lead a team of three engineers supporting 120+ customers…
                                    </div>
                                </div>
                            </div>
                            <Link href="/chat" className="gradient-bg text-white font-semibold rounded-lg py-3 w-full flex items-center justify-center gap-2 no-underline hover:-translate-y-0.5 transition-transform">
                                Try the AI Assistant
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Experience ──────────────────────── */}
            <section id="experience" className="py-20 section-alt">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-[2.5rem] font-bold text-center mb-12 gradient-text">Professional Experience</h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {experience.map(exp => (
                            <motion.div key={exp.title} variants={fadeUp} className="card p-8 rounded-2xl">
                                <h3 className="text-xl font-semibold text-[#667eea] mb-2">{exp.title}</h3>
                                <p className="text-[#b0b0b0] font-medium mb-3">{exp.company}</p>
                                <p className="text-[#d0d0d0] leading-relaxed">{exp.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Projects ────────────────────────── */}
            <section id="projects" className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-[2.5rem] font-bold text-center mb-12 gradient-text">Featured Projects</h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {projects.map(proj => (
                            <motion.div key={proj.title} variants={fadeUp} className="card p-8 rounded-2xl">
                                <h3 className="text-xl font-semibold text-[#667eea] mb-2">{proj.title}</h3>
                                <p className="text-[#b0b0b0] font-medium mb-3">{proj.company}</p>
                                <p className="text-[#d0d0d0] leading-relaxed mb-4">{proj.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {proj.tags.map(tag => (
                                        <span key={tag} className="skill-tag">{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Skills ──────────────────────────── */}
            <section id="skills" className="py-20 section-alt">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-[2.5rem] font-bold text-center mb-12 gradient-text">Technical Expertise</h2>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {skillCategories.map(cat => (
                            <motion.div key={cat.title} variants={fadeUp} className="card p-6 rounded-2xl">
                                <h3 className="text-[#667eea] font-semibold mb-4 text-lg">{cat.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.tags.map(tag => (
                                        <span key={tag} className="skill-tag">{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Education ───────────────────────── */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-[2.5rem] font-bold text-center mb-12 gradient-text">Education & Growth</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-[#667eea] font-semibold text-xl mb-6">Continuous Learning</h3>
                            <div className="bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#667eea] mb-6">
                                <h4 className="text-[#e0e0e0] font-semibold mb-2">Master's in Machine Learning & Artificial Intelligence</h4>
                                <p className="text-[#b0b0b0] text-sm mb-2">Southern New Hampshire University (SNHU) • Fast Track Program</p>
                                <p className="text-[#d0d0d0] text-sm leading-relaxed">
                                    Currently enrolled in an accelerated Master's program focused on advanced machine learning
                                    algorithms, deep learning architectures, AI ethics, and practical AI implementation.
                                </p>
                            </div>
                            <div className="bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#667eea]">
                                <h4 className="text-[#e0e0e0] font-semibold mb-2">Professional Development</h4>
                                <p className="text-[#b0b0b0] text-sm mb-2">Self-Directed Learning</p>
                                <p className="text-[#d0d0d0] text-sm leading-relaxed">
                                    Advanced career in technology through hands-on experience, mentorship, and continuous
                                    skill development rather than traditional linear academic path.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <h3 className="text-[#667eea] font-semibold text-xl mb-6">Key Influences</h3>
                            <div className="bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#667eea] mb-6">
                                <h4 className="text-[#e0e0e0] font-semibold mb-2">Mrs. Lana Hall</h4>
                                <p className="text-[#b0b0b0] text-sm mb-2">High School Debate Teacher</p>
                                <p className="text-[#d0d0d0] text-sm leading-relaxed">
                                    Taught practical life skills including resume building, interviewing, and professional
                                    presentation. Her guidance shaped my approach to communication and career development.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[#e0e0e0] font-semibold mb-3">Core Values</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Kindness', 'Ownership', 'Curiosity', 'Continuous Learning', 'Empathy'].map(v => (
                                        <span key={v} className="skill-tag">{v}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Contact ─────────────────────────── */}
            <section id="contact" className="py-20 section-alt">
                <div className="max-w-[600px] mx-auto px-6 text-center">
                    <h2 className="text-[2.5rem] font-bold mb-6 gradient-text">Let's Connect</h2>
                    <p className="text-lg text-[#d0d0d0] mb-8">
                        Ready to discuss how I can contribute to your team? Start with my AI assistant
                        or reach out directly through your preferred channel.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/chat" className="gradient-bg text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(102,126,234,0.3)] transition-all no-underline">
                            <MessageSquare className="w-5 h-5" /> Chat with AI Assistant
                        </Link>
                        <a href="/James Bell Resume 2025.pdf" target="_blank" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                            <FileText className="w-5 h-5" /> Download Resume
                        </a>
                        <a href="https://calendly.com/jamesbellworkrelated" target="_blank" rel="noreferrer" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                            <Calendar className="w-5 h-5" /> Schedule Call
                        </a>
                        <a href="https://www.linkedin.com/in/james-bell-tam" target="_blank" rel="noreferrer" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                            <Linkedin className="w-5 h-5" /> LinkedIn
                        </a>
                        <a href="mailto:jamesbellworkrelated@gmail.com" className="bg-transparent text-[#e0e0e0] font-semibold px-6 py-3 rounded-lg border-2 border-[#333] hover:border-[#667eea] hover:bg-[rgba(102,126,234,0.1)] transition-all inline-flex items-center gap-2 no-underline">
                            <Mail className="w-5 h-5" /> Email
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Footer ──────────────────────────── */}
            <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-10 text-center">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex justify-center flex-wrap gap-6 mb-6">
                        <a href="https://www.linkedin.com/in/james-bell-tam" target="_blank" rel="noreferrer" className="text-[#b0b0b0] hover:text-[#667eea] transition-colors no-underline">LinkedIn</a>
                        <a href="mailto:jamesbellworkrelated@gmail.com" className="text-[#b0b0b0] hover:text-[#667eea] transition-colors no-underline">Email</a>
                        <a href="https://calendly.com/jamesbellworkrelated" target="_blank" rel="noreferrer" className="text-[#b0b0b0] hover:text-[#667eea] transition-colors no-underline">Schedule Call</a>
                    </div>
                    <p className="text-[#666] text-sm">
                        © 2025 James Bell. Built with AI assistance using Google Gemini, Next.js, and the Vercel AI SDK.
                    </p>
                </div>
            </footer>
        </>
    );
}
