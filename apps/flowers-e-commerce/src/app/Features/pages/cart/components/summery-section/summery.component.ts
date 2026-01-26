import { Component, input} from '@angular/core';

@Component({
  selector: 'app-summery',
  imports: [],
  templateUrl: './summery.component.html',
  styleUrl: './summery.component.scss',
})
export class SummeryComponent {
  
  discount=input<boolean>(true);
  totalPrice=input<number|undefined>(0);


  
}
