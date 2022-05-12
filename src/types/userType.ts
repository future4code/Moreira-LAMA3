export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export type User = {
  name: string
	email: string
	password: string
	role?: USER_ROLES
}

export type login = {
	email:string
	password:string
}
	

export type FindByEmailResponse = {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: USER_ROLES;
}[];
