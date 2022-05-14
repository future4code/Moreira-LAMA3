export enum SHOW_ROLES {
  SEXTA = "SEXTA",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO"
}

export type FindByShowBanda = {
  id: string;
  week_day: SHOW_ROLES;
  start_time: number;
  end_time: number;
  band_id: string;
}[];

export type Show = {
  week_day: SHOW_ROLES;
  start_time: number;
  end_time: number;
  band_id: string;
}



