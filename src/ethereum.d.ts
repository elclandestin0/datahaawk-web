// src/unity.d.ts
declare global {
    interface Window {
        createUnityInstance: (
            canvas: HTMLCanvasElement | string,
            config: UnityConfig,
            onProgress?: (progress: number) => void
        ) => Promise<UnityInstance>;
        unityInstance?: UnityInstance;
        ethereum?: {
            isMetaMask?: true;
            request: (request: { method: string, params?: Array<any> }) => Promise<any>;
            on: (event: string, callback: (...args: any[]) => void) => void;
            removeListener: (event: string, callback: (...args: any[]) => void) => void;
            // Define other ethereum properties and methods you use
        };
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
