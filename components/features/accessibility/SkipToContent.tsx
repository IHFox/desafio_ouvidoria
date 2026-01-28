import React from 'react';
import { Button } from "@/components/ui/button";

export function SkipToContent() {
    return (
        <Button
            asChild
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
            <a href="#main-content">
                Pular para o conteúdo principal
            </a>
        </Button>
    );
}
