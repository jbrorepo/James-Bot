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
                        <Link href="/" className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-[#b0b0b0]" />
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
                </header>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide scroll-smooth"
                >
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-80">
                            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xl mb-4">JB</div>
                            <p className="text-xl font-semibold text-[#e0e0e0] mb-2">Hello! I'm James's AI Assistant.</p>
                            <p className="text-sm text-[#b0b0b0] max-w-md">
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
