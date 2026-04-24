import Container from "@/components/ui/Container";
import { fetchSocial } from "@/lib/api";
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

export default async function SocialDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const resp = await fetchSocial(id);
    const social = resp.data;

    const Icon = platformIcons[social.platform];

    return (
        <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
            <Container className="py-10 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-xl text-center space-y-6 animate-fade-in">

                    {/* Icon */}
                    {Icon && (
                        <div className="flex justify-center">
                            <Icon className="w-14 h-14" />
                        </div>
                    )}

                    {/* Platform */}
                    <h1 className="text-2xl font-semibold capitalize">
                        {social.platform}
                    </h1>

                    {/* URL */}
                    <p className="text-sm text-muted-foreground break-all">
                        {social.url}
                    </p>

                    {/* Action */}
                    <Link
                        href={social.url}
                        target="_blank"
                        className="inline-block px-6 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition"
                    >
                        Visit {social.platform}
                    </Link>

                </div>
            </Container>
        </main>
    );
}