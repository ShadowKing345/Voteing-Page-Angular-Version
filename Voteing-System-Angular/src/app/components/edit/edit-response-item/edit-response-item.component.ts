import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ResponseItem } from "src/app/model/responseItem";

@Component({
	selector: "app-edit-response-item",
	templateUrl: "./edit-response-item.component.html",
})
export class EditResponseItemComponent implements OnInit {
	@Input() response: ResponseItem;
	@Output() deleteResponse: EventEmitter<ResponseItem> = new EventEmitter();

	constructor() {}

	setClass() {
		let classes = {
			"": true,
		};
		return classes;
	}

	ngOnInit() {}

	onDelete(response: ResponseItem) {
		this.deleteResponse.emit(response);
	}
}
