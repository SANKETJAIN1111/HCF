import { Component, Input } from '@angular/core';

@Component({
  selector: 'helpdesk',
  templateUrl: './helpdesk.component.html'
})
export class HelpdeskComponent {
  showHelp = false;
  @Input() helpType: string;

}