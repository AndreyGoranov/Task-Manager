import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformPriority'
})
export class TransformPriorityPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 0) {
      return 'Normal';
    } else if (value == 1) {
      return 'High';
    } else if (value == -1) {
      return 'Low';
    }
  }

}
