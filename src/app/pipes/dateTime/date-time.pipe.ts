import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string, format: string = "MMM Do YYYY"): string {
    return moment(value).format(format);
  }

}
