// @flow

import type { Model } from './model';
import type { State } from './error-state';

module.exports = class ThirdState implements State {
  name: string;

  constructor() {
    this.name = 'third';
  }

  getName() {
    return this.name;
  }

  canExit(model: Model = {}) {
    const { meta = {} } = model;
    return !!meta.asyncIntegraionsWasDone;
  }

  canApply(model: Model = {}) {
    const { meta = {} } = model;
    return !meta.integrationHasError;
  }

  onStart(model: Model = {}) {
    console.log('ThirdState onStart');
    const { meta = {} } = model;
    meta.asyncIntegrationsWasDone = false;

    setTimeout( () => {
      meta.asyncIntegrationsWasDone = true;
    }, 1000);
  }

  onExecute() {
    console.log('ThirdState onExecute')
  }

  onExit() {
    console.log('ThirdState onExit')
  }

}
