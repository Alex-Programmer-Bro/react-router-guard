import { RouteObject } from "react-router-dom";
import { Guard } from "./guard";

export const guardWrapper = (routes: RouteObject[]) => {
  return routes.map((item) => {
    item.element = <Guard>{item.element}</Guard>;
    return item;
  });
};
