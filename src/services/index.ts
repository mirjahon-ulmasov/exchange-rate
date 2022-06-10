import { IExchange } from "../types/types";

export const save_exchanges = (exchanges: IExchange[]) => {
  localStorage.setItem("exchanges", JSON.stringify(exchanges));
};

export const get_exchanges = (): IExchange[] | null => {
  return JSON.parse(localStorage.getItem("exchanges") || "null");
};
