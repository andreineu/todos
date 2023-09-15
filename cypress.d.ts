/* eslint-disable @typescript-eslint/no-explicit-any */

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare namespace Cypress {
  interface Chainable {
    clearIndexedDB(): Promise<any>;
  }
}
