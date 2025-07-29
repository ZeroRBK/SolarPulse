
type Period = "monthly" | "yearly";

/**
 * Estimates solar energy output in kWh based on irradiance data and system parameters.
 *
 * @param irradiance - Daily irradiance in kWh/m²/day (from NASA POWER API)
 * @param systemSizeKwp - Solar system size in kilowatts peak (kWp)
 * @param period - "monthly" or "yearly" output
 * @param performanceRatio - Real-world performance adjustment factor (default 0.75)
 * @returns Estimated energy output in kWh
 */
export function estimateSolarOutput(
  irradiance: number, // kWh/m²/day
  systemSizeKwp: number,
  period: Period = "monthly",
  performanceRatio = 0.75
): number {
  const days = period === "monthly" ? 30 : 365;
  const energyKwh = irradiance * systemSizeKwp * performanceRatio * days;
  return Math.round(energyKwh * 100) / 100;
}
