jest.mock('./first-state');
jest.mock('./second-state');
jest.mock('./state-machine-helpers');
const { calculateNextState } = require ('./state-machine-helpers');
const initialModel = require('./model');
const StateMachine = require('./state-machine');

const mockedFirst = {
  getName: () => 'first',
  onExecute: jest.fn(),
  canExit: jest.fn(),
  onExit: jest.fn(),
  onStart: jest.fn(),
};

const mockedSecond = {
  getName: () => 'second',
  onExecute: jest.fn(),
  canExit: jest.fn(),
  onExit: jest.fn(),
  onStart: jest.fn(),
};

const transitions = {
  'first': ['second'],
  'second': ['second'],
};

const states = {
  'first': mockedFirst,
  'second': mockedSecond,
};

describe('StateMachine',  () => {
  describe('handle()', () => {
    beforeEach( () => {
      const controller = new StateMachine(states, transitions);
      controller.handle({
        ...initialModel,
        currentStateName: mockedFirst.getName(),
      });
    });
    
    it('Вызывает onExecute у текущего состояния', () => {
      expect(mockedFirst.onExecute).toHaveBeenCalledTimes(1);
    });

    it('Вызывает canExit у текущего состояния', () => {
      expect(mockedFirst.canExit).toHaveBeenCalled();
    });

    describe('Выход с текущего шага запрещен', () => {
      beforeEach( () => {
        mockedFirst.canExit.mockReturnValue(false);
        const controller = new StateMachine(states, transitions);

        controller.handle({
          ...initialModel,
          currentStateName: mockedFirst.getName(),
        });
      })
      

      it('Не вызывается расчет перехода на новый шаг', () => {
        expect(
          calculateNextState
        ).not.toHaveBeenCalled();
      });

      it('Не вызывается onExit у текущего шага', () => {
        expect(
          mockedFirst.onExit
        ).not.toHaveBeenCalled();
      });

      it('Не вызывается onStart у следующего шага', () => {
        expect(
          mockedSecond.onStart
        ).not.toHaveBeenCalled();
      });
    });

    describe('Можно выйти из текущего состояния', () => {
      beforeEach( () => {
        mockedSecond.onStart.mockClear();
        mockedFirst.onExecute.mockClear();
        mockedFirst.canExit.mockClear();
        mockedFirst.canExit.mockReturnValue(true);
        calculateNextState.mockReturnValue(mockedSecond)

        const controller = new StateMachine(states, transitions);

        controller.handle({
          ...initialModel,
          currentStateName: mockedFirst.getName(),
        });
      });

      it('Вызывается расчет перехода на новый шаг', () => {
        expect(
          calculateNextState
        ).toHaveBeenCalledTimes(1);
      });

      it('Вызывается onExit у текущего шага', () => {
        expect(
          mockedFirst.onExit
        ).not.toHaveBeenCalledTimes(1);
      });

      it('Вызывается onStart у следующего шага', () => {
        expect(
          mockedSecond.onStart
        ).toHaveBeenCalledTimes(1);
      });

      it('Новое состояние не равно предыдущему', () => {
        const controller = new StateMachine(states, transitions);
        const newState =  controller.handle({
          ...initialModel,
          currentStateName: mockedFirst.getName(),
        });
        expect(newState).toEqual(mockedSecond);
        expect(newState).not.toEqual(mockedFirst);
      });
    })
  });
});
