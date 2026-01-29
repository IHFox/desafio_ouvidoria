'use client';

import React, { useState, useEffect } from 'react';
import { Search, FileText, Calendar, Clock, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Manifestacao {
    protocolo: string;
    tipo: string;
    dataHora: string;
    descricao: string;
    anonimo: boolean;
    nome?: string;
}

export default function AcompanharPage() {
    const [protocoloBusca, setProtocoloBusca] = useState('');
    const [resultado, setResultado] = useState<Manifestacao | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [historico, setHistorico] = useState<Manifestacao[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('manifestacoes') || '[]');
        setHistorico(saved);
    }, []);

    const handleBuscar = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const formatBusca = protocoloBusca.trim().toUpperCase();
        const encontrado = historico.find(m => m.protocolo === formatBusca);

        if (encontrado) {
            setResultado(encontrado);
            setErro(null);
        } else {
            setResultado(null);
            setErro("Protocolo não encontrado. Verifique o número e tente novamente.");
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Acompanhar Manifestação</h1>
                <p className="text-muted-foreground">Consulte o status e o andamento da sua solicitação pelo número do protocolo.</p>
            </div>

            <Card className="border-2 border-primary/10 shadow-lg overflow-hidden">
                <CardHeader className="bg-primary/5 border-b p-4">
                    <CardTitle className="text-lg">Buscar Protocolo</CardTitle>
                    <CardDescription>Insira o código recebido ao final do seu envio (ex: 202612345678)</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleBuscar} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Digite o protocolo..."
                                className="pl-10 h-12 text-lg"
                                value={protocoloBusca}
                                onChange={(e) => setProtocoloBusca(e.target.value)}
                            />
                        </div>
                        <Button type="submit" size="lg" className="h-12 px-8">
                            Buscar
                        </Button>
                    </form>

                    {erro && (
                        <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{erro}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {resultado ? (
                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                    <Card className="border-none shadow-xl bg-card">
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <div>
                                <CardTitle className="text-2xl font-bold text-primary">Protocolo #{resultado.protocolo}</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                    <Calendar className="h-3 w-3" /> Registrado em {formatDate(resultado.dataHora)}
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 py-1 px-3 text-sm">
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Recebido
                            </Badge>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tipo de Manifestação</h4>
                                        <p className="text-lg font-medium capitalize">{resultado.tipo}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Identificação</h4>
                                        <p className="text-lg font-medium">{resultado.anonimo ? "Anônimo" : resultado.nome}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Timeline de Andamento</h4>
                                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
                                        <div className="relative">
                                            <div className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-primary border-2 border-background shadow-sm" />
                                            <div>
                                                <p className="text-sm font-bold">Manifestação Recebida</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(resultado.dataHora)}</p>
                                                <p className="text-xs mt-1 text-muted-foreground">Sua manifestação foi registrada e será encaminhada para análise da área técnica competente.</p>
                                            </div>
                                        </div>
                                        <div className="relative opacity-50">
                                            <div className="absolute -left-[22px] top-1 h-3 w-3 rounded-full bg-muted border-2 border-background shadow-sm" />
                                            <div>
                                                <p className="text-sm font-bold">Em Análise</p>
                                                <p className="text-xs">Aguardando processamento</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Relato</h4>
                                <div className="bg-muted/30 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap italic">
                                    {resultado.descricao || "Descrição via mídia (Áudio/Vídeo)"}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/20 border-t justify-center py-4">
                            <p className="text-xs text-center text-muted-foreground">
                                Prazo estimado de resposta: até 20 dias úteis.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                historico.length > 0 && !erro && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" /> Histórico Recente
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {historico.slice(0, 4).map((m) => (
                                <button
                                    key={m.protocolo}
                                    onClick={() => {
                                        setProtocoloBusca(m.protocolo);
                                        setResultado(m);
                                    }}
                                    className="text-left group p-4 border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm bg-card"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors uppercase text-[10px]">
                                            {m.tipo}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">{new Date(m.dataHora).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold tracking-tight">#{m.protocolo}</span>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
