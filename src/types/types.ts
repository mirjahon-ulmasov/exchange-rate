import { ActionTypes } from "./action-types";

export interface IFromCurrency {
  code: string;
  value: number;
}

export interface IToCurrency {
  id: string;
  code: string;
}

export interface IExchange {
  id: string;
  from: IFromCurrency;
  to: IToCurrency[];
}

// Add Exchange
export interface AddExchange {
  type: ActionTypes.ADD_EXCHANGE;
  // payload: IExchange;
}

// Add TO currency by ExchangeId
export interface AddToByEId {
  type: ActionTypes.ADD_TO_BY_EID;
  payload: string;
}

// Remove TO[] currency by CurrencyId and ExchangeId
export interface RemoveToByCIdAndEId {
  type: ActionTypes.REMOVE_TO_BY_CID_AND_EID;
  payload: {
    currencyId: string;
    exchangeId: string;
  };
}

// Edit TO[] currency code by CurrencyId and ExchangeId
export interface EditToCodeByCIdAndEId {
  type: ActionTypes.EDIT_TO_CODE_BY_CID_AND_EID;
  payload: {
    code: string;
    currencyId: string;
    exchangeId: string;
  };
}

// Edit FROM currency code by ExchangeId
export interface EditFromCodeByEId {
  type: ActionTypes.EDIT_FROM_CODE_BY_EID;
  payload: {
    code: string;
    exchangeId: string;
  };
}

// Edit FROM currency value by ExchangeId
export interface EditFromValueByEId {
  type: ActionTypes.EDIT_FROM_VALUE_BY_EID;
  payload: {
    value: number;
    exchangeId: string;
  };
}

export type Action =
  | AddExchange
  | AddToByEId
  | RemoveToByCIdAndEId
  | EditToCodeByCIdAndEId
  | EditFromCodeByEId
  | EditFromValueByEId;
