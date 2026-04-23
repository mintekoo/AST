"use client";

import React from "react";

type RadioButtonProps<T extends string> = {
    label: string;
    value: T;
    checked: boolean;
    onChange: (value: T) => void;
    name: string;
};

export default function RadioButton<T extends string>({
    label,
    value,
    checked,
    onChange,
    name,
}: RadioButtonProps<T>) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-sm">{label}</span>
        </label>
    );
}
