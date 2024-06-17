import model from "./model/LoginModel.js"
import view from "./view/LoginView.js"
import controller from "./controller/LoginController.js"

const loginModel = new model(),
	loginView = new view(loginModel),
	loginController = new controller(loginModel, loginView);