"use client"

import { useEffect, useRef, useState } from "react"
import { initializeCamera } from "@/utils/vision"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CameraIcon } from "lucide-react"

interface CameraProps {
  onStream?: (stream: MediaStream) => void
  className?: string
  showOverlay?: boolean
}

export default function Camera({ onStream, className = "", showOverlay = false }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true;
    async function startCamera() {
      try {
        setIsLoading(true)
        const mediaStream = await initializeCamera()
        if (!active) return;
        setStream(mediaStream)
        onStream?.(mediaStream)
      } catch (err) {
        setError("Camera access denied. Please allow camera permissions.")
        setIsLoading(false)
        console.error("Camera error:", err)
      }
    }

    startCamera()

    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [onStream, stream])

  // Attach stream to video element when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.onloadedmetadata = () => {
        setIsLoading(false)
      }
    }
  }, [stream])

  if (error) {
    return (
      <Card className={`${className}`}>
        <CardContent className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-600 mb-2 font-medium">{error}</p>
            <p className="text-sm text-gray-500">Please refresh and allow camera access</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className={`${className}`}>
        <CardContent className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
          <div className="text-center">
            <CameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
            <p className="text-gray-600">Starting camera...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full rounded-lg object-cover"
        aria-label="Live camera feed for product scanning"
      />

      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
              Point at product
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
