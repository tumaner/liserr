import Clock from "./Clock.js";
import Account from "./Account.js";

export default class ClocksModel {
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
		let clocks = [];
		if (currentAccount !== null) {
			clocks = currentAccount.clocks
		}

		this.allAccounts = allAccounts;
		this.currentAccount = currentAccount;
		this.clocks = clocks;
	}

	logClocks() {
		for (let i = 0; i < this.clocks.length; i++) {
			console.log(this.clocks[i]);
		}
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

	clock(index) { return this.clocks[index]; }
	getActiveClocks() {
		const clocks = [];
		for (let i = 0; i < this.clocks.length; i++) {
			if (this.clocks[i].isActive) {
				clocks.push(this.clocks[i]);
			}
		}
		return clocks;
	}

	add(index, newClock) {
		this.clocks.splice(index, 0, newClock);
	}
	delete(index) {
		this.clocks.splice(index, 1);
	}
	rename(index, newName) {
		this.clocks[index].name = newName;
	}
	toggle(index) {
		this.clocks[index].isActive = !this.clocks[index].isActive;
	}
	setIsActive(index, state) {
		this.clocks[index].isActive = state;
	}
	setTime(index, newTime) {
		this.clocks[index].time = newTime;
	}
	setDate(index, newDate) {
		this.clocks[index].date = newDate;
	}
	toggleIsRepeated(index) {
		this.clocks[index].isRepeated = !this.clocks[index].isRepeated;
	}
	setIsRepeated(index, state) {
		this.clocks[index].isRepeated = state;
	}
	toggleDay(index, day) {
		this.clocks[index].days[day] = !this.clocks[index].days[day];
	}
	setDays(index, days) {
		this.clocks[index].days = days;
	}
}