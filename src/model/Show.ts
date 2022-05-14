import { SHOW_ROLES } from "../types/showType";


export default class Shows {
  constructor(
  private id: string,
  private week_day: SHOW_ROLES,
  private start_time: number,
  private name: string,
  private end_time: number,
  private band_id: string
  ){}
};