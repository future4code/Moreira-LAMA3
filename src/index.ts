import {app} from "./controller/app"
import { UserContoller } from "./controller/UserController"


const userController = new UserContoller

app.post("/", userController.create)
