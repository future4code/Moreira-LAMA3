import { BaseDatabase } from "./BaseDatabase"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

export class CreateTables extends BaseDatabase{
   createTables = () => this.connection.raw(`
   CREATE TABLE IF NOT EXISTS BANDAS (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    music_genre VARCHAR(255) NOT NULL,
    responsible VARCHAR(255) UNIQUE NOT NULL 
  );
      
  CREATE TABLE IF NOT EXISTS SHOWS (
    id VARCHAR(255) PRIMARY KEY,
    week_day VARCHAR(255) NOT NULL,
    start_time INT NOT NULL,
    end_time INT NOT NULL,
    band_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(band_id) REFERENCES BANDAS(id)
  );

  CREATE TABLE IF NOT EXISTS USUARIOS (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
  );
   `)
   .then(() => { console.log("Tables created successfully!!") })
   .catch(printError)

   closeConnection = () => { this.connection.destroy() }

}
const migrations = new CreateTables()

migrations.createTables()
   .finally(migrations.closeConnection)