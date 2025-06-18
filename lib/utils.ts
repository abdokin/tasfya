import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00"

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(remainingSeconds).padStart(2, "0")

  return `${formattedMinutes}:${formattedSeconds}`
}

export function formatYoutubeUrl(url: string): string {
  if (!url) return ""
  // convert normal url to embed url
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("youtube.com/watch?v=", "youtube.com/embed/")
  }
  if (url.includes("youtu.be/")) {
    return url.replace("youtu.be/", "youtube.com/embed/")
  }
  if (url.includes("youtube.com/shorts/")) {
    return url.replace("youtube.com/shorts/", "youtube.com/embed/")
  }
  if (url.includes("youtube.com/live/")) {
    return url.replace("youtube.com/live/", "youtube.com/embed/")
  }
  if (url.includes("youtube.com/embed/")) {
    return url
  }
  return url;
}

export function resourceUrl(path: string): string {
  if (!path) return ""
  // check if the path contain NEXT_PUBLIC_API_URL
  if (process.env.NODE_ENV === "production" ) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    } else if (path.startsWith("/")) {
      return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
    }
    return path;
  }
  const base_url = process.env.NEXT_PUBLIC_API_URL ? (process.env.NEXT_PUBLIC_API_URL ) : "http://localhost:3000/"
  return `${base_url}${path}`
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0 ثانية"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours} ساعة ${minutes > 0 ? `و ${minutes} دقيقة` : ""}`
  }

  if (minutes > 0) {
    return `${minutes} دقيقة ${remainingSeconds > 0 ? `و ${remainingSeconds} ثانية` : ""}`
  }

  return `${remainingSeconds} ثانية`
}

export function formatDate(date: Date | string | number | null | undefined): string {
  try {
    const validDate = date ? new Date(date) : new Date()
    
    if (isNaN(validDate.getTime())) {
      return "تاريخ غير صالح"
    }
    
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Intl.DateTimeFormat("ar-EG", options).format(validDate)
  } catch (error) {
    return "تاريخ غير صالح"
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
