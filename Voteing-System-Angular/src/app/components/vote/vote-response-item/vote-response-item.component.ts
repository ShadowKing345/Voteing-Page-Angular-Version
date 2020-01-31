import { Component, OnInit, Input } from "@angular/core";
import { ResponseItem } from "src/app/model/responseItem";
import { FormGroup } from "@angular/forms";

@Component({
	selector: "app-vote-response-item",
	templateUrl: "./vote-response-item.component.html",
	styleUrls: ["./vote-response-item.component.css"],
})
export class VoteResponseItemComponent implements OnInit {
	@Input() response: ResponseItem;
	@Input() parentForm: FormGroup;

	constructor() {}

	ngOnInit() {}
}
