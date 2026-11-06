# @lp-labs/blackbody-radiance

SI Planck spectral radiance and Wien peak estimates.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/blackbody-radiance
```

## Working example

```js
import { wienPeak } from '@lp-labs/blackbody-radiance';
if (wienPeak(1000) !== 2.897771955e-6) throw new Error('Wien');
```

CommonJS: `const api = require('@lp-labs/blackbody-radiance')`.

## Behavior, customization and limits

planckRadiance(wavelengthMetres,temperatureKelvin) returns W/(sr*m cubed) spectral radiance per wavelength, exact SI h=6.62607015e-34,c=299792458,k=1.380649e-23; wavelength1e-9..1e-2m,temp1..1e7K. Log-domain exponent uses expm1; output0 is legitimate floating underflow for negligible radiance. wienPeak uses2.897771955e-3/T metres. O(1), ideal blackbody only, not spectrum integration, emissivity, medical or thermal safety model.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function planckRadiance(wavelengthMetres: number, temperatureKelvin: number): number;
export declare function wienPeak(temperatureKelvin: number): number;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
