"use client"

import type { Product } from "./semanticSearch"

export interface ScanHistoryItem {
  id: string
  product: Product
  scannedAt: Date
  stockLevel: string
  lowStock: boolean
}

const STORAGE_KEY = "aislepilot_scan_history"

export function saveScanHistory(items: ScanHistoryItem[]): void {
  if (typeof window === "undefined") return

  try {
    const serializedItems = items.map((item) => ({
      ...item,
      scannedAt: item.scannedAt.toISOString(),
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializedItems))
  } catch (error) {
    console.error("Failed to save scan history:", error)
  }
}

export function loadScanHistory(): ScanHistoryItem[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    return parsed.map((item: any) => ({
      ...item,
      scannedAt: new Date(item.scannedAt),
    }))
  } catch (error) {
    console.error("Failed to load scan history:", error)
    return []
  }
}

export function addToScanHistory(item: Omit<ScanHistoryItem, "id">): void {
  const history = loadScanHistory()
  const newItem: ScanHistoryItem = {
    ...item,
    id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  }

  history.unshift(newItem) // Add to beginning

  // Keep only last 50 items
  if (history.length > 50) {
    history.splice(50)
  }

  saveScanHistory(history)
}

export function clearScanHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
