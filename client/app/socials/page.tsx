import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchSocials } from "@/lib/api";
import type { Social } from "@/lib/types";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Github,
    MessageCircle,
    Globe,
    Send,
    Music2,
    ArrowUpRight
} from "lucide-react";

const platformIcons: Record<string, React.ElementType> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Music2,
    telegram: Send,
    linkedin: Linkedin,
    github: Github,
    whatsapp: MessageCircle,
    website: Globe,
};

export default async function SocialsPage() {
    const resp = await fetchSocials();
    const data = resp?.data ?? [];
    const meta = resp?.meta;

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Container className="py-16 sm:py-24">
                <SectionHeader
                    title="Connect With Us"
                    subtitle="Engineering excellence delivered through modern web and mobile solutions. Follow our journey."
                />

                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
                    {data.map((s: Social) => {
                        const Icon = platformIcons[s.platform.toLowerCase()] || Globe;

                        return (
                            <Link
                                key={s.id}
                                href={s.url}
                                target="_blank"
                                className="group relative flex flex-col items-start p-7 rounded-[2rem] bg-card border border-main shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Decorative Glow - Uses CSS Variable */}
                                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-32 w-32 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/15 transition-all duration-500" />

                                <div className="flex w-full items-center justify-between mb-10 relative z-10">
                                    {/* Brand Box */}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:rotate-[-8deg] transition-all duration-500 shadow-sm">
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Action Icon */}
                                    <div className="p-2 rounded-full bg-background border border-main opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <ArrowUpRight className="w-4 h-4 text-primary" />
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted opacity-50">
                                        Platform
                                    </span>
                                    <h3 className="text-xl font-extrabold capitalize mt-1 group-hover:text-primary transition-colors">
                                        {s.platform}
                                    </h3>
                                </div>

                                {/* Animated Status Bar */}
                                <div className="mt-6 w-full h-[3px] bg-muted/5 rounded-full overflow-hidden relative z-10">
                                    <div className="h-full w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                                </div>

                                {/* Background Watermark */}
                                {/* <span className="absolute bottom-4 right-6 text-[44px] font-black text-foreground/[0.03] dark:text-white/[0.03] pointer-events-none select-none uppercase tracking-tighter transition-all duration-500 group-hover:scale-110 group-hover:text-primary/5">
                                    {s.platform.slice(0, 3)}
                                </span> */}
                                {/* Background Watermark */}
                                <span className="absolute bottom-4 right-6 text-[44px] font-black text-foreground/[0.03] dark:text-foreground/[0.03] pointer-events-none select-none uppercase tracking-tighter transition-all duration-500 group-hover:scale-110 group-hover:text-primary/5">
                                    {s.platform.slice(0, 3)}
                                </span>
                                
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-20">
                    <Pagination meta={meta} basePath="/socials" />
                </div>
            </Container>
        </main>
    );
}