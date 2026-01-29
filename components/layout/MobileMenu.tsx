'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Home, PlusCircle, Search, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription
} from "@/components/ui/sheet";

export function MobileMenu() {
    const navItems = [
        { href: '/', label: 'Início', icon: Home },
        { href: '/manifestacao', label: 'Nova Manifestação', icon: PlusCircle },
        { href: '/acompanhar', label: 'Acompanhar', icon: Search },
        { href: '/ajuda', label: 'Ajuda', icon: HelpCircle },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu de navegação">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left border-b pb-4 mb-4">
                    <SheetTitle className="text-primary flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
                            DF
                        </div>
                        Participa DF
                    </SheetTitle>
                    <SheetDescription>
                        Portal de Manifestações e Ouvidoria
                    </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-base font-medium"
                        >
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-8 left-6 right-6 p-4 bg-muted/30 rounded-xl border border-dashed text-center">
                    <p className="text-xs text-muted-foreground font-medium">Versão PWA Beta v1.0</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Pronto para uso offline</p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
