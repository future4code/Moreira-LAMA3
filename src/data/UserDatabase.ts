import { FindByEmailResponse, User } from "../types/userType";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
  protected TABLE_NAME = "USUARIOS"

  create =  async (user: User) => {
    try{
      await BaseDatabase.connection(this.TABLE_NAME).insert(user)
    } catch(error: any){
      throw new Error(error.sqlMessage || error.message)
    }
  }
    
    findUserByEmail = async (email: string)=>{
      try {
          const user : FindByEmailResponse= await BaseDatabase.connection(this.TABLE_NAME)
          .select('*')
          .where({ email })
      return user[0];
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }

    findUserById = async (id: string)=>{
      try {
          const userRole = await BaseDatabase.connection.raw(`
          SELECT role FROM USUARIOS 
          WHERE id='${id}'
          `)

          console.log(userRole[0][0].role)
      return userRole[0][0].role;

      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
}