import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/layouts/header/header.component";
import { FotterComponent } from "./components/layouts/footer/footer.component";
import { VoteResponseItemComponent } from "./components/vote/vote-response-item/vote-response-item.component";
import { EditComponent } from "./components/edit/edit.component";
import { EditResponseItemComponent } from "./components/edit/edit-response-item/edit-response-item.component";
import { ResultsComponent } from "./components/results/results.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { VoteComponent } from "./components/vote/vote.component";
import { KeyComponent } from './components/results/graph/key/key.component';
import { ElementComponent } from './components/results/graph/element/element.component';
import { LoginScreenComponent } from './components/pages/login-screen/login-screen.component';
import { RoundUpPipe } from './pipes/round-up.pipe';
import { AlertsComponent } from './components/layouts/alerts/alerts.component';
import { AlertItemComponent } from './components/layouts/alerts/alert-item/alert-item.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FotterComponent,
		VoteComponent,
		VoteResponseItemComponent,
		EditComponent,
		EditResponseItemComponent,
		ResultsComponent,
		AboutComponent,
		KeyComponent,
		ElementComponent,
		LoginScreenComponent,
		RoundUpPipe,
		AlertsComponent,
		AlertItemComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
