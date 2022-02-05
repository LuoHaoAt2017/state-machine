export default class H2O {
  public preState: State;
  public curState: State;

  constructor() {
    this.curState = new Liquid();
  }

  change(temperature: number) {
    this.curState.change(this, temperature);
  }

  setState(state: State) {
    this.preState = this.curState;
    this.curState = state;
  }

  getState(): State {
    return this.curState;
  }
}

abstract class State {
  abstract change(h2o: H2O, temperature: number);
}

class Gaseous extends State {

  change(h2o: H2O, temperature: number) {
    if (temperature > 0 && temperature < 100) {
      h2o.setState(new Liquid()); // 液化
    } else if (temperature < 0) {
      h2o.setState(new Solid()); // 凝华
    }
  }
}

class Liquid extends State {

  change(h2o: H2O, temperature: number) {
    if (temperature < 0) {
      h2o.setState(new Solid()); // 凝固
    } else if (temperature > 100) {
      h2o.setState(new Gaseous()); // 汽化
    }
  }
}

class Solid extends State {

  change(h2o: H2O, temperature: number) {
    if (temperature > 100) {
      h2o.setState(new Gaseous()); // 升华
    } else if (temperature > 0) {
      h2o.setState(new Liquid()); // 溶化
    }
  }
}