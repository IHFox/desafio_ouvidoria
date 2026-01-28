import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    maxLength?: number;
    label?: string;
    placeholder?: string;
    id: string;
}

export function TextInput({
    value,
    onChange,
    error,
    maxLength = 5000,
    label = "Descreva sua manifestação",
    placeholder,
    id
}: TextInputProps) {

    const remainingChars = maxLength - value.length;

    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex justify-between items-center">
                <span>{label} <span className="text-destructive">*</span></span>
            </Label>

            <Textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
                placeholder={placeholder}
                aria-describedby={`${id}-hint ${error ? `${id}-error` : ''}`}
                aria-invalid={!!error}
                className={cn(
                    "min-h-[200px] resize-y",
                    error && "border-destructive focus-visible:ring-destructive"
                )}
            />

            <div className="flex justify-between text-xs text-muted-foreground">
                <span id={`${id}-hint`}>
                    Mínimo de detalhes ajuda na resolução.
                </span>
                <span className={cn(remainingChars < 50 && "text-amber-500 font-bold")}>
                    {value.length} / {maxLength}
                </span>
            </div>

            {error && (
                <p id={`${id}-error`} className="text-sm text-destructive font-medium" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
