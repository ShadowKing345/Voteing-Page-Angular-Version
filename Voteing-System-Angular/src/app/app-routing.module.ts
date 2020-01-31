import { NgModule, ElementRef } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditComponent } from "./components/edit/edit.component";
import { ResultsComponent } from "./components/results/results.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { VoteComponent } from "./components/vote/vote.component";
import { LoginScreenComponent } from './components/pages/login-screen/login-screen.component';

const routes: Routes = [
	{ path: "", component: LoginScreenComponent },
	{ path: 'vote', component: VoteComponent},
	{ path: "edit", component: EditComponent },
	{ path: "result", component: ResultsComponent },
	{ path: "about", component: AboutComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
