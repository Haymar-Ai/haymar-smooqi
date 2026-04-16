'use client'

import { useState, useCallback, useRef, useMemo, useEffect } from 'react'

function getBestVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null

  const voices = speechSynthesis.getVoices()
  if (!voices.length) return null

  // Priority list of high-quality natural voices by name
  const preferredNames = [
    'Samantha',           // iOS/macOS — best quality
    'Karen',              // iOS Australian — also excellent
    'Google US English',  // Android/Chrome — natural
    'Microsoft Aria Online (Natural) - English (United States)', // Edge/Windows
    'Microsoft Jenny Online (Natural) - English (United States)',
    'Alex',               // macOS legacy — still good
    'Victoria',           // macOS
    'Google UK English Female', // Chrome fallback
  ]

  for (const name of preferredNames) {
    const match = voices.find((v) => v.name === name)
    if (match) return match
  }

  // Fall back: any en-US voice
  const enUS = voices.find((v) => v.lang === 'en-US')
  if (enUS) return enUS

  // Fall back: any English voice
  const en = voices.find((v) => v.lang.startsWith('en'))
  if (en) return en

  return null
}

export function useSpeechPlayer(text: string, onComplete: () => void) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [speed, setSpeed] = useState(1)
  const [isSupported, setIsSupported] = useState(true)

  const words = useMemo(() => text.split(/\s+/), [text])

  const wordPositions = useMemo(() => {
    const positions: number[] = []
    let offset = 0
    for (const word of words) {
      const idx = text.indexOf(word, offset)
      positions.push(idx)
      offset = idx + word.length
    }
    return positions
  }, [text, words])

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setIsSupported(false)
    }
  }, [])

  const play = useCallback(() => {
    if (!isSupported) return

    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speed

    // Apply best available voice (resolved at play time — iOS loads voices
    // synchronously after a user gesture, so this runs here, not on mount).
    const voice = getBestVoice()
    if (voice) utterance.voice = voice

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex
        let foundIndex = 0
        for (let i = 0; i < wordPositions.length; i++) {
          if (wordPositions[i] <= charIndex) {
            foundIndex = i
          } else {
            break
          }
        }
        setCurrentWordIndex(foundIndex)
      }
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWordIndex(-1)
      onComplete()
    }

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
    setIsPlaying(true)
    setIsPaused(false)
  }, [text, speed, wordPositions, onComplete, isSupported])

  const pause = useCallback(() => {
    speechSynthesis.pause()
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    speechSynthesis.resume()
    setIsPaused(false)
  }, [])

  const cancel = useCallback(() => {
    speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentWordIndex(-1)
  }, [])

  const changeSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed)
    if (isPlaying) {
      cancel()
    }
  }, [isPlaying, cancel])

  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  return {
    isPlaying,
    isPaused,
    currentWordIndex,
    speed,
    words,
    isSupported,
    play,
    pause,
    resume,
    cancel,
    changeSpeed,
  }
}
