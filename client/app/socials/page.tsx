import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchSocials } from "@/lib/api";
import type { Social } from "@/lib/types";
import Link from "next/link";

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

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-12 sm:py-16 lg:py-20">
                <SectionHeader
                    title="Social Media"
                    subtitle="Follow us on all platforms"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {data.map((s: Social) => {
                        const Icon = platformIcons[s.platform];

                        return (
                            <Link
                                key={s.id}
                                href={s.url}
                                target="_blank"
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-card-background dark:bg-card-background-dark ring-1 ring-border hover:shadow-md transition"
                            >
                                {Icon && <Icon className="w-6 h-6" />}
                                <span className="text-sm capitalize">{s.platform}</span>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </main>
    );
}