export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(operation: string): () => void {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime

      if (!this.metrics.has(operation)) {
        this.metrics.set(operation, [])
      }

      this.metrics.get(operation)!.push(duration)

      // Keep only last 100 measurements
      const measurements = this.metrics.get(operation)!
      if (measurements.length > 100) {
        measurements.shift()
      }
    }
  }

  getAverageTime(operation: string): number {
    const measurements = this.metrics.get(operation)
    if (!measurements || measurements.length === 0) return 0

    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length
  }

  getAllMetrics(): Record<string, { avg: number; count: number }> {
    const result: Record<string, { avg: number; count: number }> = {}

    for (const [operation, measurements] of this.metrics.entries()) {
      result[operation] = {
        avg: this.getAverageTime(operation),
        count: measurements.length,
      }
    }

    return result
  }
}
