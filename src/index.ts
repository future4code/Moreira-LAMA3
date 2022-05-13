import { BandaBusiness } from "./business/BandaBusiness";
import { UserBusiness } from "./business/UserBusiness";
import {app} from "./controller/app"
import { BandaController } from "./controller/BandaController";
import { UserController } from "./controller/UserController"
import { BandaDatabase } from "./data/BandaDatabase";
import { UserDatabase } from "./data/UserDatabase";

const userBusiness = new UserBusiness(new UserDatabase)

const userController = new UserController(userBusiness);

const bandaBusiness = new BandaBusiness(new BandaDatabase)

const bandaController = new BandaController(bandaBusiness);


app.post("/user/signup", userController.createUser)
app.post("/login", userController.login)

app.post("/banda/signup", bandaController.createBanda)
