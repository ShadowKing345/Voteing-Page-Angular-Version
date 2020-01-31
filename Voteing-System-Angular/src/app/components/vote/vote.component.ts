import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Question } from "src/app/model/question";

import { QuestionService } from "../../services/question.service";
import { FormGroup, FormControl } from "@angular/forms";
import { AlertItem } from "../layouts/alerts/alert-item/alert-item.component";

@Component({
	selector: "app-vote",
	templateUrl: "./vote.component.html",
	styleUrls: ["./vote.component.css"],
})
export class VoteComponent implements OnInit {
	@Output() networkError: EventEmitter<any> = new EventEmitter();
	@Output() onAddAlertEvent: EventEmitter<AlertItem> = new EventEmitter<AlertItem>();

	cookieName: string = "voteingSystem";
	questionObj: Question = new Question();

	form: FormGroup;

	constructor(private qs: QuestionService) {}

	ngOnInit() {
		this.qs.getQuestion().subscribe(
			questionObj => {
				this.questionObj = questionObj;
			},
			err => {
				this.networkError.emit(err);
			}
		);
		this.form = new FormGroup({
			index: new FormControl(),
		});
	}

	onSubmit() {
		var index = -1;
		var val = this.form.value.index;
		this.questionObj.response.find((item, i) => {
			if (item.title === val) {
				index = i;
				return i;
			}
		});
		var decision: any = {};
		decision["voted"] = index;
		this.saveDecision(decision);
	}

	saveDecision(decision: JSON) {
		if (!this.userHasDecision()) {
			this.storeUserDecision(decision);
			this.qs.vote(decision["voted"]).subscribe();
			this.onAddAlertEvent.emit({ type: 2, message: `You have voted for ${this.questionObj.response[decision["voted"]].title}.`, timeout: 10 });
		} else {
			this.onAddAlertEvent.emit({ type: 1, message: "You have already voted. Please move to the results page.", timeout: 10 });
		}
	}

	storeUserDecision(decision: JSON) {
		var date = new Date();
		date.setTime(date.getTime() + 259200000);
		var expires = "expires" + date.toUTCString();
		document.cookie = `${this.cookieName}=${JSON.stringify(decision)};${expires};path=/`;
	}

	userHasDecision() {
		var rawCookieName = this.cookieName + "=";
		var rawCookies = document.cookie.split(";");
		for (var i = 0; i < rawCookies.length; i++) {
			var cookie = rawCookies[i];
			while (cookie.charAt(0) == " ") cookie = cookie.substring(1);

			if (cookie.indexOf(rawCookieName) === 0) return decodeURIComponent(cookie.substring(rawCookieName.length, cookie.length));
		}
	}
}
