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
    const chunksRef = useRef<Blob[]>([]);

    // Timer Effect: Handles the duration state update independently
    useEffect(() => {
        let interval: any;
        if (isRecording && !isPaused) {
            interval = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording, isPaused]);

    const startRecording = useCallback(async (config?: MediaStreamConstraints) => {
        try {
            setError(null);
            setDuration(0);
            chunksRef.current = [];

            const constraints: MediaStreamConstraints = config || {
                audio: true,
                video: type === 'video'
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);

            // Select MIME type based on type and browser support
            const mimeType = type === 'video'
                ? (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus') ? 'video/webm;codecs=vp8,opus' : 'video/webm')
                : (MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm');

            const recorder = new MediaRecorder(mediaStream, { mimeType });

            recorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            recorder.onstop = () => {
                if (chunksRef.current.length > 0) {
                    const blob = new Blob(chunksRef.current, { type: chunksRef.current[0].type });
                    setRecordingBlob(blob);
                }
                chunksRef.current = [];
            };

            mediaRecorderRef.current = recorder;
            recorder.start(1000); // 1s chunks
            setIsRecording(true);
            setIsPaused(false);
        } catch (err) {
            console.error("Recording error:", err);
            setError("Não foi possível acessar mídia. Verifique as permissões.");
            setIsRecording(false);
        }
    }, [type]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsRecording(false);
        setIsPaused(false);
    }, [stream]);

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
        }
    }, []);

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
        }
    }, []);

    const clearRecording = useCallback(() => {
        setRecordingBlob(null);
        setDuration(0);
        setError(null);
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    // Final cleanup to ensure no camera is left on
    useEffect(() => {
        return () => {
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

