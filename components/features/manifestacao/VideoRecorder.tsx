import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Square, Trash2, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMediaRecorder } from "@/lib/hooks/useMediaRecorder";

interface VideoRecorderProps {
    onRecordingComplete: (blob: Blob | null) => void;
    id?: string;
}

export function VideoRecorder({ onRecordingComplete, id = "video-recorder" }: VideoRecorderProps) {
    const {
        isRecording,
        recordingBlob,
        duration,
        error,
        startRecording,
        stopRecording,
        clearRecording,
        stream
    } = useMediaRecorder('video');

    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    useEffect(() => {
        if (stream && videoRef.current && !recordingBlob) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, recordingBlob]);

    useEffect(() => {
        if (recordingBlob) {
            const url = URL.createObjectURL(recordingBlob);
            setVideoUrl(url);
            onRecordingComplete(recordingBlob);
            return () => URL.revokeObjectURL(url);
        } else {
            setVideoUrl(null);
            onRecordingComplete(null);
        }
    }, [recordingBlob, onRecordingComplete]);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-4 border rounded-lg p-6 bg-card">
            <div className="flex justify-between items-center">
                <Label htmlFor={id} className="text-base font-semibold">
                    Gravar Vídeo
                </Label>
                {isRecording && (
                    <div className="flex items-center gap-2">
                        <span className="animate-pulse h-3 w-3 rounded-full bg-red-500" />
                        <span className="font-mono text-sm">{formatTime(duration)}</span>
                    </div>
                )}
            </div>

            {error ? (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                    {error}
                    <Button
                        variant="link"
                        onClick={() => clearRecording()}
                        className="pl-2 h-auto p-0 text-destructive underline"
                    >
                        Tentar novamente
                    </Button>
                </div>
            ) : !recordingBlob && !isRecording && !stream ? (
                <div className="flex flex-col items-center gap-4 py-12 bg-muted/30 rounded-lg border-2 border-dashed">
                    <Button
                        type="button"
                        onClick={() => startRecording()}
                        size="lg"
                        className="rounded-full h-16 w-16 shadow-lg"
                        aria-label="Ativar câmera e iniciar gravação"
                        id={id}
                    >
                        <Camera className="h-8 w-8" />
                    </Button>
                    <p className="text-sm text-muted-foreground">Clique para ativar a câmera</p>
                </div>
            ) : (
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    {!recordingBlob ? (
                        // Preview da Câmera
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover transform scale-x-[-1]" // Espelhado para selfie
                        />
                    ) : (
                        // Playback
                        <video
                            src={videoUrl!}
                            controls
                            className="w-full h-full object-contain bg-black"
                        />
                    )}

                    {/* Controles Overlay */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                        {!recordingBlob && (
                            isRecording ? (
                                <Button
                                    type="button"
                                    onClick={stopRecording}
                                    variant="destructive"
                                    size="lg"
                                    className="rounded-full shadow-lg"
                                >
                                    <Square className="mr-2 h-5 w-5 fill-current" /> Parar
                                </Button>
                            ) : (
                                // Stream ativo, mas não gravando (poderia ter um estado de "preview" separado)
                                // Mas o hook inicia gravação ao chamar startRecording.
                                // Para implementar "Ativar câmera" -> "Gravar", o hook precisaria separar startStream de startRecorder.
                                // Como o hook atual faz tudo junto, vou assumir fluxo direto por enquanto.
                                // Se o stream está ativo e isRecording é true, mostra botão parar.
                                null
                            )
                        )}
                    </div>
                </div>
            )}

            {recordingBlob && (
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={clearRecording}
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Descartar e Regravar
                    </Button>
                </div>
            )}
        </div>
    );
}
