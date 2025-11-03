"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Maximize2 } from "lucide-react"

export default function VideoPlayer() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isOutOfView = rect.bottom < 0

        if (isOutOfView && !isMinimized) {
          setIsScrolled(true)
        } else if (!isOutOfView) {
          setIsScrolled(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMinimized])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const toggleMaximize = () => {
    setIsMinimized(false)
    setIsScrolled(false)

    // Scroll back to video container
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <>
      {/* Main Video Container */}
      <div ref={containerRef} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/video-cap.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>

        {/* Mute/Unmute Button - Main Player */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Mini Player - Bottom Right */}
      {isScrolled && (
        <div
          className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
            isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="relative w-64 sm:w-80 md:w-96 aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-primary/20">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              src="/video-cap.mp4"
            />

            {/* Mini Player Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-center justify-end gap-2">
              <button
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label={isMuted ? "Ativar som" : "Desativar som"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMaximize}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label="Maximizar vídeo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
