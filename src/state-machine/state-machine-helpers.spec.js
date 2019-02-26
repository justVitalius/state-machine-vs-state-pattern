const { calculateNextState } = require('./state-machine-helpers');
const initialState = require('./model');

const mockedFirst = {
  getName: () => 'first',
  canApply: jest.fn(),
};

const mockedSecond = {
  getName: () => 'second',
  canApply: jest.fn(),
};

const mockedThird = {
  getName: () => 'third',
  canApply: jest.fn(),
};

const possibles = ['second', 'third'];
const states = {
  first: mockedFirst,
  second: mockedSecond,
  third: mockedThird,
};

const model = {
  ...initialState,
  currrentStateName: mockedFirst.getName(),
};

describe('StateMachineHelpers',  () => {
  describe('calculateNextState()', () => {
    describe('Нет состояния на которое можно перейти', () => {
      beforeEach(() => {
        mockedFirst.canApply.mockClear();
        mockedSecond.canApply.mockClear();
        mockedThird.canApply.mockClear();

        mockedFirst.canApply.mockReturnValue(false);
        mockedSecond.canApply.mockReturnValue(false);
        mockedThird.canApply.mockReturnValue(false);
      });

      it('Возвращает undefined', () => {
        expect(
          calculateNextState(possibles, states, model)
        ).not.toBeDefined();
      });

      it(`Вызывает canApply() у состояний ${possibles}`, () => {
        calculateNextState(possibles, states, model)
        expect(mockedSecond.canApply).toHaveBeenCalledTimes(1);
        expect(mockedThird.canApply).toHaveBeenCalledTimes(1);

      });

      it(`Не вызывает canApply() у состояний вне списка ${possibles}`, () => {
        calculateNextState(possibles, states, model)
        expect(mockedFirst.canApply).not.toHaveBeenCalled();
      })
    });

    describe('Есть состояние на которое можно перейти', () => {
      beforeEach(() => {
        mockedFirst.canApply.mockClear();
        mockedSecond.canApply.mockClear();
        mockedThird.canApply.mockClear();

        mockedFirst.canApply.mockReturnValue(false);
      });

      it('Возврашает состояние на которое можно перейти', () => {
        mockedSecond.canApply.mockReturnValue(true);
        mockedThird.canApply.mockReturnValue(false);

        const newState1 = calculateNextState(possibles, states, model);
        expect(newState1).toBeDefined();
        expect(newState1.getName()).toEqual(mockedSecond.getName());

        // еще один кейс

        mockedSecond.canApply.mockReturnValue(false);
        mockedThird.canApply.mockReturnValue(true);

        const newState2 = calculateNextState(possibles, states, model);
        expect(newState2).toBeDefined();
        expect(newState2.getName()).toEqual(mockedThird.getName());
      });

      it(`Возвращает первое из списка ${possibles} если перейти можно на оба`, () => {
        mockedSecond.canApply.mockReturnValue(true);
        mockedThird.canApply.mockReturnValue(true);

        const newState = calculateNextState(possibles, states, model);
        expect(newState).toBeDefined();
        expect(newState.getName()).toEqual(mockedSecond.getName());
      });
    })
  });
});
