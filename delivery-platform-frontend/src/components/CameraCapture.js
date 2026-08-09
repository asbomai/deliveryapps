import { useEffect, useRef } from 'react';

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const capture = () => {
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    onCapture(canvas.toDataURL('image/jpeg'));
  };

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={capture}>Capture</button>
      <canvas ref={canvasRef} hidden />
    </div>
  );
}
