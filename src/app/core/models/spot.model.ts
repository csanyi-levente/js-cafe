import {SpotStatusEnum} from "./spot-status.enum";
import {OrderModel} from "./order.model";

export interface SpotModel {
  id: string;
  seats: number;
  status: SpotStatusEnum;
  orders: OrderModel[];
}
