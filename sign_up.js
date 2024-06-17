import model from "./model/SignUpModel.js"
import view from "./view/SignUpView.js"
import controller from "./controller/SignUpController.js"

const signUpModel = new model(),
	signUpView = new view(signUpModel),
	signUpController = new controller(signUpModel, signUpView);