import Account from "./Account.js";

export default class SignUpModel {
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
		localStorage.setItem("allAccounts", JSON.stringify(Object.fromEntries(this.allAccounts.entries())));
		if (this.currentAccount !== null) {
			localStorage.setItem("currentAccount", this.currentAccount.email);
		}
		else {
			localStorage.removeItem("currentAccount");
		}
	}

	create(email, password, name, birthday, sex, clocks) {
		this.allAccounts.set(email, new Account(email, password, name, birthday, sex, clocks));
	}
	logout() {
		this.currentAccount = null;
	}
}