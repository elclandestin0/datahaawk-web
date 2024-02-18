import React, {useEffect} from 'react';

const UnityWebGL: React.FC = () => {
    useEffect(() => {
        const buildUrl = "/Build";
        const loaderUrl = buildUrl + "/Builds.loader.js";
        const config = {
            dataUrl: buildUrl + "/Builds.data",
            frameworkUrl: buildUrl + "/Builds.framework.js",
            codeUrl: buildUrl + "/Builds.wasm",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "My project",
            productVersion: "0.1",
        };

        const script = document.createElement("script");
        script.src = loaderUrl;
        script.async = true;
        script.onload = () => {
            window.createUnityInstance(document.querySelector("#unity-canvas"), config)
                .then((unityInstance: any) => {
                    window.unityInstance = unityInstance;
                })
                .catch((message: string) => {
                    console.error('Unity Instance creation failed:', message);
                });
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            // Consider additional cleanup for Unity instance if necessary
        };
    }, []);

    return (
        <div id="unity-container" className="unity-desktop">
            <canvas id="unity-canvas" width="960" height="600" tabIndex={-1}></canvas>
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

export default UnityWebGL;
