import { createAction, props } from "@ngrx/store";
import { CarData } from "../shared/models/car-data.model";

export const setCarData = createAction(
  '[CarColor] Set',
  props<{carData: CarData[]}>()
);

export const updateCarData = createAction(
  '[CarColor] Update',
  props<{carData: CarData[]}>()
);
