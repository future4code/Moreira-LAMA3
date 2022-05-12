import { BaseDatabase } from "./BaseDatabase";


export class LoginUserDatabase extends BaseDatabase {

    findByEmail = async(email:string):Promise<any>=>{
        const user = await this.connection.raw(`
        SELECT * FROM Labook_User
        WHERE email = "${email}";
    `)
        return user[0]
    }
}
