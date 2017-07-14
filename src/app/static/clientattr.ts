import { Injectable }   from '@angular/core';
import { ServiceGroup } from '../models/servicegroup';
import { Industry }     from '../models/industry';

@Injectable()
export class ClientAttributeData {
    static getServiceGroups() {
        return [
            {'idServiceGroup': 'CM', 'serviceGroup': 'Communications, Media & Technology'},
            {'idServiceGroup': 'FS', 'serviceGroup': 'Financial Services' },
            {'idServiceGroup': 'HP', 'serviceGroup': 'Health & Public Service' },
            {'idServiceGroup': 'PR', 'serviceGroup': 'Products' },
            {'idServiceGroup': 'RS', 'serviceGroup': 'Resources' }
        ];
    }
    
    static getIndustries() {
        return [
            {'idIndustry': 'MD', 'idServiceGroup': 'CM', 'industry': 'Media'},
            {'idIndustry': 'BK', 'idServiceGroup': 'FS', 'industry': 'Banking'},
            {'idIndustry': 'IS', 'idServiceGroup': 'FS', 'industry': 'Insurance'},
            {'idIndustry': 'CM', 'idServiceGroup': 'FS', 'industry': 'Capital Markets'},
            {'idIndustry': 'GV', 'idServiceGroup': 'HP', 'industry': 'Goverment'},
            {'idIndustry': 'TR', 'idServiceGroup': 'PR', 'industry': 'Transportation'},
            {'idIndustry': 'EN', 'idServiceGroup': 'RS', 'industry': 'Energy'}
        ];
    }
}