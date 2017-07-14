import { Injectable }   from '@angular/core';
import { Country }      from '../models/country';

@Injectable()
export class CountryData {
    static getCountries() {
        return [
            {'idCountry': 'ES', 'country': 'Spain'},
            {'idCountry': 'AD', 'country': 'Andorra'},
            {'idCountry': 'PT', 'country': 'Portugal'},
            {'idCountry': 'IL', 'country': 'Israel'}
        ];
    }
}