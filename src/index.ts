import { UserBusiness } from "./business/UserBusiness";
import {app} from "./controller/app"
import { UserController } from "./controller/UserController"
import { UserDatabase } from "./data/UserDatabase";

const userBusiness = new UserBusiness(new UserDatabase)

const userController = new UserController(userBusiness);



app.post("/user/signup", userController.createUser)
