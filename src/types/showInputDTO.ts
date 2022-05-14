import { SHOW_ROLES } from "./showType"


export type ShowInputDTO = {
  week_day: SHOW_ROLES;
  start_time: number;
  end_time: number;
  band_id: string;
}
