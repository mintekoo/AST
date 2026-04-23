"use client";

import React from "react";
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Facebook,
    Linkedin,
} from "lucide-react";

export default function Contact() {
    return (
        <section className="py-20 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl text-primary font-extrabold text-foreground tracking-tight">
                        Contact Us
                    </h2>
                    <p className="mt-4 text-lg text-muted">
                        We’re here to help — reach out for bookings, inquiries, or support.
                    </p>
                </div>

                {/* Company Name */}
                <div className="text-center mb-12">
                    <p className="text-xl font-semibold text-foreground leading-relaxed">
                        Adinas Transport and Car Rental Service <br />
                        <span className="text-lg text-muted">
                            አዲናስ ትራንስፖርትና የመኪና ኪራይ
                        </span>
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <InfoItem
                            icon={<MapPin className="w-6 h-6 text-primary" />}
                            text={
                                <>
                                    <strong>Office:</strong> Pushkin Square, Addis Ababa, Ethiopia
                                </>
                            }
                        />
                        <InfoItem
                            icon={<Phone className="w-6 h-6 text-primary" />}
                            text={
                                <>
                                    +251 911 510313 <br />
                                    +251 977 777717 <br />
                                    +251 911 323333
                                </>
                            }
                        />
                        <InfoItem
                            icon={<Mail className="w-6 h-6 text-primary" />}
                            text={
                                <>
                                    adinascarrent@gmail.com <br />
                                    soliyano10@gmail.com
                                </>
                            }
                        />
                        <InfoItem
                            icon={<Globe className="w-6 h-6 text-primary" />}
                            text="www.adinascarrent.com"
                        />

                        {/* Social Icons */}
                        <div className="flex items-center gap-6 pt-4">
                            <SocialIcon href="#" Icon={Facebook} />
                            <SocialIcon href="#" Icon={Linkedin} />
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="w-full h-110 rounded-xl overflow-hidden shadow-xl border border-muted transition-transform hover:scale-[1.01]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.604213785507!2d38.757!3d9.010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85d88495edfd%3A0x8a5b50a39cba1c1!2sPushkin%20Square%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-muted mt-14 italic text-lg">
                    Abyssinia Softwareal – Your trusted partner in safe, reliable, and efficient transport solutions.
                </p>
            </div>
        </section>
    );
}

/* ----------------------------- Helper Components ---------------------------- */

function InfoItem({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-muted shadow-sm hover:shadow-md transition-all">
            <span className="mt-1">{icon}</span>
            <p className="text-foreground/80 text-lg leading-relaxed">{text}</p>
        </div>
    );
}

function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
    return (
        <a
            href={href}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-muted text-foreground/70 hover:text-background hover:bg-primary transition"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}
