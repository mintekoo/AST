"use client";

import React, { useEffect, useState } from "react";
import { fetchLocations } from "@/lib/api";
import Loader from "@/components/ui/Loader";

import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
} from "lucide-react";
import { AppLocation } from "@/lib/types";

export default function Contact() {
    const [locations, setLocations] = useState<AppLocation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const resp = await fetchLocations();
                setLocations(resp?.data ?? []);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return <Loader />;
    }

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

                {locations.map((loc) => (
                    <div
                        key={loc.id}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
                    >
                        {/* LEFT: Info */}
                        <div className="space-y-6 text-bold">

                            {/* Address */}
                            <InfoItem
                                icon={<MapPin className="w-6 h-6 text-primary" />}
                                text={
                                    <>
                                        <strong>{loc.name}</strong>
                                        <br />
                                        Lat: {loc.latitude}, Lng: {loc.longitude}
                                    </>
                                }
                            />

                            {/* Phones */}
                            {loc.phone?.length > 0 && (
                                <InfoItem
                                    icon={<Phone className="w-6 h-6 text-primary" />}
                                    text={
                                        <>
                                            {loc.phone.map((p, i) => (
                                                <div key={i}>{p}</div>
                                            ))}
                                        </>
                                    }
                                />
                            )}

                            {/* Emails */}
                            {loc.email?.length > 0 && (
                                <InfoItem
                                    icon={<Mail className="w-6 h-6 text-primary" />}
                                    text={
                                        <>
                                            {loc.email.map((e, i) => (
                                                <div key={i}>{e}</div>
                                            ))}
                                        </>
                                    }
                                />
                            )}

                            {/* Websites */}
                            {loc.web?.length > 0 && (
                                <InfoItem
                                    icon={<Globe className="w-6 h-6 text-primary" />}
                                    text={
                                        <>
                                            {loc.web.map((w, i) => (
                                                <a
                                                    key={i}
                                                    href={`https://${w}`}
                                                    target="_blank"
                                                    className="block hover:underline"
                                                >
                                                    {w}
                                                </a>
                                            ))}
                                        </>
                                    }
                                />
                            )}

                            {/* Working Hours */}
                            {loc.workingHours && (
                                <InfoItem
                                    icon={<Clock className="w-6 h-6 text-primary" />}
                                    text={
                                        <div className="space-y-1 text-sm">
                                            {Object.entries(loc.workingHours).map(([day, hours]) => (
                                                <div key={day} className="flex justify-between gap-4">
                                                    <span className="capitalize text-foreground/70">
                                                        {day}
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        {hours as string}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                />
                            )}


                        </div>

                        {/* RIGHT: Google Map */}
                        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl border border-muted">
                            <iframe
                                src={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`}
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                            />
                        </div>
                        {/* Footer */}
                        <p className="col-span-full block  text-center text-muted italic text-lg">
                            {loc.description}
                        </p>
                    </div>

                ))}
            </div>
        </section>
    );
}

/* ----------------------------- Helper Components ---------------------------- */

function InfoItem({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-muted shadow-sm hover:shadow-md transition-all">
            <span className="mt-1">{icon}</span>

            {/* CHANGE THIS */}
            <div className="text-foreground/80 text-lg leading-relaxed">
                {text}
            </div>
        </div>
    );
}
