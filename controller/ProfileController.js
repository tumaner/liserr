export default class ProfileController {
	constructor(profileModel, profileView) {
		this.model = profileModel;
		this.view = profileView;

		const handlerUpdateView = this.view.update.bind(this.view),
			modelHandler = {
				get(t, p) {
					if (typeof t[p] === "function") {
						return (...args) => {
							let res = t[p](...args);
							handlerUpdateView();
							return res;
						};
					}
					else {
						return t[p];
					}
				}
			};
		this.model = new Proxy(this.model, modelHandler);

		this.view.update();
	}
}