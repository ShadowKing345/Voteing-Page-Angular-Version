import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-login-screen",
	templateUrl: "./login-screen.component.html",
	styleUrls: ["./login-screen.component.css"],
})
export class LoginScreenComponent implements OnInit {
	passwordDiv: boolean = false;

	constructor(private auth: AuthService, private router: Router) {}

	ngOnInit() {}

	setLoginDivClass() {
		return {
			"login-password-div-open": this.passwordDiv,
		};
	}

	login(event) {
		event.preventDefault();
		const target = event.target;
		const username = target.querySelector("#username").value;
		const password = target.querySelector("#password").value;

		if(!username) {
			window.alert("Please enter a username.");
			target.querySelector("#username").focus();
			return;
		}

		if(!password) {
			window.alert("Please enter a password.");
			target.querySelector("#password").focus();
			return;
		}

		this.auth.getUserDetails(username, password).subscribe(res => {
			if (res === "accept") this.router.navigate(["/edit"]);
			else window.alert("Invalid Username And Password");
		});
	}

	toggleLoginPasswordDiv() {
		this.passwordDiv = !this.passwordDiv;
		document.getElementById("login-teacher-div-button").textContent = this.passwordDiv ? "Am Not" : "Am I";
	}
}
