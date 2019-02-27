const initialModel = require('../state-machine/model');
const Box = require('./box');
const FirstState = require('./first-state');
const SecondState = require('./second-state');
const ThirdState = require('./third-state');
const FourthState = require('./fourth-state');

const firstState = new FirstState();
const secondState = new SecondState();
const thirdState = new ThirdState();
const fourthState = new FourthState();

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

describe('State Pattern',  () => {
  describe('Сценарий', () => {
    describe('first состояние', () => {
      it('create() создает заявку и переводит в статус second', () => {
        const box = new Box({ ...initialModel }, FirstState);
        box.create();
        expect(box.getState().getName()).toEqual(secondState.getName())
      })
    });

    describe('second состояние', () => {
      it('fillByUserData() переводит в статус second если данных не хватает', () => {
        const box = new Box({ ...initialModel }, SecondState);
        box.fillByUserData();
        expect(box.getState().getName()).toEqual(secondState.getName())
      })

      it('fillByUserData() переводит в статус third если всех данных хватает', () => {
        const box = new Box({ ...initialModel }, SecondState);
        box.fillByUserData({
          ...initialModel,
          corporate: {
            inn: 123,
            ogrn: 321,
            name: 'name',
          },
          request: {
            accountNumber: 'accountNumber',
          },
        });
        expect(box.getState().getName()).toEqual(thirdState.getName())
      })
    });

    describe('third состояние', () => {
      it('fillByEgrData() не меняет статус если данных не хватает', () => {
        const model = {
          ...initialModel,
          corporate: {
            inn: 123,
            ogrn: 321,
            name: null,
          },
          request: {
            accountNumber: null,
          },
        };
        const box = new Box(model, ThirdState);
        box.fillByEgrData();
        expect(box.getState().getName()).toEqual(thirdState.getName())
      });

      it('fillByEgrData() переводит в статус fourth если все данные присутствуют', () => {
        const model = {
          ...initialModel,
          corporate: {
            inn: 123,
            ogrn: 321,
            name: 'name',
          },
          request: {
            accountNumber: 'accountNumber',
          },
        };
        const box = new Box(model, ThirdState);
        box.fillByEgrData();
        expect(box.getState().getName()).toEqual(fourthState.getName());
      })
    });

  });

});
