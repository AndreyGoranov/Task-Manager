import { animation, style, animate, keyframes } from '@angular/animations';

export const slideIn = animation([
  animate('0.9s ease-in', keyframes([
    style({
      height: 0,
      opacity: 0,
      transform: 'translateX(-100%)'
    }),
    style({
      height: '25px',
    }),
    style({
      opacity: 1,
      transform: 'translateX(0)'
    })
  ]))
]);
