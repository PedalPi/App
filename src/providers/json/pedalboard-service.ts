import {Rest} from './rest';
import {Router} from './router';

import {Bank} from '../../plugins-manager/model/bank';
import {Pedalboard} from '../../plugins-manager/model/pedalboard';
import {Connection} from '../../plugins-manager/model/connection';


export class PedalboardService {
  private rest : Rest;
  private router : Router;

  constructor(rest : Rest, router : Router) {
    this.rest = rest;
    this.router = router;
  }

  private url(bank : Bank, pedalboard? : Pedalboard) : string {
    let url = `/bank/${bank.index}/pedalboard`;
    if (pedalboard)
      url += `/${bank.pedalboards.indexOf(pedalboard)}`;

    return this.router.route(url);
  }

  get(bank : any, pedalboard : any) {
    let url = this.url(bank, pedalboard);
    return this.rest.get(url);
  }

  saveNew(pedalboard : Pedalboard) {
    let url = this.url(pedalboard.bank);
    return this.rest.post(url, pedalboard.json());
  }

  update(pedalboard : Pedalboard) {
    let url = this.url(pedalboard.bank, pedalboard);

    return this.rest.put(url, pedalboard.json());
  }

  delete(pedalboard : Pedalboard) {
    let url = this.url(pedalboard.bank, pedalboard);
    return this.rest.delete(url);
  }

  swap(bank : any, pedalboardA : number, pedalboardB : number) {
    let url = this.swapUrl(bank, pedalboardA, pedalboardB);
    return this.rest.put(url, {});
  }

  private swapUrl(bank : any, pedalboardA : number, pedalboardB : number) : string {
    let url = `/swap/pedalboard/bank/${bank.index}/pedalboard-a/${pedalboardA}/pedalboard-b/${pedalboardB}`;

    return this.router.route(url);
  }

  updateData(pedalboard: Pedalboard, data) {
    const key = 'pedalpi-apk';
    const bank = pedalboard.bank;
    let url = this.router.route(`/bank/${bank.index}/pedalboard/${pedalboard.index}/data/${key}`);

    return this.rest.put(url, data);
  }

  connect(pedalboard: Pedalboard, connection: Connection) {
    const bank = pedalboard.bank;

    let url = this.router.route(`/bank/${bank.index}/pedalboard/connect`);
    return this.rest.put(url, connection.json());
  }

  disconnect(pedalboard: Pedalboard, connection: Connection) {
    const bank = pedalboard.bank;

    let url = this.router.route(`/bank/${bank.index}/pedalboard/disconnect`);
    return this.rest.put(url, connection.json());
  }
}
