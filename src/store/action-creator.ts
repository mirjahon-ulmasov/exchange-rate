import { EditToCodeByCIdAndEId } from "./../types/types";
import { ActionTypes } from "../types/action-types";
import {
  AddExchange,
  AddToByEId,
  RemoveToByCIdAndEId,
  EditFromCodeByEId,
  EditFromValueByEId,
} from "../types/types";

export const addExchange = (): AddExchange => {
  return {
    type: ActionTypes.ADD_EXCHANGE,
  };
};

export const addCurrencyByEId = (exchangeId: string): AddToByEId => {
  return {
    type: ActionTypes.ADD_TO_BY_EID,
    payload: exchangeId,
  };
};

export const removeCurrencyByCIdAndEId = (
  currencyId: string,
  exchangeId: string
): RemoveToByCIdAndEId => {
  return {
    type: ActionTypes.REMOVE_TO_BY_CID_AND_EID,
    payload: {
      currencyId,
      exchangeId,
    },
  };
};

export const editToCodeByCIdAndEId = (
  code: string,
  currencyId: string,
  exchangeId: string
): EditToCodeByCIdAndEId => {
  return {
    type: ActionTypes.EDIT_TO_CODE_BY_CID_AND_EID,
    payload: {
      code,
      currencyId,
      exchangeId,
    },
  };
};

export const editFromCodeByEId = (
  code: string,
  exchangeId: string
): EditFromCodeByEId => {
  return {
    type: ActionTypes.EDIT_FROM_CODE_BY_EID,
    payload: {
      code,
      exchangeId,
    },
  };
};

export const editFromValueByEId = (
  value: number,
  exchangeId: string
): EditFromValueByEId => {
  return {
    type: ActionTypes.EDIT_FROM_VALUE_BY_EID,
    payload: {
      value,
      exchangeId,
    },
  };
};
