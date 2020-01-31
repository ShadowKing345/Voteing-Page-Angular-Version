import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Question } from "src/app/model/question";
import { ResponseItem } from "src/app/model/responseItem";
import { FormGroup, FormControl } from "@angular/forms";
import { QuestionService } from "src/app/services/question.service";
import { AlertItem } from '../layouts/alerts/alert-item/alert-item.component';
import { timeout } from 'rxjs/operators';

@Component({
	selector: "app-edit",
	templateUrl: "./edit.component.html",
})
export class EditComponent implements OnInit, OnDestroy {
	@Output() networkError: EventEmitter<any> = new EventEmitter();
	@Output() onAddAlertEvent: EventEmitter<AlertItem> = new EventEmitter<AlertItem>();

	questionObj: Question = new Question();
	constructor(private qs: QuestionService) {}

	questionForm: FormGroup;
	responseCreationForm: FormGroup;

	ngOnInit() {
		this.qs.getQuestion().subscribe(
			questionObj => {
				this.questionObj = questionObj;
				this.questionForm.get("title").setValue(this.questionObj.title);
			},
			err => {
				this.networkError.emit(err);
			}
		);

		this.questionForm = new FormGroup({
			title: new FormControl(""),
		});

		this.responseCreationForm = new FormGroup({
			title: new FormControl(""),
		});

		document.documentElement.style.setProperty("--border-size", "15px");
	}

	ngOnDestroy() {}

	createResponse() {
		if (!this.responseCreationForm.value.title || this.responseCreationForm.value.title === " ") {
			this.onAddAlertEvent.emit({type: 1, message: "Response input cannot be left empty or just have a space in it.", timeout: 10});
			return;
		}

		var holdResponse: ResponseItem = {
			title: this.responseCreationForm.value.title,
			voted: 0,
		};

		if (
			!this.questionObj.response.find(item => {
				return item.title.toLowerCase() === holdResponse.title.toLowerCase();
			})
		) {
			this.onAddAlertEvent.emit({type: 2, message: "Createing Response...", timeout: 5});
			this.questionObj.response.push(holdResponse);
			this.responseCreationForm.get("title").setValue("");
		} else {
			this.onAddAlertEvent.emit({type: 1, message: "Response already in list. The list is not case sensitive.", timeout: 10});
			return;
		}
	}

	deleteResponse(responseItem: ResponseItem) {
		console.log(`Deleting response: ${responseItem.title}`);
		this.questionObj.response = this.questionObj.response.filter(r => r.title !== responseItem.title);
	}

	onSubmit() {
		if (this.questionObj.response.length < 2) {
			this.onAddAlertEvent.emit({type: 1, message: "You must have at least 2 responses in the list.", timeout: 10});
			return;
		}
		if (this.questionForm.value.title === "" || this.questionForm.value.title === " ") {
			this.onAddAlertEvent.emit({type: 1, message: "The question cannot be left empty.", timeout: 10});
			return;
		}

		this.questionObj.title = this.questionForm.value.title;
		if (this.questionObj.title[this.questionObj.title.length - 1] !== "?") this.questionObj.title += "?";

		this.qs.sendQuestion(this.questionObj).subscribe(
			res => {
				this.onAddAlertEvent.emit({type: 2, message: "Edit completed. Saved.", timeout: 10});
			},
			err => {
				console.log(err);
				window.alert(err);
			}
		);
	}
}
