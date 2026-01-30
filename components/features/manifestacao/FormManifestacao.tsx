'use client';

import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, Send, Mic, Video, Type, Paperclip } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import { manifestacaoSchema, ManifestacaoFormData } from '@/lib/validations/manifestacao.schema';
import { gerarProtocolo } from '@/lib/utils/protocolo-generator';
import { TextInput } from './TextInput';
import { AudioRecorder } from './AudioRecorder';
import { VideoRecorder } from './VideoRecorder';
import { FileUploader } from './FileUploader';

const STEPS = [
    { id: 'tipo', title: 'Tipo' },
    { id: 'identificacao', title: 'Identificação' },
    { id: 'relato', title: 'Relato' },
    { id: 'revisao', title: 'Revisão' }
];

export function FormManifestacao() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ManifestacaoFormData>({
        resolver: zodResolver(manifestacaoSchema) as any,
        defaultValues: {
            anonimo: false,
            descricao: '',
            arquivos: [],
            tipo: undefined,
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const { control, handleSubmit, watch, setValue, trigger, formState: { errors } } = form;
    const formData = watch();

    const nextStep = async () => {
        let fieldsToValidate: (keyof ManifestacaoFormData)[] = [];

        if (currentStep === 0) fieldsToValidate = ['tipo'];
        if (currentStep === 1) {
            if (!formData.anonimo) fieldsToValidate = ['nome', 'email', 'telefone'];
            else fieldsToValidate = ['anonimo'];
        }
        if (currentStep === 2) fieldsToValidate = ['descricao', 'audioBlob', 'videoBlob', 'arquivos'];

        // Validar apenas os campos do passo atual
        const isStepValid = await trigger(fieldsToValidate, { shouldFocus: true });

        // Validação customizada para passo 2 (conteúdo) para garantir que pelo menos um meio foi preenchido
        if (currentStep === 2) {
            const hasContent = formData.descricao || formData.audioBlob || formData.videoBlob || (formData.arquivos && formData.arquivos.length > 0);
            if (!hasContent) {
                toast.error("Por favor, forneça pelo menos uma forma de relato (Texto, Áudio, Vídeo ou Arquivo)");
                return;
            }
        }

        if (isStepValid) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
        } else {
            // Focar no primeiro erro ou mostrar toast se for erro de lógica (refine)
            if (errors.descricao && currentStep === 2) {
                toast.error(errors.descricao.message as string);
            }
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleAudioComplete = useCallback((blob: Blob | null) => {
        setValue('audioBlob', blob);
    }, [setValue]);

    const handleVideoComplete = useCallback((blob: Blob | null) => {
        setValue('videoBlob', blob);
    }, [setValue]);

    const onSubmit = async (data: any) => {
        if (currentStep !== STEPS.length - 1) {
            return;
        }
        setIsSubmitting(true);
        try {
            // Simulação de delay de rede
            await new Promise(resolve => setTimeout(resolve, 2000));

            const protocolo = gerarProtocolo();

            // Salvar no localStorage para simulação de persistência
            const manifestacao = {
                ...data,
                protocolo,
                dataHora: new Date().toISOString(),
                // Blobs não são serializáveis no localStorage, em app real enviaria para API
                audioBlob: data.audioBlob ? 'Audio gravado' : null,
                videoBlob: data.videoBlob ? 'Vídeo gravado' : null,
                arquivos: data.arquivos ? data.arquivos.map((f: File) => f.name) : []
            };

            const saved = JSON.parse(localStorage.getItem('manifestacoes') || '[]');
            localStorage.setItem('manifestacoes', JSON.stringify([manifestacao, ...saved]));

            toast.success("Manifestação enviada com sucesso!");
            router.push(`/manifestacao/sucesso?protocolo=${protocolo}`);

        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar manifestação. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Progresso */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                    <span>Passo {currentStep + 1} de {STEPS.length}</span>
                    <span>{STEPS[currentStep].title}</span>
                </div>
                <Progress value={progress} className="h-2" aria-label="Progresso" />
            </div>

            <Card>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <CardHeader>
                        <CardTitle>{STEPS[currentStep].title}</CardTitle>
                        <CardDescription>
                            {currentStep === 0 && "Qual o tipo da sua manifestação?"}
                            {currentStep === 1 && "Deseja se identificar?"}
                            {currentStep === 2 && "Como você prefere relatar o ocorrido?"}
                            {currentStep === 3 && "Confira os dados antes de enviar."}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">

                        {/* Passo 1: Tipo */}
                        {currentStep === 0 && (
                            <Controller
                                name="tipo"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        {[
                                            { value: 'reclamacao', label: 'Reclamação', desc: 'Relatar insatisfação com serviço público' },
                                            { value: 'denuncia', label: 'Denúncia', desc: 'Comunicar irregularidade ou ilícito' },
                                            { value: 'sugestao', label: 'Sugestão', desc: 'Propor melhorias nos serviços' },
                                            { value: 'elogio', label: 'Elogio', desc: 'Demonstrar satisfação com o atendimento' },
                                            { value: 'solicitacao', label: 'Solicitação', desc: 'Requerer acesso a serviço ou providência' },
                                        ].map((item) => (
                                            <div key={item.value}>
                                                <RadioGroupItem value={item.value} id={item.value} className="peer sr-only" />
                                                <Label
                                                    htmlFor={item.value}
                                                    className="flex flex-col h-full items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                                >
                                                    <span className="font-semibold text-lg mb-1">{item.label}</span>
                                                    <span className="font-normal text-muted-foreground">{item.desc}</span>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                        )}

                        {/* Passo 2: Identificação */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-around space-x-2 border p-4 rounded-lg">
                                    <Label htmlFor="anonimo-mode" className="flex flex-col space-y-1">
                                        <span className="text-base font-semibold">Manifestação Anônima?</span>
                                        <span className="font-normal text-sm text-muted-foreground">
                                            Seus dados não serão registrados no protocolo.
                                        </span>
                                    </Label>
                                    <Controller
                                        name="anonimo"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                id="anonimo-mode"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>

                                {!formData.anonimo && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nome">Nome Completo <span className="text-destructive">*</span></Label>
                                            <Input
                                                id="nome"
                                                {...form.register("nome")}
                                                aria-invalid={!!errors.nome}
                                            />
                                            {errors.nome && <p className="text-destructive text-sm" role="alert">{errors.nome.message}</p>}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">E-mail <span className="text-destructive">*</span></Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...form.register("email")}
                                                aria-invalid={!!errors.email}
                                            />
                                            {errors.email && <p className="text-destructive text-sm" role="alert">{errors.email.message}</p>}
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="telefone">Telefone</Label>
                                            <Input
                                                id="telefone"
                                                type="tel"
                                                {...form.register("telefone")}
                                                aria-invalid={!!errors.telefone}
                                                placeholder="(61) 90000-0000"
                                            />
                                            {errors.telefone && <p className="text-destructive text-sm" role="alert">{errors.telefone.message}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Passo 3: Relato Multicanal */}
                        {currentStep === 2 && (
                            <Tabs defaultValue="texto" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 mb-4">
                                    <TabsTrigger value="texto" className="flex flex-col sm:flex-row gap-2 h-auto py-2">
                                        <Type className="h-4 w-4" /> <span className="text-xs sm:text-sm">Texto</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="audio" className="flex flex-col sm:flex-row gap-2 h-auto py-2">
                                        <Mic className="h-4 w-4" /> <span className="text-xs sm:text-sm">Áudio</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="video" className="flex flex-col sm:flex-row gap-2 h-auto py-2">
                                        <Video className="h-4 w-4" /> <span className="text-xs sm:text-sm">Vídeo</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="arquivos" className="flex flex-col sm:flex-row gap-2 h-auto py-2">
                                        <Paperclip className="h-4 w-4" /> <span className="text-xs sm:text-sm">Anexos</span>
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="texto" className="space-y-4">
                                    <Controller
                                        name="descricao"
                                        control={control}
                                        render={({ field }) => (
                                            <TextInput
                                                id="manifestacao-texto"
                                                value={field.value || ''}
                                                onChange={field.onChange}
                                                error={errors.descricao?.message}
                                            />
                                        )}
                                    />
                                </TabsContent>

                                <TabsContent value="audio">
                                    <AudioRecorder
                                        onRecordingComplete={handleAudioComplete}
                                        initialBlob={formData.audioBlob}
                                    />
                                    {formData.audioBlob && (
                                        <div className="mt-2 text-sm text-green-600 font-medium flex items-center">
                                            <Check className="h-4 w-4 mr-1" /> Áudio gravado com sucesso
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="video">
                                    <VideoRecorder
                                        onRecordingComplete={handleVideoComplete}
                                        initialBlob={formData.videoBlob}
                                    />
                                    {formData.videoBlob && (
                                        <div className="mt-2 text-sm text-green-600 font-medium flex items-center">
                                            <Check className="h-4 w-4 mr-1" /> Vídeo gravado com sucesso
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="arquivos">
                                    <FileUploader
                                        onFilesChange={(files) => setValue('arquivos', files)}
                                    />
                                </TabsContent>

                                {/* Exibir resumo do que já foi adicionado em outras abas */}
                                <div className="mt-8 pt-4 border-t bg-muted/20 p-4 rounded-md">
                                    <h4 className="font-semibold text-sm mb-2">Resumo do Relato:</h4>
                                    <ul className="text-sm space-y-1">
                                        <li className={formData.descricao ? "text-primary font-medium" : "text-muted-foreground"}>
                                            • Texto: {formData.descricao ? `${formData.descricao.length} caracteres` : 'Não preenchido'}
                                        </li>
                                        <li className={formData.audioBlob ? "text-primary font-medium" : "text-muted-foreground"}>
                                            • Áudio: {formData.audioBlob ? 'Gravado' : 'Não gravado'}
                                        </li>
                                        <li className={formData.videoBlob ? "text-primary font-medium" : "text-muted-foreground"}>
                                            • Vídeo: {formData.videoBlob ? 'Gravado' : 'Não gravado'}
                                        </li>
                                        <li className={formData.arquivos && formData.arquivos.length > 0 ? "text-primary font-medium" : "text-muted-foreground"}>
                                            • Anexos: {formData.arquivos?.length || 0} arquivos
                                        </li>
                                    </ul>
                                </div>
                            </Tabs>
                        )}

                        {/* Passo 4: Revisão */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="p-4 border rounded-md">
                                        <h4 className="text-sm font-muted-foreground uppercase mb-1">Tipo</h4>
                                        <p className="font-medium capitalize">{formData.tipo}</p>
                                    </div>
                                    <div className="p-4 border rounded-md">
                                        <h4 className="text-sm font-muted-foreground uppercase mb-1">Identificação</h4>
                                        <p className="font-medium">{formData.anonimo ? 'Anônimo' : `${formData.nome} (${formData.email})`}</p>
                                    </div>
                                </div>

                                <div className="p-4 border rounded-md bg-muted/10">
                                    <h4 className="text-sm font-muted-foreground uppercase mb-2">Conteúdo do Relato</h4>
                                    {formData.descricao && (
                                        <div className="mb-4">
                                            <p className="text-xs font-bold mb-1">Texto:</p>
                                            <p className="text-sm whitespace-pre-wrap">{formData.descricao}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        {formData.audioBlob && (
                                            <div className="flex items-center text-sm gap-2">
                                                <Mic className="h-4 w-4" /> Áudio incluído
                                            </div>
                                        )}
                                        {formData.videoBlob && (
                                            <div className="flex items-center text-sm gap-2">
                                                <Video className="h-4 w-4" /> Vídeo incluído
                                            </div>
                                        )}
                                        {formData.arquivos && formData.arquivos.length > 0 && (
                                            <div className="flex items-center text-sm gap-2">
                                                <Paperclip className="h-4 w-4" /> {formData.arquivos.length} anexo(s)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 0 || isSubmitting}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
                        </Button>

                        {currentStep < STEPS.length - 1 ? (
                            <Button type="button" onClick={nextStep}>
                                Próximo <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                disabled={isSubmitting}
                                className="w-32 bg-secondary hover:bg-secondary/90"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Enviando...</span>
                                ) : (
                                    <>Enviar <Send className="ml-2 h-4 w-4" /></>
                                )}
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
