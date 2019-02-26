// @flow

import type { State } from './error-state';
import type { Model } from './model';

module.exports = class SecondState implements State {
  name: string;

  constructor() {
    this.name = 'second';
  }

  getName() {
    return this.name;
  }

  canExit(model: Model ={}) {
    const { corporate = {}, request = {} } = model;
    const { inn, name, ogrn } = corporate;
    const { accountNumber } = request;
    return !!inn && !!name && !!ogrn && !!accountNumber;
  }

  canApply(model: Model ={}) {
    const { meta = {} } = model;
    return !meta.integrationHasError;
  }

  onStart() {
    console.log('SecondState onStart')
  }

  onExecute() {
    console.log('SecondState onExecute')
  }

  onExit() {
    console.log('SecondState onExit')
  }

}
