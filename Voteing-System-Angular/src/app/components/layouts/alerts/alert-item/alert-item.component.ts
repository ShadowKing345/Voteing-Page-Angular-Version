import { Component, OnInit, Input } from "@angular/core";

export class AlertItem {
	type: number;
	message: string;
	timeout: number;
}

@Component({
	selector: "app-alert-item",
	templateUrl: "./alert-item.component.html",
})
export class AlertItemComponent implements OnInit {
	@Input() alert: AlertItem;

	constructor() {}

	ngOnInit() {}

	setAlertTypeDivClass() {
		return {
			warning: this.alert.type !== 2,
			information: this.alert.type === 2,
		};
	}
}
