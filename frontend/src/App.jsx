import React, { useState, useEffect, useRef } from "react";

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: "#fff",
    padding: "0",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  backgroundOrbs: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 0,
    pointerEvents: "none",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.3,
    animation: "float 20s ease-in-out infinite",
    willChange: "transform",
  },
  orb1: {
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, #667eea 0%, transparent 70%)",
    top: "-200px",
    left: "-200px",
    animationDelay: "0s",
  },
  orb2: {
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #764ba2 0%, transparent 70%)",
    bottom: "-250px",
    right: "-250px",
    animationDelay: "5s",
  },
  orb3: {
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, #f093fb 0%, transparent 70%)",
    top: "50%",
    right: "-175px",
    animationDelay: "10s",
  },
  content: {
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    width: "100%",
    maxWidth: "none",
    boxSizing: "border-box",
  },
  header: {
    fontSize: "3.5rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textAlign: "center",
    marginBottom: "2rem",
    letterSpacing: "-0.02em",
    animation: "slideDown 0.8s ease-out",
    willChange: "transform, opacity",
  },
  card: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "2rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    display: "grid",
    gridTemplateColumns: "450px 1fr",
    gap: "2.5rem",
    minHeight: "650px",
    animation: "fadeInUp 0.8s ease-out 0.2s both",
    willChange: "transform, opacity",
    alignItems: "stretch",
    width: "100%",
    maxWidth: "none",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    overflowY: "hidden",
    minWidth: "450px",
    maxHeight: "100%",
    flex: "0 0 450px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    background: "linear-gradient(135deg, #fff 0%, #a8b8ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  input: {
    width: "100%",
    padding: "1.25rem",
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px dashed rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    color: "#fff",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    willChange: "transform",
  },
  inputHover: {
    background: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(102, 126, 234, 0.5)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.2)",
  },
  inputDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    cursor: "not-allowed",
    opacity: 0.5,
  },
  buttonGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  button: {
    padding: "1rem 1.5rem",
    borderRadius: "14px",
    fontSize: "0.95rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    outline: "none",
  },
  buttonStop: {
    background: "rgba(239, 68, 68, 0.2)",
    border: "2px solid rgba(239, 68, 68, 0.4)",
    color: "#ef4444",
  },
  buttonStopHover: {
    background: "rgba(239, 68, 68, 0.3)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
  },
  buttonRestart: {
    background: "rgba(34, 197, 94, 0.2)",
    border: "2px solid rgba(34, 197, 94, 0.4)",
    color: "#22c55e",
  },
  buttonRestartHover: {
    background: "rgba(34, 197, 94, 0.3)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
  },
  buttonDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    transform: "none",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 1.5rem",
    borderRadius: "14px",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    animation: "fadeIn 0.5s ease",
    minHeight: "54px",
    width: "100%",
    justifyContent: "center",
  },
  statusConnected: {
    background: "rgba(34, 197, 94, 0.15)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#22c55e",
  },
  statusDisconnected: {
    background: "rgba(251, 146, 60, 0.15)",
    border: "1px solid rgba(251, 146, 60, 0.3)",
    color: "#fb923c",
  },
  statusError: {
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#ef4444",
  },
  statusDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    animation: "pulse 2s ease-in-out infinite",
  },
  alert: {
    padding: "1.5rem",
    borderRadius: "16px",
    fontSize: "1.15rem",
    fontWeight: "600",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    minHeight: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertGreen: {
    background: "rgba(34, 197, 94, 0.2)",
    border: "2px solid rgba(34, 197, 94, 0.4)",
    color: "#22c55e",
    boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
    animation: "alertPulse 2s ease-in-out infinite",
  },
  alertRed: {
    background: "rgba(239, 68, 68, 0.2)",
    border: "2px solid rgba(239, 68, 68, 0.4)",
    color: "#ef4444",
    boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
    animation: "alertPulseUrgent 1s ease-in-out infinite",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    flex: "0 0 auto",
  },
  infoBox: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "1.75rem 1.5rem",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    willChange: "transform",
    minHeight: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  infoBoxHover: {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow: "0 15px 40px rgba(102, 126, 234, 0.3)",
    borderColor: "rgba(102, 126, 234, 0.4)",
    background: "rgba(255, 255, 255, 0.08)",
  },
  infoBoxTitle: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  infoBoxValue: {
    fontSize: "2.5rem",
    fontWeight: "900",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0.25rem 0",
    lineHeight: 1.2,
    transition: "all 0.3s ease",
  },
  infoBoxLarge: {
    gridColumn: "1 / -1",
    padding: "2.5rem 2rem",
  },
  infoBoxValueLarge: {
    fontSize: "5rem",
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    height: "100%",
    overflow: "hidden",
    flex: 1,
  },
  videoWrapper: {
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    background: "rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 15px 50px rgba(0, 0, 0, 0.5)",
    minHeight: "600px",
    width: "100%",
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    display: "block",
  },
  placeholder: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    color: "rgba(255, 255, 255, 0.5)",
  },
  placeholderIcon: {
    fontSize: "5rem",
    opacity: 0.4,
    animation: "float 3s ease-in-out infinite",
  },
  placeholderText: {
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  footer: {
    textAlign: "center",
    padding: "1.5rem",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "0.9rem",
    animation: "fadeIn 0.8s ease-out 0.4s both",
    marginTop: "1rem",
  },
};

const keyframes = `
* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.95); }
}

@keyframes alertPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.01); }
}

@keyframes alertPulseUrgent {
  0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(239, 68, 68, 0.3); }
  50% { transform: scale(1.02); box-shadow: 0 0 60px rgba(239, 68, 68, 0.5); }
}

@keyframes countUp {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 1200px) {
  .responsive-card { 
    grid-template-columns: 1fr !important; 
    gap: 1.5rem !important;
  }
}

.responsive-card {
  width: 100% !important;
  max-width: none !important;
}

/* Hide all scrollbars */
::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

export default function App() {
  const [potholeCount, setPotholeCount] = useState(0);
  const [totalPotholes, setTotalPotholes] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("green");
  const [wsConnected, setWsConnected] = useState(false);
  const [statusText, setStatusText] = useState("Connecting...");
  const [error, setError] = useState("");
  const [inputHover, setInputHover] = useState(false);
  const [stopHover, setStopHover] = useState(false);
  const [restartHover, setRestartHover] = useState(false);
  const [currentHover, setCurrentHover] = useState(false);
  const [totalHover, setTotalHover] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef(null);
  const wsRef = useRef(null);
  const sendQueueRef = useRef([]);
  const prevCountRef = useRef(0);
  const lastAlertTimeRef = useRef(0);
  const audioContextRef = useRef(null);
  const videoElRef = useRef(null);
  const processingStoppedRef = useRef(false);
  const fileInputRef = useRef(null);
  const currentVideoFileRef = useRef(null);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);

    // Initialize audio context
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    const WS_URL = "ws://localhost:8000/ws/pothole";
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      setStatusText("Connected");
      setError("");
      while (sendQueueRef.current.length > 0) {
        const f = sendQueueRef.current.shift();
        if (ws.readyState === 1) ws.send(f);
      }
    };

    ws.onclose = () => {
      setWsConnected(false);
      setStatusText("Disconnected");
    };

    ws.onerror = (ev) => {
      console.error("WebSocket error:", ev);
      setError("Connection error");
      setStatusText("Connection error");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { frame, count } = data;
        const currentCount = count ?? 0;

        // Only process and count if 3 or more potholes detected
        if (currentCount >= 3) {
          setPotholeCount(currentCount);

          // Track total unique potholes only when threshold is met
          if (currentCount > prevCountRef.current) {
            const newPotholes = currentCount - prevCountRef.current;
            setTotalPotholes((prev) => prev + newPotholes);
          }
          prevCountRef.current = currentCount;

          setAlertVariant("red");
          setAlertMsg(`🚨 CRITICAL: ${currentCount} Potholes in View!`);
          playVoiceAlert();
        } else {
          // Reset display when below threshold
          setPotholeCount(0);
          prevCountRef.current = 0;
          setAlertVariant("green");
          setAlertMsg("✅ Road Conditions: Clear");
        }

        if (imgRef.current && frame) {
          imgRef.current.src = "data:image/jpeg;base64," + frame;
          setHasImage(true);
        }
      } catch (err) {
        console.error("Error handling message:", err);
      }
    };

    return () => {
      try {
        ws.close();
      } catch (e) {}
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      document.head.removeChild(styleTag);
    };
  }, []);

  const getAlertStyle = () => {
    if (alertVariant === "red") return { ...styles.alert, ...styles.alertRed };
    return { ...styles.alert, ...styles.alertGreen };
  };

  const getStatusStyle = () => {
    if (error) return { ...styles.statusBadge, ...styles.statusError };
    if (wsConnected)
      return { ...styles.statusBadge, ...styles.statusConnected };
    return { ...styles.statusBadge, ...styles.statusDisconnected };
  };

  const getStatusDotColor = () => {
    if (error) return "#ef4444";
    if (wsConnected) return "#22c55e";
    return "#fb923c";
  };

  const playVoiceAlert = () => {
    // Throttle alerts - only play once every 5 seconds
    const now = Date.now();
    if (now - lastAlertTimeRef.current < 5000) return;
    lastAlertTimeRef.current = now;

    // Use Web Speech API for voice alert
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        "Potholes ahead, be careful"
      );
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the current video file
    currentVideoFileRef.current = file;

    // Reset everything and start processing
    handleStop();
    startVideoProcessing(file);
  };

  const startVideoProcessing = (file) => {
    // Reset counters
    setPotholeCount(0);
    setTotalPotholes(0);
    prevCountRef.current = 0;
    processingStoppedRef.current = false;
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = () => {
      const videoUrl = reader.result;
      const videoEl = document.createElement("video");
      videoElRef.current = videoEl;
      videoEl.src = videoUrl;
      videoEl.muted = true;
      videoEl.playsInline = true;

      const TARGET_FPS = 12;
      const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
      let lastSendTime = 0;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      videoEl.addEventListener("loadedmetadata", () => {
        const MAX_WIDTH = 640;
        const scale = Math.min(1, MAX_WIDTH / videoEl.videoWidth);
        canvas.width = Math.round(videoEl.videoWidth * scale);
        canvas.height = Math.round(videoEl.videoHeight * scale);

        videoEl.play().catch((err) => {
          console.warn("video play error:", err);
        });

        const frameLoop = () => {
          if (videoEl.paused || videoEl.ended || processingStoppedRef.current) {
            if (videoEl.ended || processingStoppedRef.current) {
              setIsProcessing(false);
            }
            return;
          }

          const now = performance.now();
          if (now - lastSendTime >= FRAME_INTERVAL_MS) {
            ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) => {
                if (!blob) return;
                const reader2 = new FileReader();
                reader2.onloadend = () => {
                  const dataUrl = reader2.result;
                  const base64 = dataUrl.replace(
                    /^data:image\/(png|jpeg);base64,/,
                    ""
                  );
                  if (wsRef.current && wsRef.current.readyState === 1) {
                    try {
                      wsRef.current.send(base64);
                    } catch (err) {
                      console.error("send error", err);
                    }
                  } else {
                    sendQueueRef.current.push(base64);
                    if (sendQueueRef.current.length > 30)
                      sendQueueRef.current.shift();
                  }
                };
                reader2.readAsDataURL(blob);
              },
              "image/jpeg",
              0.7
            );
            lastSendTime = now;
          }
          requestAnimationFrame(frameLoop);
        };

        frameLoop();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleStop = () => {
    processingStoppedRef.current = true;
    setIsProcessing(false);

    // Stop video playback
    if (videoElRef.current) {
      videoElRef.current.pause();
      videoElRef.current.currentTime = 0;
    }

    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const handleRestart = () => {
    // Check if we have a video file to restart
    if (!currentVideoFileRef.current) return;

    // Stop current processing
    handleStop();

    // Reset counters
    setPotholeCount(0);
    setTotalPotholes(0);
    prevCountRef.current = 0;

    // Restart with the same video
    startVideoProcessing(currentVideoFileRef.current);
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundOrbs}>
        <div style={{ ...styles.orb, ...styles.orb1 }} />
        <div style={{ ...styles.orb, ...styles.orb2 }} />
        <div style={{ ...styles.orb, ...styles.orb3 }} />
      </div>

      <div style={styles.content}>
        <h1 style={styles.header}>🛣️ Pothole Detection System</h1>

        <div style={styles.card} className="responsive-card">
          <div style={styles.leftPanel}>
            <div>
              <h2 style={styles.title}>📤 Upload Video</h2>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={!wsConnected}
                onMouseEnter={() => setInputHover(true)}
                onMouseLeave={() => setInputHover(false)}
                style={{
                  ...styles.input,
                  ...(inputHover && wsConnected ? styles.inputHover : {}),
                  ...(!wsConnected ? styles.inputDisabled : {}),
                }}
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                onClick={handleStop}
                disabled={!isProcessing}
                onMouseEnter={() => setStopHover(true)}
                onMouseLeave={() => setStopHover(false)}
                style={{
                  ...styles.button,
                  ...styles.buttonStop,
                  ...(stopHover && isProcessing ? styles.buttonStopHover : {}),
                  ...(!isProcessing ? styles.buttonDisabled : {}),
                }}
              >
                ⏸️ Stop
              </button>
              <button
                onClick={handleRestart}
                disabled={!currentVideoFileRef.current}
                onMouseEnter={() => setRestartHover(true)}
                onMouseLeave={() => setRestartHover(false)}
                style={{
                  ...styles.button,
                  ...styles.buttonRestart,
                  ...(restartHover && currentVideoFileRef.current
                    ? styles.buttonRestartHover
                    : {}),
                  ...(!currentVideoFileRef.current
                    ? styles.buttonDisabled
                    : {}),
                }}
              >
                🔄 Restart
              </button>
            </div>

            <div style={getStatusStyle()}>
              <div
                style={{
                  ...styles.statusDot,
                  backgroundColor: getStatusDotColor(),
                }}
              />
              {error || statusText}
            </div>

            {alertMsg && <div style={getAlertStyle()}>{alertMsg}</div>}

            <div style={styles.statsGrid}>
              <div
                style={{
                  ...styles.infoBox,
                  ...(currentHover ? styles.infoBoxHover : {}),
                }}
                onMouseEnter={() => setCurrentHover(true)}
                onMouseLeave={() => setCurrentHover(false)}
              >
                <div style={styles.infoBoxTitle}>Current</div>
                <div style={styles.infoBoxValue}>{potholeCount}</div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "0.25rem",
                  }}
                >
                  In View
                </div>
              </div>

              <div
                style={{
                  ...styles.infoBox,
                  ...(totalHover ? styles.infoBoxHover : {}),
                }}
                onMouseEnter={() => setTotalHover(true)}
                onMouseLeave={() => setTotalHover(false)}
              >
                <div style={styles.infoBoxTitle}>Total</div>
                <div style={styles.infoBoxValue}>{totalPotholes}</div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "0.25rem",
                  }}
                >
                  Detected
                </div>
              </div>
            </div>
          </div>

          <div style={styles.rightPanel}>
            <div style={styles.videoWrapper}>
              <div style={styles.imageContainer}>
                <img
                  ref={imgRef}
                  alt="Live Detection Feed"
                  style={{
                    ...styles.image,
                    opacity: hasImage ? 1 : 0,
                  }}
                />
              </div>
              {!hasImage && (
                <div style={styles.placeholder}>
                  <div style={styles.placeholderIcon}>📹</div>
                  <div style={styles.placeholderText}>
                    Upload a road video to start detection
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    AI-powered real-time analysis
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer style={styles.footer}>
          © 2025 Advanced Pothole Detection System · Powered by AI · Real-time
          Monitoring
        </footer>
      </div>
    </div>
  );
}
