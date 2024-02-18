// src/unity.d.ts
declare global {
    interface Window {
        createUnityInstance: (
            canvas: HTMLCanvasElement | string,
            config: UnityConfig,
            onProgress?: (progress: number) => void
        ) => Promise<UnityInstance>;
        unityInstance?: UnityInstance;
    }
}

interface UnityConfig {
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    streamingAssetsUrl: string;
    companyName: string;
    productName: string;
    productVersion: string;
}

interface UnityInstance {
    SetFullscreen: (fullscreen: number) => void;
    Quit: () => Promise<void>;

    // Add more UnityInstance methods as needed
}

export {}; // Ensure this file is a module
