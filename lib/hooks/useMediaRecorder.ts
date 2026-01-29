import { useState, useRef, useEffect, useCallback } from 'react';

interface MediaRecorderHook {
    isRecording: boolean;
    isPaused: boolean;
    recordingBlob: Blob | null;
    duration: number;
    error: string | null;
    startRecording: (config?: MediaStreamConstraints) => Promise<void>;
    stopRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
    clearRecording: () => void;
    stream: MediaStream | null;
}

export function useMediaRecorder(type: 'audio' | 'video' = 'audio', initialBlob: Blob | null = null): MediaRecorderHook {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingBlob, setRecordingBlob] = useState<Blob | null>(initialBlob);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setDuration(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startRecording = useCallback(async (config?: MediaStreamConstraints) => {
        try {
            setError(null);

            const constraints: MediaStreamConstraints = config || {
                audio: true,
                video: type === 'video'
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);

            const mimeType = type === 'video' ? 'video/webm;codecs=vp8' : 'audio/webm';

            // Fallback for Safari which might not support webm
            let options: MediaRecorderOptions = {};
            if (MediaRecorder.isTypeSupported(mimeType)) {
                options = { mimeType };
            }

            const recorder = new MediaRecorder(mediaStream, options);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, {
                    type: chunksRef.current[0]?.type || (type === 'video' ? 'video/webm' : 'audio/webm')
                });
                setRecordingBlob(blob);
                chunksRef.current = [];
                stopTimer();

                // Stop all tracks
                mediaStream.getTracks().forEach(track => track.stop());
                setStream(null);
            };

            mediaRecorderRef.current = recorder;
            recorder.start();
            setIsRecording(true);
            startTimer();

        } catch (err) {
            console.error("Erro ao iniciar gravação:", err);
            setError("Não foi possível acessar o dispositivo de gravação.");
            setIsRecording(false);
        }
    }, [type]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
        }
    }, [isRecording]);

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            stopTimer();
        }
    }, [isRecording, isPaused]);

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            startTimer();
        }
    }, [isRecording, isPaused]);

    const clearRecording = useCallback(() => {
        setRecordingBlob(null);
        setDuration(0);
        setError(null);
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopTimer();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return {
        isRecording,
        isPaused,
        recordingBlob,
        duration,
        error,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        clearRecording,
        stream
    };
}
