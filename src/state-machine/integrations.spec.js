const initialModel = require('./model');
const StateMachine = require('./state-machine');
const FirstState = require('./first-state');
const SecondState = require('./second-state');
const ThirdState = require('./third-state');
const FourthState = require('./fourth-state');
const ErrorState = require('./error-state');

const firstState = new FirstState();
const secondState = new SecondState();
const thirdState = new ThirdState();
const fourthState = new FourthState();
const errorState = new ErrorState();

jest.useFakeTimers();

/**
 * Для тестов представим, что
 * first - первый статус с пустыми данными
 * second - второй статус для наполнения данными (имеет свой обязательный объем данных)
 * third - асинхронный статус, типа в его фоне выполняется работа
 * fourth - последний статус завершающий
 * error - ошибка если где-то что-то пошло не так
 *
 */

const states = {
  error: new ErrorState(),
  first: new FirstState(),
  second: new SecondState(),
  third: new ThirdState(),
  fourth: new FourthState(),
};

const transitions = {
  first: ['second', 'error'],
  second: ['third', 'error'],
  third: ['fourth', 'error'],
  fourth: ['fourth'],
};

describe('StateMachine',  () => {
  describe('Сценарий', () => {
    it('Из first попадаем в second при первом выполнении', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        currentStateName: firstState.getName(),
      }

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(secondState.getName())
    });
    
    it('Из second попадаем в second если данных не хватает', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        request: {
          accountNumber: null,
        },
        corporate: {
          name: "Existing Name",
        },
        currentStateName: secondState.getName(),
      };

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(secondState.getName())
    })

    it('Из second попадаем в third если с данными все ок', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        request: {
          accountNumber: 'accountNumber',
        },
        corporate: {
          inn: 123,
          ogrn: 123,
          name: "Existing Name",
        },
        currentStateName: secondState.getName(),
      };

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(thirdState.getName())
    })


    it('Ждем в third, если активный статус не выпускает, асинхронная работа', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        corporate: {
          ...initialModel.corporate,
          name: "Existing Name",
        },
        currentStateName: secondState.getName(),
      };

      [1,2,3].forEach( () =>
        expect(
          controller.handle(incomeModel).getName()
        ).toEqual(thirdState.getName())
      )
    })

    it('И если асинхронная работа закончилась с ошибкой, то попадаем в Error', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        corporate: {
          name: 'name',
          inn: 123,
          ogrn: 321
        },
        meta: {
          integrationHasError: true,
        },
        currentStateName: secondState.getName(),
      };

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(errorState.getName())
    })

    it('Из Error нельзя выйти', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        currentStateName: errorState.getName(),
        meta: {
          integrationHasError: false,
        }
      };

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(errorState.getName())
    })

    it('Если в third асинхронщина прошла отлично, то переходим в fourth', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        currentStateName: thirdState.getName(),
        meta: {
          asyncIntegraionsWasDone: true,
        }
      };

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(fourthState.getName())
    });
    it('Конечное состояние fourth не меняется', () => {
      const controller = new StateMachine(states, transitions);
      const incomeModel = {
        ...initialModel,
        currentStateName: fourthState.getName(),
        meta: {
          asyncIntegraionsWasDone: true,
        }
      };

      expect(
        controller.handle(incomeModel).getName()
      ).toEqual(fourthState.getName())
    });

  });

});
