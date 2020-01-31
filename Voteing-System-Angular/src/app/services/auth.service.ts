import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
	headers: new HttpHeaders({
		"Content-Type": "application/json",
	}),
	responseType: "text" as "text",
};

@Injectable({
	providedIn: "root",
})
export class AuthService {
	serverUrl: string = "http://localhost:5000/api";
	constructor(private httpClient: HttpClient) {
		this.serverUrl = `http://${window.location.hostname}:5000/api`;
	}

	getUserDetails(username, password) {
		return this.httpClient.post(
			`${this.serverUrl}/login`,
			{
				username,
				password,
			},
			httpOptions
		);
	}
}
