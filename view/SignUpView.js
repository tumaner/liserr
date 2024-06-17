export default class SignUpView {
	constructor(signUpModel) {
		this.model = signUpModel;

		this.variant = "none";
	}

	update() {
		if (this.model.currentAccount === null) {
			if (this.variant !== "unlogged") {
				const main = document.getElementsByTagName("main")[0];
				main.innerHTML = `
				<form method="post" action="javascript:;">
					<div class="form-group">
						<label for="name">Ім’я</label>
						<input type="text" class="form-control" id="name" name="name" placeholder="Введіть ваше ім’я">
					</div>
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" class="form-control" id="email" name="email" placeholder="Введіть ваш email" required>
					</div>
					<div class="form-group">
						<label for="password">Пароль</label>
						<input type="password" class="form-control" id="password" name="password" placeholder="Введіть ваш пароль" required>
					</div>
					<div class="form-group">
						<label for="sex">Стать</label>
						<select class="form-control" id="sex" name="sex">
							<option>не хочу казати</option>
							<option>чоловіча</option>
							<option>жіноча</option>
						</select>
					</div>
					<div class="form-group">
						<label for="birthday">Дата народження</label>
						<input type="date" class="form-control" id="birthday" name="birthday">
					</div>
					<button type="submit" class="btn btn-primary mt-1">Зареєструватися</button>
				</form>`;

				const form = document.getElementsByTagName("form")[0];
				form.addEventListener("submit", (e) => {
					const data = new FormData(form),
						email = data.get("email"),
						password = data.get("password"),
						name = data.get("name"),
						birthday = data.get("birthday"),
						sex = data.get("sex");
					this.signUp(email, password, name, birthday, sex);
				});
				this.variant = "unlogged";
			}
		}
		else {
			if (this.variant !== "logged") {
				const main = document.getElementsByTagName("main")[0];
				main.innerHTML = `
				<h2>Ви вже зареєстровані!</h2>
				<p>Якщо Ви хочете зареєструватися на цьому пристрої ще раз, <a id="logout" href="">вийдіть</a> з акаунту.</p>`;

				document.getElementById("logout").addEventListener("click", () => this.logout());
				this.variant = "logged";
			}
		}
	}
}