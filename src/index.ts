import { BandaBusiness } from "./business/BandaBusiness";
import { ShowBusiness } from "./business/showBusiness";
import { UserBusiness } from "./business/UserBusiness";
import {app} from "./controller/app"
import { BandaController } from "./controller/BandaController";
import { ShowController } from "./controller/showController";
import { UserController } from "./controller/UserController"
import { BandaDatabase } from "./data/BandaDatabase";
import { ShowDatabase } from "./data/ShowDatabase";
import { UserDatabase } from "./data/UserDatabase";

const userBusiness = new UserBusiness(new UserDatabase)

const userController = new UserController(userBusiness);

const bandaBusiness = new BandaBusiness(new BandaDatabase)

const bandaController = new BandaController(bandaBusiness);

const showBusiness = new ShowBusiness(new ShowDatabase)

const showController = new ShowController(showBusiness);


app.post("/user/signup", userController.createUser)
app.post("/login", userController.login)
app.post("/banda/signup", bandaController.createBanda)
app.get("/banda/:id", bandaController.getBanda)
app.post("/show", showController.createShow)
app.get("/show/:dia", showController.getShow)

