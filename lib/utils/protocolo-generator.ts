export function gerarProtocolo(): string {
    // Formato: YYYY-MMDD-XXXXXX
    // Exemplo: 2026-0130-A3F9K2

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomPart = Array.from(
        { length: 6 },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');

    return `${year}${month}${day}-${randomPart}`;
}
