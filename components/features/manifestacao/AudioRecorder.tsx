import React, { useEffect, useState } from 'react';
import { Mic, Square, Play, Trash2, Pause, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useMediaRecorder } from "@/lib/hooks/useMediaRecorder";

interface AudioRecorderProps {
    onRecordingComplete: (blob: Blob | null) => void;
    id?: string;
}

export function AudioRecorder({ onRecordingComplete, id = "audio-recorder" }: AudioRecorderProps) {
    const {
        isRecording,
        recordingBlob,
        duration,
        error,
        startRecording,
        stopRecording,
        clearRecording
    } = useMediaRecorder('audio');

    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        if (recordingBlob) {
            const url = URL.createObjectURL(recordingBlob);
            setAudioUrl(url);
            onRecordingComplete(recordingBlob);
            return () => URL.revokeObjectURL(url);
        } else {
            setAudioUrl(null);
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
                    Gravar Áudio
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
            ) : !recordingBlob && !isRecording ? (
                <div className="flex flex-col items-center gap-4 py-8">
                    <Button
                        type="button"
                        onClick={() => startRecording()}
                        size="lg"
                        className="rounded-full h-16 w-16 bg-red-500 hover:bg-red-600 shadow-lg"
                        aria-label="Iniciar gravação de áudio"
                        id={id}
                    >
                        <Mic className="h-8 w-8 text-white" />
                    </Button>
                    <p className="text-sm text-muted-foreground">Clique para começar a gravar</p>
                </div>
            ) : isRecording ? (
                <div className="flex flex-col items-center gap-6 py-4">
                    <div className="w-full flex items-center justify-center h-12">
                        <div className="flex items-end gap-1 h-8">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-1 bg-primary animate-pulse" style={{ height: `${Math.random() * 100}%` }} />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">Gravando...</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={stopRecording}
                        variant="destructive"
                        className="rounded-full px-8"
                    >
                        <Square className="mr-2 h-4 w-4 fill-current" /> Parar Gravação
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    <audio src={audioUrl!} controls className="w-full" aria-label="Reproduzir áudio gravado" />

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={clearRecording}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Descartar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
