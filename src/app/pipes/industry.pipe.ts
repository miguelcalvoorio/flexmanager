import { Pipe, PipeTransform } from '@angular/core';

import { ClientAttributeData } from '../static/clientattr';

@Pipe({
  name: 'industry'
})
export class IndustryPipe implements PipeTransform {

  transform(value: string): string {
    return ClientAttributeData.getIndustries().filter((item)=> item.idIndustry == value)[0].industry;
  }

}
