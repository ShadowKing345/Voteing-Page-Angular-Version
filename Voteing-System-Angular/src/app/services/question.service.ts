import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { v4 as uuid } from "uuid";
import { Question } from "../model/question";
import { URL } from "url";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
	}),
	responseType: 'text' as 'text',
};

@Injectable({
	providedIn: "root",
})
export class QuestionService {
	serverUrl: string = "http://localhost:5000/api";
	constructor(private http: HttpClient) {
		this.serverUrl = `http://${window.location.hostname}:5000/api`;
	}

	getQuestion(): Observable<Question> {
		return this.http.get<Question>(`${this.serverUrl}/question`);
	}

	sendQuestion(question: Question): Observable<any> {
		question.id = uuid();
		return this.http.post(`${this.serverUrl}/question`, question, httpOptions);
	}

	vote(index: number): Observable<any> {
		return this.http.get(`${this.serverUrl}/vote/${index}`, httpOptions);
	}
}
