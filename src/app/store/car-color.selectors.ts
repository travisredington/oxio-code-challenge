import { CarData } from "../shared/models/car-data.model";

export const selectCarData = (state: { carData: CarData[]}) => state.carData;

