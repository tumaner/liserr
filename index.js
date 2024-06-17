import model from "./model/ClocksModel.js"
import view from "./view/ClocksView.js"
import controller from "./controller/ClocksController.js"

const clocksModel = new model(),
	clocksView = new view(clocksModel),
	clocksController = new controller(clocksModel, clocksView);