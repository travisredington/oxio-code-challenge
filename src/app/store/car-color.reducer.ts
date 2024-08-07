import { createReducer, on } from "@ngrx/store";
import { CarData } from "../shared/models/car-data.model";
import { setCarData, updateCarData } from "./car-color.actions";

const initialState: CarData[] = [];

export const carDataReducer = createReducer(
  initialState,
  on(setCarData, (state, action) => {
    console.log('set state = ', state);
    return [...state, ...action.carData];
  }),
  on(updateCarData, (state, action) => {
    console.log('update state = ', state);
    return action.carData;
  })
);
