import Clock from "../model/Clock.js";
import Account from "../model/Account.js";
import ClocksModel from "../model/ClocksModel.js"
import ClocksView, {timeStringFromDate, dateStringFromDate} from "../view/ClocksView.js"

export default class ClocksController {
	constructor(clocksModel, clocksView) {
        this.model = clocksModel;
        this.view = clocksView;

		// handlerUpdateView "прив'язаний" до this.view,
		// таким чином ця функція буде викликатись як метод this.view.
		// modelHandler визначає метод handler.get(...),
		// який після створення проксі this.model,
		// має спрацьовувати коли буде виконуватись читання полів
		// this.model. Якщо поле є методом (typeof === "function"),
		// замість безпосереднього метода, буде повертатись
		// обгорнутий виклик цієї функції, який після закінчення виклику,
		// буде викликати handlerUpdateView для оновлення сайту.
		const handlerUpdateView = this.view.update.bind(this.view),
			modelHandler = {
				get(t, p, r) {
					// console.log("handler.get()");
					if (typeof t[p] === "function") {
						// console.log("returning wrapper");
						return (...args) => {
							let res = t[p](...args);
							handlerUpdateView();
							//t.logClocks();
							t.saveAccounts();
							return res;
						};
					}
					else {
						// console.log("returning object");
						return t[p];
					}
				}
			};
		this.model = new Proxy(this.model, modelHandler);

		this.view.createClock = this.createClock.bind(this);
		this.view.addClockBefore = this.addClockBefore.bind(this);
		this.view.addClockAfter = this.addClockAfter.bind(this);
		this.view.deleteClock = this.deleteClock.bind(this);
		this.view.renameClock = this.renameClock.bind(this);
		this.view.toggleClock = this.toggleClock.bind(this);
		this.view.setClockTime = this.setClockTime.bind(this);
		this.view.setClockDate = this.setClockDate.bind(this);
		this.view.toggleClockIsRepeated = this.toggleClockIsRepeated.bind(this);
		this.view.toggleClockDay = this.toggleClockDay.bind(this);

		this.view.update();

		setInterval(this.checkClocks.bind(this), 1000);
    }

	logClocks() {
		this.model.log();
	}
	checkClocks() {
		for (let i = 0; i < this.model.clocks.length; i++) {
			const clock = this.model.clocks[i];

			if (!clock.isActive) { continue; }
			if (clock.isRepeated) {
				const now = new Date();
				let day = now.getDay() - 1;
				if (day < 0) { day = 6; }
				if (clock.days[day]) {
					const target = new Date(),
						hours = Number(clock.time.substr(0, 2)),
						minutes = Number(clock.time.substr(3, 2));
					
					target.setHours(hours, minutes, 0);
					if (Date.now() >= target.getTime() && (Date.now() - 20000 <= target.getTime())) {
						this.view.alert(`Будильник ${clock.name} спрацював!`);
						this.model.toggle(i);
					}
				}
			}
			else {
				const target = new Date(clock.date + " " + clock.time);
				if (Date.now() >= target.getTime()) {
					this.view.alert(`Будильник ${clock.name} спрацював!`);
					this.model.toggle(i);
				}
			}
		}
	}
	createClock() {
		const now = Date.now(),
			in10min = new Date(now - now % 60000 + 600000),
			
			time = timeStringFromDate(in10min),
			date = dateStringFromDate(in10min);

		this.model.add(0, new Clock(date, time, true, "Новий будильник", false, [0, 0, 0, 0, 0, 0, 0]));
	}
	addClockBefore(index, newClock) {
		if (newClock === undefined) {
			const now = Date.now(),
				in10min = new Date(now - now % 60000 + 600000),
				
				time = timeStringFromDate(in10min),
				date = dateStringFromDate(in10min);

			newClock = new Clock(date, time, true, "Новий будильник", false, [0, 0, 0, 0, 0, 0, 0]);
		}
		this.model.add(index, newClock);
	}
	addClockAfter(index, newClock) {
		if (newClock === undefined) {
			const now = Date.now(),
				in10min = new Date(now - now % 60000 + 600000),
				
				time = timeStringFromDate(in10min),
				date = dateStringFromDate(in10min);

			newClock = new Clock(date, time, true, "Новий будильник", false, [0, 0, 0, 0, 0, 0, 0]);
		}
		this.model.add(index + 1, newClock);
	}
	deleteClock(index) {
		this.model.delete(index);
	}
	renameClock(index, newName) {
		this.model.rename(index, newName);
	}
    toggleClock(index) {
		this.model.toggle(index);
	}
	setClockTime(index, newTime) {
		this.model.setTime(index, newTime);
	}
	setClockDate(index, newDate) {
		this.model.setDate(index, newDate);
	}
	toggleClockIsRepeated(index) {
		this.model.toggleIsRepeated(index);
	}
	toggleClockDay(index, day) {
		if (typeof day === "number") {
			if (day < 0 || day > 6) {
				return;
			}
		}
		else {
			return;
		}
		this.model.toggleDay(index, day);
	}
}