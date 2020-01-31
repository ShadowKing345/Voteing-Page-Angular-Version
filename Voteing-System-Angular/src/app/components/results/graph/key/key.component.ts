import { Component, OnInit, Input, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from "@angular/core";
import { ResponseItem } from "src/app/model/responseItem";
import { KeyItem } from "../../results.component";

@Component({
	selector: "app-graph-key",
	templateUrl: "./key.component.html",
})
export class KeyComponent implements OnInit, AfterViewInit {
	@Input() key: KeyItem;
	@ViewChild("colorInput", { static: false }) colorInput: ElementRef;

	constructor() {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.colorInput.nativeElement.value = document.getElementById("result-div").style.getPropertyValue(this.key.color);
	}

	setColorDivStyle(key:KeyItem) {
		let style = {
			"background-color": `var(${key.color})`,
		};
		return style;
	}

	changeColor(bg: string) {
		if (bg === "") return;
		document.getElementById("result-div").style.setProperty(this.key.color, bg);
	}
}
