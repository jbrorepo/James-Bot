'use client';

import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Loader2, Bot, User, FileText, AlertCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, setInput, append } = useChat({
        api: '/api/chat',
    });

    const suggestedPrompts = [
        "What is James's current role at Arctic Wolf?",
        "Tell me about his AI and Next.js projects.",
        "What are his core professional values?",
        "How much experience does he have with customer success?"
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 hero-glow">
            <div className="w-full max-w-4xl h-[90vh] flex flex-col card rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a]">

                {/* Header */}
                <header className="flex h-16 items-center justify-between px-6 border-b border-[#2a2a2a] bg-[rgba(10,10,10,0.95)] backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-full transition-colors group">
                            <ArrowLeft className="w-5 h-5 text-[#b0b0b0] group-hover:text-white" />
                        </Link>
                        <div>
                            <h1 className="font-semibold text-lg text-[#e0e0e0]">James AI Assistant</h1>
                            <p className="text-xs text-[#667eea] flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#667eea] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#667eea]"></span>
                                </span>
                                Online &bull; Powered by Gemini
                            </p>
                        </div>
                    </div>
                    <a href="/James Bell Resume 2025.pdf" target="_blank" className="hidden sm:flex items-center gap-2 text-xs font-medium bg-[#2a2a2a] hover:bg-[#333] border border-[#333] hover:border-[#667eea] px-3 py-1.5 rounded-lg transition-colors text-[#e0e0e0]">
                        <FileText className="w-3.5 h-3.5" />
                        Download Resume
                    </a>
                </header>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide scroll-smooth"
                >
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center px-4 fade-in">
                            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-[0_0_30px_rgba(102,126,234,0.3)]">JB</div>
                            <h2 className="text-2xl font-bold text-[#e0e0e0] mb-3">Hello! I'm James's AI Assistant.</h2>
                            <p className="text-[#b0b0b0] max-w-md mb-8">
                                I can answer questions about James's professional background, skills, and experience at Arctic Wolf. How can I help you today?
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                                {suggestedPrompts.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => append({ role: 'user', content: prompt })}
                                        className="text-left text-sm text-[#d0d0d0] bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#667eea] p-4 rounded-xl transition-all hover:-translate-y-0.5"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map(m => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={["flex items-start gap-3", m.role === 'user' ? "justify-end" : "justify-start"].join(" ")}
                            >
                                {m.role !== 'user' && (
                                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shrink-0 text-white text-xs font-bold">JB</div>
                                )}
                                <div className={[
                                    "max-w-[80%] rounded-xl px-4 py-3",
                                    m.role === 'user'
                                        ? "gradient-bg text-white rounded-tr-sm"
                                        : "bg-[#2a2a2a] text-[#e0e0e0] rounded-tl-sm"
                                ].join(" ")}>
                                    {m.role === 'user' ? (
                                        <p className="whitespace-pre-wrap">{m.content}</p>
                                    ) : (
                                        <div className="prose-custom text-sm leading-relaxed">
                                            <ReactMarkdown>{m.content}</ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                                {m.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0 border border-[#333]">
                                        <User className="w-4 h-4 text-[#b0b0b0]" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shrink-0">
                                <Loader2 className="w-4 h-4 text-white animate-spin" />
                            </div>
                            <div className="bg-[#2a2a2a] text-[#e0e0e0] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 h-11">
                                <span className="w-1.5 h-1.5 bg-[#b0b0b0] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-[#b0b0b0] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-[#b0b0b0] rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center my-4">
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-4 max-w-md w-full">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">Failed to connect to the AI model</p>
                                    <p className="text-xs opacity-80 mt-1">{error.message}</p>
                                    <button
                                        onClick={() => reload()}
                                        className="mt-3 text-xs bg-red-500/20 hover:bg-red-500/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-medium"
                                    >
                                        <RefreshCcw className="w-3 h-3" /> Try Again
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 sm:p-6 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-t border-[#2a2a2a]">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            className="w-full bg-[#2a2a2a] border border-[#333] focus:border-[#667eea] text-[#e0e0e0] rounded-xl pl-5 pr-14 py-4 outline-none transition-all placeholder:text-[#666]"
                            value={input}
                            placeholder="Ask about James's experience..."
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 p-2.5 gradient-bg disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition-opacity flex items-center justify-center"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <p className="mt-3 text-center text-[11px] text-[#666]">Answers generated by Gemini. May occasionally produce inaccuracies.</p>
                </div>
            </div>
        </main>
    );
}
