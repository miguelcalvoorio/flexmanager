import { Pipe, PipeTransform } from '@angular/core';

import { CountryData } from '../static/country';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(value: string): string {
    return CountryData.getCountries().filter((item)=> item.idCountry == value)[0].country;
  }
}
