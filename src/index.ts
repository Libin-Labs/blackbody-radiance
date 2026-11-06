function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function planckRadiance(wavelengthMetres: number, temperatureKelvin: number): number {
  const wavelength = finite(wavelengthMetres, 1e-9, 1e-2),
    temperature = finite(temperatureKelvin, 1, 1e7),
    h = 6.62607015e-34,
    c = 299792458,
    k = 1.380649e-23,
    x = (h * c) / (wavelength * k * temperature),
    logDenominator = x > 700 ? x : Math.log(Math.expm1(x)),
    logValue = Math.log(2 * h * c * c) - 5 * Math.log(wavelength) - logDenominator;
  return finite(Math.exp(logValue), 0);
}
export function wienPeak(temperatureKelvin: number): number {
  return 2.897771955e-3 / finite(temperatureKelvin, 1, 1e7);
}
