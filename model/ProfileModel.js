import Account from "./Account.js";

export default class ProfileModel {
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

		this.currentAccount = currentAccount;
	}
}