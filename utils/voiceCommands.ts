"use client"

declare var SpeechRecognition: any

export class VoiceCommandManager {
  private recognition: SpeechRecognition | null = null
  private isListening = false

  constructor() {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      this.recognition = new (window as any).webkitSpeechRecognition()
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.lang = "en-US"
    }
  }

  startListening(onCommand: (command: string) => void, onError?: (error: string) => void) {
    if (!this.recognition) {
      onError?.("Speech recognition not supported")
      return
    }

    if (this.isListening) return

    this.isListening = true

    this.recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase()
      onCommand(command)
      this.isListening = false
    }

    this.recognition.onerror = (event) => {
      onError?.(event.error)
      this.isListening = false
    }

    this.recognition.onend = () => {
      this.isListening = false
    }

    this.recognition.start()
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  processCommand(command: string): { action: string; params?: any } | null {
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes("scan") || lowerCommand.includes("camera")) {
      return { action: "scan" }
    }

    if (lowerCommand.includes("map") || lowerCommand.includes("navigate")) {
      return { action: "navigate" }
    }

    if (lowerCommand.includes("cart") || lowerCommand.includes("history")) {
      return { action: "cart" }
    }

    if (lowerCommand.includes("find") || lowerCommand.includes("search")) {
      const product = lowerCommand.replace(/find|search|for/g, "").trim()
      return { action: "search", params: { query: product } }
    }

    return null
  }
}
