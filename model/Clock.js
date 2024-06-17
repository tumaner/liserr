export default class Clock {
	constructor(date, time, isActive, name, isRepeated, days) {
		this.name = name;
		this.date = date;
		this.time = time;
		this.isActive = isActive;
		this.isRepeated = isRepeated;
		this.days = days;
	}
}