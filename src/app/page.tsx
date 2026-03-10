'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Terminal, Shield, Cpu, MessageSquare } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

            <div className="z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Column: Hero Copy */}
                <motion.div
                    className="lg:col-span-7 flex flex-col items-start text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glassmorphism text-sm font-medium text-primary mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Available for New Opportunities
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold font-outfit tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                        James Bell
                    </h1>

                    <h2 className="text-xl sm:text-2xl font-light text-muted mb-6 flex flex-wrap items-center gap-3">
                        <span className="font-medium text-foreground">Concierge Security Engineer 3</span>
                        <span className="text-border">|</span>
                        <span>Team Lead</span>
                        <span className="text-border">|</span>
                        <span className="text-primary/90">AI Builder</span>
                    </h2>

                    <p className="text-lg text-muted/90 max-w-2xl leading-relaxed mb-8">
                        Securing modern infrastructure at Arctic Wolf and building the next generation of
                        agentic tools. I bridge the gap between complex cybersecurity threats and
                        actionable, automated solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link href="/chat" className="group relative bg-white text-black font-semibold px-6 py-3.5 rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2">
                            <span className="relative z-10 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Chat with my AI
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </Link>

                        <a href="https://www.linkedin.com/in/james-bell-tam" target="_blank" rel="noreferrer" className="glassmorphism px-6 py-3.5 flex items-center justify-center gap-2 font-medium rounded-xl hover:bg-secondary/40 transition-colors border border-white/5">
                            LinkedIn Profile
                            <ArrowRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Key Skills / Visuals */}
                <motion.div
                    className="lg:col-span-5 grid grid-cols-1 gap-4 w-full"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    {/* Card 1 */}
                    <div className="glassmorphism p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 border border-primary/30">
                            <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold font-outfit mb-2">Cybersecurity Leadership</h3>
                        <p className="text-sm text-muted">Leading threat hunting, vulnerability management, and customer success strategies at scale.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="glassmorphism p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4 border border-accent/30">
                            <Cpu className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold font-outfit mb-2">Next-Gen AI Engineering</h3>
                        <p className="text-sm text-muted">Building functional, autonomous agents using Next.js, Vercel AI SDK, and Google Gemini.</p>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}
