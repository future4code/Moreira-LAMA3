import { BaseDatabase } from "./BaseDatabase";
import dotenv from "dotenv";

dotenv.config();

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }
console.log(BaseDatabase.connection.client.config);

const createTables = () => BaseDatabase.connection.raw(`
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
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)
   
   
   const closeConnection = () => { BaseDatabase.connection.destroy() }
   
   createTables()
     .finally(closeConnection) 