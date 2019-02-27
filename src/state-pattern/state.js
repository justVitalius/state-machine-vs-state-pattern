// @flow
import type { Model } from '../state-machine/model';

import Box from './box';

export interface State {
  box: Box;

  // действия над заявкой
  create(): void,
  fillByUserData(model: Model): void,
  fillByEgrData(): void,
  fillByEKSData(): void,
  fillByStopListData(): void,
  reserveAccount(): void,

  constructor(box: Box): void,

  // вспомогательные методы
  getAvailableActions(): Array<string>, // набор действий, которые следует запустить из текущего стейта

  getName(): string,
}