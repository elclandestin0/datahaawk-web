import React, {useEffect, useRef} from 'react';

const UnityGame: React.FC = () => {
    const unityCanvasRef = useRef<HTMLCanvasElement>(null);
    // useEffect(() => {
    //     // Set canvas style for mobile devices
    //     const adjustCanvasForMobile = () => {
    //         if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    //             const meta = document.createElement('meta');
    //             meta.name = 'viewport';
    //             meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    //             document.head.appendChild(meta);
    //
    //             if (unityCanvasRef.current) {
    //                 unityCanvasRef.current.className = "unity-mobile";
    //                 unityCanvasRef.current.style.width = "100%";
    //                 unityCanvasRef.current.style.height = "100%";
    //             }
    //         } else {
    //             // Desktop style adjustments, if necessary
    //             if (unityCanvasRef.current) {
    //                 unityCanvasRef.current.style.width = "960px";
    //                 unityCanvasRef.current.style.height = "600px";
    //             }
    //         }
    //     };
    //     console.log("about to build");
    //     const buildUrl = "/Build";
    //     const loaderUrl = buildUrl + "/1.loader.js";
    //     const config = {
    //         dataUrl: buildUrl + "/webgl.data",
    //         frameworkUrl: buildUrl + "/build.framework.js",
    //         codeUrl: buildUrl + "/build.wasm",
    //         streamingAssetsUrl: "StreamingAssets",
    //         companyName: "DefaultCompany",
    //         productName: "My project",
    //         productVersion: "0.1",
    //     };
    //
    //     const script = document.createElement("script");
    //     script.src = loaderUrl;
    //     script.async = true;
    //     script.onload = () => {
    //         if (unityCanvasRef.current) {
    //             console.log("creating unity instance");
    //             window.createUnityInstance(unityCanvasRef.current, config)
    //                 .then((unityInstance: any) => {
    //                     window.unityInstance = unityInstance;
    //                     adjustCanvasForMobile(); // Adjust canvas size after Unity instance is created
    //                 })
    //                 .catch((message: string) => {
    //                     console.error('Unity Instance creation failed:', message);
    //                 });
    //         }
    //     };
    //     document.body.appendChild(script);
    //
    //     return () => {
    //         document.body.removeChild(script);
    //         // Consider additional cleanup for Unity instance if necessary
    //     };
    // }, [unityCanvasRef]);


    return (
        <div id="unity-container" className="unity-desktop">
            <canvas ref={unityCanvasRef} id="unity-canvas" width="960" height="600" tabIndex={-1}></canvas>
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
            <div id="unity-warning"></div>
            <div id="unity-footer">
                <div id="unity-webgl-logo"></div>
                <div id="unity-fullscreen-button"></div>
                <div id="unity-build-title">My project</div>
            </div>
        </div>
    );
};

export default UnityGame;
