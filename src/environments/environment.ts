// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { OPENLOGIN_NETWORK } from '@toruslabs/openlogin';

export const environment = {
  production: false,
  torus: {
    clientID:
      'BI1IOOJopY1NFX_Pq16WVfitWqYEAEoIe1CUl_ceT-uLgfkwZbGDu1FIJwnPgde9i1HUtm0B1-jzfu9VML2pjhM',
    network: OPENLOGIN_NETWORK.TESTNET,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
