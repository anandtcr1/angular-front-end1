import { Component, OnInit, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-container',
  templateUrl: './lottie-container.component.html',
  styleUrls: ['./lottie-container.component.scss']
})
export class LottieContainerComponent implements OnInit {
  @Input() width:any
  @Input() height:any
  @Input() path:any
  options: AnimationOptions

  ngOnInit(): void {
    this.options = {
      path: this.path,
    };
  }

  constructor() {

  }
}
