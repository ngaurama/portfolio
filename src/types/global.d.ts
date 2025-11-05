export {};

declare global {
  interface Window {
    openVideoModal: (videoUrl: string, title?: string) => void;
  }
}
