import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, AlertCircle } from 'lucide-react';

const QrScanner = ({ onScan }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const scannerId = "qr-reader-viewport";

    const startCamera = async () => {
      try {
        const html5QrCode = new Html5Qrcode(scannerId);
        scannerRef.current = html5QrCode;

        // Configuration with back camera preference (environment)
        const config = {
          fps: 15,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.777778
        };

        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            // Trigger callback immediately to show video without delay
            onScan();
            try {
              if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(() => {});
              }
            } catch (e) {}
          },
          (errorMessage) => {
            // Ignore ongoing frame decode errors
          }
        );

        if (isMounted) {
          setHasStarted(true);
        }
      } catch (err) {
        console.error("Camera start failed:", err);
        if (isMounted) {
          setErrorMsg(err?.message || "Failed to access camera. Please allow camera permissions in browser.");
        }
      }
    };

    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(() => {
      startCamera();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [onScan]);

  return (
    <div className="relative w-full h-full min-h-screen bg-black flex flex-col justify-between overflow-hidden">
      {/* Video Viewport */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div id="qr-reader-viewport" className="w-full h-full [&_video]:w-full [&_video]:h-full [&_video]:object-cover" />
      </div>

      {/* Viewfinder Reticle Overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-64 h-64 border-2 border-white/60 rounded-xl shadow-2xl flex items-center justify-center">
          {/* Corner highlights */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#F26522] rounded-tl-md" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#F26522] rounded-tr-md" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#F26522] rounded-bl-md" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#F26522] rounded-br-md" />
          
          {!hasStarted && !errorMsg && (
            <div className="flex flex-col items-center text-white/80 animate-pulse">
              <Camera size={36} className="mb-2" />
              <span className="text-xs font-medium">Starting camera...</span>
            </div>
          )}
        </div>
      </div>

      {/* Error / Permission Banner */}
      {errorMsg && (
        <div className="relative z-20 m-4 p-4 bg-red-600/90 text-white rounded-xl backdrop-blur-md shadow-lg flex items-start gap-3">
          <AlertCircle size={24} className="flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-sm mb-1">Camera Permission Required</p>
            <p className="opacity-90">{errorMsg}</p>
            <p className="mt-2 font-medium">Tap the lock or site settings icon next to the URL bar in Chrome to allow camera access, then reload.</p>
          </div>
        </div>
      )}

      {/* Footer Text */}
      <div className="relative z-10 p-6 text-center text-white/90 bg-gradient-to-t from-black via-black/60 to-transparent">
        <p className="text-sm font-medium tracking-wide">
          Place a barcode inside the viewfinder rectangle to scan it.
        </p>
      </div>
    </div>
  );
};

export default QrScanner;
