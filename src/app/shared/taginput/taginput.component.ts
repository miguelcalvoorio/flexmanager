import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-taginput',
  templateUrl: './taginput.component.html',
  styleUrls: ['./taginput.component.css'],
  inputs: [
    'tagPlaceHolder',
    'maxNumberOfTags',
    'minLengthOfTag',
    'maxLengthOfTag',
    'allowDuplicates',
    'autoCompleteTagList',
    'listOfTags'
    ],
  outputs: [
    'newTagEvent'
    ]
})
export class TaginputComponent implements OnInit {
  // TagInputComponent properties
  private tagPlaceHolder = '+ Tag';
  private maxNumberOfTags = 0; // 0 equals no limits
  private minLengthOfTag  = 0;
  private maxLengthOfTag  = 0; // 0 equals no limits
  private autoCompleteTagList = [];
  private listOfTags = [];
  private newTagEvent = new EventEmitter<string>();
  
  // TagInputComponent internal variables
  private newTag = '';
  
  ngOnInit() {}
  
  private checkAutoComplete() {
    this.newTagEvent.emit(this.newTag);
  }
  
  private removeTag(tag: any) {
    let index = this.listOfTags.indexOf(tag);
    this.listOfTags.splice(index, 1);
  }
  
  private addTag() {
    if (this.autoCompleteTagList) {
      // Tag need to be selected from autocomplete list
      // Show error message?
    } else {
      // Check tag
      if (this.newTag.trim().length > this.minLengthOfTag) {
        if (this.isTagDuplicated(this.newTag)) {
          // Already included
      } else {
          this.listOfTags.push(this.newTag.trim());
          this.newTag = '';
        }
      }
    }
  }
  
  private loadFromAutoComplete(tag: string) {
    if (tag.trim().length > this.minLengthOfTag) {
      if (this.isTagDuplicated(tag)) {
        // Already included
      } else {
        this.listOfTags.push(tag.trim());
        this.newTag = '';
      
        // Alert newTag is empty
        this.newTagEvent.emit(this.newTag);
      }
    }
  }
  
  private isTagDuplicated(newTag: string) {
    if (this.listOfTags.filter((item)=> item == newTag).length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
