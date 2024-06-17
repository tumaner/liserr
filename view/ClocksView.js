export function timeStringFromDate(date) {
	const hour = date.getHours(), min = date.getMinutes();
	let timeString = "";
	if (hour < 10 ) { timeString += "0"; }
	timeString += hour + ":";
	if (min < 10 ) { timeString += "0"; }
	timeString += min;
	return timeString;
}
export function dateStringFromDate(date) {
	const year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
	let dateString = year + "-";
	if (month < 10 ) { dateString += "0"; }
	dateString += month + "-";
	if (day < 10 ) { dateString += "0"; }
	dateString += day;
	return dateString;
}

export default class ClocksView {
	constructor(clocksModel) {
		this.model = clocksModel;
	}

	alert(text) {
		alert(text);
	}

	addBeforeHTML() {
		return `
		<div class="row">
			<button class="add-clock-before btn btn-sm btn-success"></button>
		</div>`;
	}
	addAfterHTML() {
		return `
		<div class="row">
			<button class="add-clock-after btn btn-sm btn-success"></button>
		</div>`;
	}
	clockHTML(index, clock) {
		return `
		<div class="row">
			<div class="col">
				<div class="input-group">
					<button id="${index}-delete" class="btn btn-danger">X</button>

					<label for="${index}-text" class="input-group-text">Назва</label>
					<input type="text" id="${index}-text" class="form-control" value="${clock.name}">

					<input type="checkbox" id="${index}-active" class="btn-check" autocomplete="off" ${clock.isActive ? "checked" : ""}>
					<label for="${index}-active" class="btn ${clock.isActive ? "btn-success" : "btn-danger"}">${clock.isActive ? "Вимкнути" : "Увімкнути"}</label>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="input-group">
					<label for="${index}-time" class="input-group-text">Час</label>
					<input type="time" id="${index}-time" class="form-control" value="${clock.time}">
					<label for="${index}-date" class="input-group-text">Дата</label>
					<input type="date" id="${index}-date" class="form-control" value="${clock.date}">
					
					<input type="checkbox" id="${index}-repeat" class="btn-check" autocomplete="off" ${clock.isRepeated ? "checked" : ""}>
					<label for="${index}-repeat" class="btn btn-success">Повторювати</label>

					<input type="checkbox" id="${index}-mon" class="btn-check" autocomplete="off" ${clock.days[0] ? "checked" : ""}>
					<label for="${index}-mon" class="btn btn-outline-success">Пн</label>
					<input type="checkbox" id="${index}-tue" class="btn-check" autocomplete="off" ${clock.days[1] ? "checked" : ""}>
					<label for="${index}-tue" class="btn btn-outline-success">Вт</label>
					<input type="checkbox" id="${index}-wed" class="btn-check" autocomplete="off" ${clock.days[2] ? "checked" : ""}>
					<label for="${index}-wed" class="btn btn-outline-success">Ср</label>
					<input type="checkbox" id="${index}-thu" class="btn-check" autocomplete="off" ${clock.days[3] ? "checked" : ""}>
					<label for="${index}-thu" class="btn btn-outline-success">Чт</label>
					<input type="checkbox" id="${index}-fri" class="btn-check" autocomplete="off" ${clock.days[4] ? "checked" : ""}>
					<label for="${index}-fri" class="btn btn-outline-success">Пт</label>
					<input type="checkbox" id="${index}-sat" class="btn-check" autocomplete="off" ${clock.days[5] ? "checked" : ""}>
					<label for="${index}-sat" class="btn btn-outline-success">Сб</label>
					<input type="checkbox" id="${index}-sun" class="btn-check" autocomplete="off" ${clock.days[6] ? "checked" : ""}>
					<label for="${index}-sun" class="btn btn-outline-success">Нд</label>
				</div>
			</div>
		</div>`;
	}

	update() {
		const clockList = document.getElementById("clocks");
		clockList.innerHTML = "";

		if (this.model.clocks.length === 0) {
			clockList.innerHTML = `
			<li class="list-group-item">
				<div class="d-flex justify-content-center">
					<button id="create-clock-btn" class="btn btn-success mx-auto">Створити будильник</button>
				</div>
			</li>`;

			document.getElementById("create-clock-btn").addEventListener("click", () => {this.createClock();});
		}
		else {
			clockList.innerHTML += `
			<li class="list-group-item rows-gap">
				${this.addBeforeHTML()}
				${this.clockHTML(0, this.model.clocks[0])}
				${this.addAfterHTML()}
			</li>
			`;

			for (let i = 1; i < this.model.clocks.length; i++) {
				clockList.innerHTML += `
				<li class="list-group-item rows-gap">
					${this.clockHTML(i, this.model.clocks[i])}
					${this.addAfterHTML()}
				</li>
				`;
			}

			document.getElementsByClassName("add-clock-before")[0].addEventListener("click", () => {this.addClockBefore(0);});
			const addClockAfterButtons = document.getElementsByClassName("add-clock-after");
			for (let i = 0; i < this.model.clocks.length; i++) {
				const index = i;
				document.getElementById(`${i}-delete`).addEventListener("click", () => {this.deleteClock(index);});
				document.getElementById(`${i}-text`).addEventListener("change", (e) => {this.renameClock(index, e.target.value)});
				document.getElementById(`${i}-active`).addEventListener("change", () => {this.toggleClock(index);});
				document.getElementById(`${i}-time`).addEventListener("change", (e) => {this.setClockTime(index, e.target.value);});
				document.getElementById(`${i}-date`).addEventListener("change", (e) => {this.setClockDate(index, e.target.value);});
				document.getElementById(`${i}-repeat`).addEventListener("change", () => {this.toggleClockIsRepeated(index);});
				document.getElementById(`${i}-mon`).addEventListener("change", () => {this.toggleClockDay(index, 0);});
				document.getElementById(`${i}-tue`).addEventListener("change", () => {this.toggleClockDay(index, 1);});
				document.getElementById(`${i}-wed`).addEventListener("change", () => {this.toggleClockDay(index, 2);});
				document.getElementById(`${i}-thu`).addEventListener("change", () => {this.toggleClockDay(index, 3);});
				document.getElementById(`${i}-fri`).addEventListener("change", () => {this.toggleClockDay(index, 4);});
				document.getElementById(`${i}-sat`).addEventListener("change", () => {this.toggleClockDay(index, 5);});
				document.getElementById(`${i}-sun`).addEventListener("change", () => {this.toggleClockDay(index, 6);});
				addClockAfterButtons[i].addEventListener("click", () => {this.addClockAfter(index);});
			}
		}
	}
}