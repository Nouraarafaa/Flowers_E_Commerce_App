import { Component } from '@angular/core';
import { PromoCard } from '../../../../../Shared/interfaces/promo-card/promo-card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-promotional-cards',
  imports: [NgOptimizedImage],
  templateUrl: './promotional-cards.component.html',
  styleUrl: './promotional-cards.component.scss',
})
export class PromotionalCardsComponent {
  cards: PromoCard[] = [
    {
      img: './Images/Wedding.png',
      label: 'Wedding',
      title: 'Celebrate Her Forever with a Gift She’ll Always Remember',
    },
    {
      img: './Images/Engagement.png',
      label: 'Engagement',
      title: 'Honor the Beginning of a Beautiful Journey Together',
    },
    {
      img: './Images/Anniversary.png',
      label: 'Anniversary',
      title: 'Mark Every Year of Love with a Meaningful Surprise',
    },
  ];
}
