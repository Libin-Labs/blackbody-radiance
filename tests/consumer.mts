import { wienPeak } from '@lp-labs/blackbody-radiance';
if (wienPeak(1000) !== 2.897771955e-6) throw new Error('Wien');
// @ts-expect-error invalid argument must be rejected by declarations
wienPeak('1000');
