export default class SignUpController {
	constructor(signUpModel, signUpView) {
		this.model = signUpModel;
		this.view = signUpView;

		const handlerUpdateView = this.view.update.bind(this.view),
			modelHandler = {
				get(t, p) {
					console.log("hi");
					if (typeof t[p] === "function") {
						return (...args) => {
							let res = t[p](...args);
							handlerUpdateView();
							t.saveAccounts();
							return res;
						};
					}
					else {
						return t[p];
					}
				}
			};
		this.model = new Proxy(this.model, modelHandler);

		this.view.login = this.login.bind(this);
		this.view.logout = this.logout.bind(this);

		this.view.update();
	}

	login(email, password) {
		if (typeof email !== "string" || email.length === 0) {
			return;
		}
		if (typeof password !== "string" || password.length === 0) {
			 return;
		}
		this.model.login(email, password);
	}
	logout() {
		this.model.logout();
	}
}