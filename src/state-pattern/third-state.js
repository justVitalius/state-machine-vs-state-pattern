// @flow

import type { State } from './state';

const FourthState = require('./fourth-state');
const Box = require('./box');

module.exports = class SecondState implements State {
  box: Box;

  constructor(box: Box) {
    this.box = box;
  }

  getName() {
    return 'third';
  }

  create() {
    console.warn('empty method for this state');
  }

  getAvailableActions(): Array<string> {
    const { corporate, request, meta } = this.box.getModel();
    const { inn, ogrn, name } = corporate;
    const { accountNumber } = request;
    if (!inn || !ogrn || !name || !accountNumber) {
      return ['fillByUserData']
    }
    if (!meta.asyncIntegrationsWasDone) {
      return ['fillByEgrData', 'fillByEKSData', 'fillByStopListData'];
    }
    return [];
  }

  fillByUserData(obj: any = {}) {
    console.warn('empty method for this state');
  }

  fillByEgrData() {
    const { corporate, request, meta } = this.box.getModel();
    const { inn, ogrn, name } = corporate;
    const { accountNumber } = request;
    if (!!inn && !!ogrn && !!name && !!accountNumber) {
      // start sync code
      meta.asyncIntegrationsWasDone = true;
      this.box.changeState(new FourthState(this.box));
    }
  }
  fillByEKSData() {
    const { corporate, request, meta } = this.box.getModel();
    const { inn, ogrn, name } = corporate;
    const { accountNumber } = request;
    if (!!inn && !!ogrn && !!name && !!accountNumber) {
      // start sync code
      meta.asyncIntegrationsWasDone = true;
      this.box.changeState(new FourthState(this.box));
    }
  }
  fillByStopListData() {
    const { corporate, request, meta } = this.box.getModel();
    const { inn, ogrn, name } = corporate;
    const { accountNumber } = request;
    if (!!inn && !!ogrn && !!name && !!accountNumber) {
      // start sync code
      meta.asyncIntegrationsWasDone = true;
      this.box.changeState(new FourthState(this.box));
    }
  }
  reserveAccount() {
    console.warn('empty method for this state');
  }
};
