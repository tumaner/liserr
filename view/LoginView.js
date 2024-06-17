export default class LoginView {
	constructor(loginModel) {
		this.model = loginModel;

		this.variant = "none";
	}

	update() {
		if (this.model.currentAccount === null) {
			if (this.variant !== "unlogged") {
				const main = document.getElementsByTagName("main")[0];
				main.innerHTML = `
				<form method="post" action="javascript:;">
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" class="form-control" id="email" name="email" placeholder="Введіть ваш email" required>
					</div>
					<div class="form-group">
						<label for="password">Пароль</label>
						<input type="password" class="form-control" id="password" name="password" placeholder="Введіть ваш пароль" required>
					</div>
					<button type="submit" class="btn btn-primary mt-1">Увійти</button>
				</form>`;

				const form = document.getElementsByTagName("form")[0];
				form.addEventListener("submit", (e) => {
					const data = new FormData(form),
						email = data.get("email"),
						password = data.get("password");
					this.login(email, password);
				});
				this.variant = "unlogged";
			}
		}
		else {
			if (this.variant !== "logged") {
				const main = document.getElementsByTagName("main")[0];
				main.innerHTML = `
				<h2>Ви вже увійшли!</h2>
				<p>Якщо Ви хочете увійти в інший акаунт на цьому пристрої, <a id="logout" href="">вийдіть</a> з акаунту.</p>`;

				document.getElementById("logout").addEventListener("click", () => this.logout());
				this.variant = "logged";
			}
		}
	}
}