import { IExchange } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const save_exchanges = (exchanges: IExchange[]) => {
  localStorage.setItem("exchanges", JSON.stringify(exchanges));
};

export const get_exchanges = (): IExchange[] | null => {
  return JSON.parse(localStorage.getItem("exchanges") || "null");
};
