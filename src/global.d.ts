export {}

declare global {
    interface Window {
        YTPlayer: any;
        seek(event: any): void
    }
}