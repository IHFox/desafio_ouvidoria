import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File as FileIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FileUploaderProps {
    onFilesChange: (files: File[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
    accept?: Record<string, string[]>;
    id?: string;
}

export function FileUploader({
    onFilesChange,
    maxFiles = 5,
    maxSizeMB = 10,
    accept = {
        'image/*': ['.png', '.jpg', '.jpeg'],
        'video/*': ['.mp4', '.mov']
    },
    id = "file-upload"
}: FileUploaderProps) {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prev => {
            const newFiles = [...prev, ...acceptedFiles].slice(0, maxFiles);
            onFilesChange(newFiles);
            return newFiles;
        });
    }, [maxFiles, onFilesChange]);

    const removeFile = (index: number) => {
        setFiles(prev => {
            const newFiles = prev.filter((_, i) => i !== index);
            onFilesChange(newFiles);
            return newFiles;
        });
    };

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        maxFiles,
        maxSize: maxSizeMB * 1024 * 1024,
        accept
    });

    return (
        <div className="space-y-4">
            <Label htmlFor={id}>Anexos (Opcional)</Label>

            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
        `}
                role="button"
                aria-label="Upload de arquivos"
                tabIndex={0}
            >
                <input {...getInputProps()} id={id} />
                <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                        {isDragActive ? 'Solte os arquivos aqui' : 'Arraste arquivos ou clique para selecionar'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Imagens e Vídeos até {maxSizeMB}MB (Máx {maxFiles} arquivos)
                    </p>
                </div>
            </div>

            {/* Lista de Arquivos */}
            {files.length > 0 && (
                <ul className="grid gap-2 sm:grid-cols-2">
                    {files.map((file, index) => (
                        <li key={`${file.name}-${index}`} className="relative group flex items-center p-2 border rounded-md bg-card">
                            <div className="h-10 w-10 shrink-0 rounded bg-muted flex items-center justify-center mr-3 overflow-hidden">
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${file.name}`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <FileIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                                aria-label={`Remover ${file.name}`}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Erros */}
            {fileRejections.length > 0 && (
                <div className="text-sm text-destructive mt-2" role="alert">
                    {fileRejections.map(({ file, errors }) => (
                        <p key={file.name}>
                            {file.name}: {errors.map(e => e.message).join(', ')}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
