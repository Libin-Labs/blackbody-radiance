import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('solar-like visible radiance', () => {
  assert.ok(Math.abs(api.planckRadiance(500e-9, 5778) / 2.6375669866614844e13 - 1) < 1e-10);
});
test('Wien reference', () => {
  assert.equal(api.wienPeak(1000), 2.897771955e-6);
});
test('cold short wavelength underflow', () => {
  assert.equal(api.planckRadiance(1e-9, 1), 0);
});
test('temperature monotonic', () => {
  assert.ok(api.planckRadiance(1e-6, 2000) > api.planckRadiance(1e-6, 1000));
});
test('domain errors', () => {
  assert.throws(() => api.planckRadiance(0, 1000));
  assert.throws(() => api.wienPeak(0));
  assert.throws(() => api.planckRadiance(1, 1000));
});
test('direct Planck formula oracle', () => {
  for (let t = 500; t <= 5000; t += 500) {
    const w = 1e-6,
      h = 6.62607015e-34,
      c = 299792458,
      k = 1.380649e-23,
      expected = (2 * h * c * c) / w ** 5 / Math.expm1((h * c) / (w * k * t));
    assert.ok(Math.abs(api.planckRadiance(w, t) / expected - 1) < 1e-12);
  }
});
