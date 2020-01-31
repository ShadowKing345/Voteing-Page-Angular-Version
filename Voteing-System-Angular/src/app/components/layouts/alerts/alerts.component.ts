import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { AlertItem } from "./alert-item/alert-item.component";
import { Subscription, timer, Observable } from "rxjs";
import { KeyItem } from "../../results/results.component";

@Component({
	selector: "app-alerts",
	templateUrl: "./alerts.component.html",
	styleUrls: ["./alerts.component.css"],
})
export class AlertsComponent implements OnInit, OnDestroy {
	@Input() alertEvents: Observable<AlertItem>;
	eventSub: Subscription;
	alerts: AlertItem[] = [];
	timerSub: Subscription;

	constructor() {}

	ngOnInit() {
		this.timerSub = timer(0, 1000).subscribe(ignore => {
			this.alerts.forEach(aleart => {
				aleart.timeout -= 1;
			});

			this.alerts = this.alerts.filter(aleart => {
				return aleart.timeout > 0;
			});
		});

		this.eventSub = this.alertEvents.subscribe(data => {
			if (this.alerts.push(data) > 4) this.alerts.shift();
		});
	}

	ngOnDestroy() {
		this.timerSub.unsubscribe();
		this.eventSub.unsubscribe();
	}
}
