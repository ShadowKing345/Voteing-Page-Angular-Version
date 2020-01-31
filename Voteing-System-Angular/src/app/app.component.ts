import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { AlertItem } from "./components/layouts/alerts/alert-item/alert-item.component";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app-component.css"],
})
export class AppComponent {
	eventSubjust: Subject<AlertItem> = new Subject<AlertItem>();

	onActivate(elementRef) {
		elementRef.networkError.subscribe(event => {
			console.log(event);
			window.alert(
				"An unknow error has occured and has resulted in this page not being able to display properly.\n" +
					"Dont worry we have a crack team of monkeys working on it... somehow..."
			);
		});

		elementRef.onAddAlertEvent.subscribe(event => {
			this.eventSubjust.next(event);
		});
	}
}
