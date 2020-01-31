import { Component, OnInit, Input } from "@angular/core";
import { KeyItem } from "../../results.component";

@Component({
	selector: "app-graph-element",
	templateUrl: "./element.component.html",
})
export class ElementComponent implements OnInit {
	@Input() key: KeyItem;

	constructor() {}

	ngOnInit() {}

	setDivStyle() {
		return {
			background: `var(${this.key.color})`,
			width: `calc(${(this.key.voted / this.key.total) * 100}%)`,
		};
	}
}
