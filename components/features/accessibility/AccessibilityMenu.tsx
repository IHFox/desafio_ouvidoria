'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Sun, Moon, Type, Baseline, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function AccessibilityMenu() {
    const [fontSize, setFontSize] = useState<number>(100);
    const [highContrast, setHighContrast] = useState<boolean>(false);

    // Load preferences
    useEffect(() => {
        const savedFont = localStorage.getItem('accessibility-font-size');
        const savedContrast = localStorage.getItem('accessibility-high-contrast');

        if (savedFont) {
            const size = parseInt(savedFont);
            setFontSize(size);
            document.documentElement.style.fontSize = `${size}%`;
        }

        if (savedContrast === 'true') {
            setHighContrast(true);
            document.documentElement.classList.add('high-contrast');
        }
    }, []);

    const toggleHighContrast = (checked: boolean) => {
        setHighContrast(checked);
        if (checked) {
            document.documentElement.classList.add('high-contrast');
            localStorage.setItem('accessibility-high-contrast', 'true');
        } else {
            document.documentElement.classList.remove('high-contrast');
            localStorage.setItem('accessibility-high-contrast', 'false');
        }
    };

    const changeFontSize = (delta: number) => {
        const newSize = Math.max(80, Math.min(150, fontSize + delta));
        setFontSize(newSize);
        document.documentElement.style.fontSize = `${newSize}%`;
        localStorage.setItem('accessibility-font-size', newSize.toString());
    };

    const resetSettings = () => {
        setFontSize(100);
        setHighContrast(false);
        document.documentElement.style.fontSize = '100%';
        document.documentElement.classList.remove('high-contrast');
        localStorage.removeItem('accessibility-font-size');
        localStorage.removeItem('accessibility-high-contrast');
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Ajustes de acessibilidade">
                    <Settings className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-bold leading-none">Acessibilidade</h4>
                        <p className="text-sm text-muted-foreground">
                            Personalize sua experiência de navegação.
                        </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <Label htmlFor="contrast-mode" className="text-sm font-medium">Alto Contraste</Label>
                        </div>
                        <Switch
                            id="contrast-mode"
                            checked={highContrast}
                            onCheckedChange={toggleHighContrast}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                <span className="text-sm font-medium">Tamanho da Fonte</span>
                            </div>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-mono">{fontSize}%</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => changeFontSize(-10)}
                            >
                                A-
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => changeFontSize(10)}
                            >
                                A+
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs text-muted-foreground hover:text-primary"
                            onClick={resetSettings}
                        >
                            Restaurar padrões
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
