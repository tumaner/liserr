export default class ProfileView {
	constructor(profileModel) {
		this.model = profileModel;

		this.variant = "none";
	}

	update() {
		if (this.model.currentAccount === null) {
			if (this.variant !== "unlogged") {
				const main = document.getElementsByTagName("main")[0];
				main.innerHTML = `
				<h2>Ви не увійшли в акаунт!</h2>
				<p>Якщо Ви хочете переглянути профіль, <a href="./login.html">увійдіть</a> в акаунту.</p>
				<p>Якщо Ви не маєте акаунта, Ви можете його створити <a href="./sign_up.html">тут</a>.</p>`;
				
				this.variant = "unlogged";
			}
		}
		else {
			if (this.variant !== "logged") {
				const main = document.getElementsByTagName("main")[0];
				main.innerHTML = `
				<table class="table table-striped">
					<tr>
						<th>Ім’я</th>
						<td>${this.model.currentAccount.name}</td>
					</tr>
					<tr>
						<th>Email</th>
						<td>${this.model.currentAccount.email}</td>
					</tr>
					<tr>
						<th>Стать</th>
						<td>${this.model.currentAccount.sex}</td>
					</tr>
					<tr>
						<th>День народження</th>
						<td>${this.model.currentAccount.birthday}</td>
					</tr>
				</table>`;

				this.variant = "logged";
			}
		}
	}
}