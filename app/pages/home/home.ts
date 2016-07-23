import {Page, NavController, NavParams} from 'ionic-angular';
import {BanksPage} from '../banks/banks';

import {SrIcon} from '../../components/sr-icon/sr-icon';

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [SrIcon]
})
export class HomePage {
  constructor(private nav : NavController) {}

  goToPedalPi() {
    this.nav.push(BanksPage);
  }
}
