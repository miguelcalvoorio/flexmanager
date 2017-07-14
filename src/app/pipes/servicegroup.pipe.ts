import { Pipe, PipeTransform } from '@angular/core';

import { ClientAttributeData } from '../static/clientattr';

@Pipe({
  name: 'servicegroup'
})
export class ServicegroupPipe implements PipeTransform {

  transform(value: string): string {
    return ClientAttributeData.getServiceGroups().filter((item)=> item.idServiceGroup == value)[0].serviceGroup;
  }

}
