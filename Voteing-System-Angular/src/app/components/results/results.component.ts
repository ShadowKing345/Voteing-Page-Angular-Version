import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Question } from "src/app/model/question";
import { QuestionService } from "src/app/services/question.service";
import { Subscription, Observable, timer, of } from "rxjs";
import { switchMap, takeWhile } from "rxjs/operators";

export class KeyItem {
	title: string;
	voted: number;
	total: number;
	color: string;
}

@Component({
	selector: "app-results",
	templateUrl: "./results.component.html",
})
export class ResultsComponent implements OnInit {
	@Output() networkError: EventEmitter<any> = new EventEmitter();

	questionObj: Question = new Question();
	keys: KeyItem[] = [];
	totalVotes: number;
	sub: Subscription;

	constructor(private qs: QuestionService) {}

	ngOnInit() {
		this.qs.getQuestion().subscribe(
			questionObj => {
				this.questionObj = questionObj;

				this.totalVotes = 0;
				this.questionObj.response.forEach(element => {
					this.totalVotes += element.voted;
				});

				this.questionObj.response.forEach(element => {
					var tempKeyCssName = element.title.replace(" ", "-");
					var tempKeyCssVaribleName = `--${tempKeyCssName}-span-background-color`;
					var tempKeyItem: KeyItem = {
						title: element.title,
						voted: element.voted,
						total: this.totalVotes,
						color: tempKeyCssVaribleName,
					};
					document
						.getElementById("result-div")
						.style.setProperty(tempKeyCssVaribleName, "#" + ((0xf << 17) | Math.floor(Math.random() * 16777215)).toString(16));
					this.keys.push(tempKeyItem);
				});
			},
			err => {
				this.networkError.emit(err);
			}
		);

		this.sub = timer(0, 5000)
			.pipe(switchMap(() => this.qs.getQuestion()))
			.subscribe(questionObj => {
				this.questionObj = questionObj;
				this.totalVotes = 0;
				this.questionObj.response.forEach(element => {
					this.totalVotes += element.voted;
				});

				this.keys.forEach(key => {
					key.total = this.totalVotes;
					key.voted = this.questionObj.response.find(res => {
						if (res.title === key.title) return res;
					}).voted;
				});
			});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
