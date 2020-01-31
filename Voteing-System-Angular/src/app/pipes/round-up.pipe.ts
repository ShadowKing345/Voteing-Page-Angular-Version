import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "roundUp",
})
export class RoundUpPipe implements PipeTransform {
	transform(value: number): number {
		return Math.round(value);
	}
}
