import model from "./model/ProfileModel.js"
import view from "./view/ProfileView.js"
import controller from "./controller/ProfileController.js"

const profileModel = new model(),
	profileView = new view(profileModel),
	profileController = new controller(profileModel, profileView);