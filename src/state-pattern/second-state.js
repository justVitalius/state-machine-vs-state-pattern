// @flow

import type { Model } from '../state-machine/model';
import type { State } from './state';

const ThirdState = require('./third-state');
const Box = require('./box');

module.exports = class SecondState implements State {
  box: Box;

  constructor(box: Box) {
    this.box = box;
  }

  getName() {
    return 'second';
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
    return ['fillByEgrData', 'fillByStopList', 'fillByEKSData'];
  }

  fillByUserData(model: Model = {}) {
    const { corporate: incomeCorp, request: incomeReq } = model;
    const { corporate: originalCorp, request: originalReq } = this.box.getModel();
    const corporate = {
      ...originalCorp,
      ...incomeCorp,
    };
    const request = {
      ...originalReq,
      ...incomeReq,
    }
    const { inn, ogrn, name } = corporate;
    const { accountNumber } = request;
    if (!!inn && !!ogrn && !!name && !!accountNumber) {
      this.box.changeState(new ThirdState(this.box))
    }
  }
  fillByEgrData() {}
  fillByEKSData() {}
  fillByStopListData() {}
  reserveAccount() {
    console.warn('empty method for this state');
  }
}