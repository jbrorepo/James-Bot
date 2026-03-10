'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Loader2, Bot, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <main className="min-h-screen relative flex flex-col p-4 sm:p-8 overflow-hidden items-center justify-center">

            {/* Abstract Background Element */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

            <div className="z-10 w-full max-w-4xl h-[85vh] flex flex-col glassmorphism border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                {/* Chat Header */}
                <header className="flex h-16 items-center justify-between px-6 border-b border-white/5 bg-secondary/30 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-muted" />
                        </Link>
                        <div>
                            <h1 className="font-outfit font-semibold text-lg">James AI Assistant</h1>
                            <p className="text-xs text-primary flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Online & Powered by Gemini
                            </p>
                        </div>
                    </div>
                </header>

                {/* Chat Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide scroll-smooth"
                >
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-80">
                            <Bot className="w-12 h-12 text-primary/60 mb-4" />
                            <p className="text-xl font-outfit mb-2">Hello, I'm James's AI Assistant.</p>
                            <p className="text-sm text-muted max-w-md">
                                I can answer questions about James's professional background, skills, and experience at Arctic Wolf. How can I help you today?
                            </p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map(m => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={["flex items-start gap-3 sm:gap-4", m.role === 'user' ? "justify-end" : "justify-start"].join(" ")}
                            >
                                {/* Bot Avatar */}
                                {m.role !== 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div className={[
                                    "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5",
                                    m.role === 'user'
                                        ? "bg-foreground text-background rounded-tr-sm shadow-md"
                                        : "bg-secondary/60 border border-border text-foreground rounded-tl-sm"
                                ].join(" ")}>
                                    {m.role === 'user' ? (
                                        <p className="whitespace-pre-wrap">{m.content}</p>
                                    ) : (
                                        <div className="prose-custom text-[0.95rem] leading-relaxed">
                                            <ReactMarkdown>{m.content}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>

                                {/* User Avatar */}
                                {m.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border">
                                        <User className="w-4 h-4 text-muted" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading Indicator */}
                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-start gap-4 justify-start"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                            </div>
                            <div className="bg-secondary/60 border border-border text-foreground rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-1.5 h-12">
                                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 sm:p-6 bg-secondary/30 backdrop-blur-md border-t border-white/5">
                    <form
                        onSubmit={handleSubmit}
                        className="relative flex items-center"
                    >
                        <input
                            className="w-full bg-secondary/50 border border-border focus:border-primary/50 text-foreground rounded-xl pl-5 pr-14 py-4 outline-none transition-all placeholder:text-muted shadow-inner"
                            value={input}
                            placeholder="Ask about James's experience..."
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 p-2.5 bg-primary hover:bg-primary-hover disabled:bg-secondary disabled:text-muted disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="mt-3 text-center">
                        <p className="text-[11px] text-muted">Answers generated by Gemini. May occasionally produce inaccuracies.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
