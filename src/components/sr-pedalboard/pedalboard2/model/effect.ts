import {Input, Output} from './plug';


export class Effect {
  public id : number;

  public data : any;

  public x : number;
  public y : number;
  public view;

  public onSelectedListener = (effect : Effect) => {};
  public onDragListener = (effect : Effect) => {};

  private objectInputs = [];
  private objectOutputs = [];

  constructor(x, y, data) {
    this.data = data;

    this.x = x;
    this.y = y;

    for (let input in this.data.ports.audio.input)
      this.objectInputs.push(new Input(this, input));

    for (let output in this.data.ports.audio.output)
      this.objectInputs.push(new Output(this, output));
  }

  get inputs() {
    return this.objectInputs;
  }

  get outputs() {
    return this.objectOutputs;
  }
}
