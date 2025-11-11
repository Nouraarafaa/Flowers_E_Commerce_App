import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted-by',
  templateUrl: './TrustedBy.component.html',
  styleUrls: ['./TrustedBy.component.scss'],
})
export class TrustedByComponent {

  images: { img: string }[] = [
    { img: '/Images/company 1.png' },
    { img: '/Images/company 2.png' },
    { img: '/Images/company 3.png' },
    { img: '/Images/company 4.png' },
    { img: '/Images/company 5.png' },
    { img: '/Images/company 6.png' },
  ];

}
