import React from 'react';

interface ScreenReaderAnnouncerProps {
    message: string;
    politeness?: 'polite' | 'assertive';
}

export function ScreenReaderAnnouncer({ message, politeness = 'polite' }: ScreenReaderAnnouncerProps) {
    return (
        <div
            role="status"
            aria-live={politeness}
            aria-atomic="true"
            className="sr-only"
        >
            {message}
        </div>
    );
}
