import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformPriority'
})
export class TransformPriorityPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0) {
      return 'normal';
    } else if (value === 1) {
      return 'important';
    } else {
      return 'low';
    }
  }

}
