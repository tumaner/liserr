import Account from "./Account.js";

export default class LoginModel {
	constructor() {
		let allAccounts = localStorage.getItem("allAccounts");
		if (allAccounts === null) {
			allAccounts = new Map();
		}
		else {
			allAccounts = new Map(Object.entries(JSON.parse(allAccounts)));
		}
		let currentAccount = localStorage.getItem("currentAccount");
		if (currentAccount !== null) {
			currentAccount = allAccounts.get(currentAccount);
			if (currentAccount === undefined) {
				currentAccount = null;
			}
		}

		this.allAccounts = allAccounts;
		this.currentAccount = currentAccount;
	}
	
	saveAccounts() {
		console.log("hi??");
		localStorage.setItem("allAccounts", JSON.stringify(Object.fromEntries(this.allAccounts.entries())));
		console.log(this, this.currentAccount);
		if (this.currentAccount !== null) {
			localStorage.setItem("currentAccount", this.currentAccount.email);
		}
		else {
			localStorage.removeItem("currentAccount");
		}
		console.log(this.allAccounts, this.currentAccount);
	}

	login(email, password) {
		if (this.allAccounts.has(email) && this.allAccounts.get(email).password === password) {
			this.currentAccount = this.allAccounts.get(email);
		}
	}
	logout() {
		this.currentAccount = null;
	}
}