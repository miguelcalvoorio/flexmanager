import { Injectable } from '@angular/core';

import * as _ from 'underscore';

@Injectable()
export class PaginationService {
  private PAGER_SIZE = 5;
    
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // Calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let middlePager = Math.ceil(this.PAGER_SIZE / 2);
    
    let startPage: number, endPage: number;
    if (totalPages <= this.PAGER_SIZE) {
      // Less than TOTAL_PAGES --> Show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than TOTAL_PAGES --> Calculate start and end pages
      if (currentPage <= middlePager) {
        startPage = 1;
        endPage = this.PAGER_SIZE;
      } else if (currentPage >= (totalPages - (this.PAGER_SIZE - middlePager))) {
        startPage = totalPages - (this.PAGER_SIZE - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePager + 1;
        endPage = currentPage + (this.PAGER_SIZE - middlePager);
      }
    }
    
    // Calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    
    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);
    
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
