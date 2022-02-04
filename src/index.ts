import './index.less';

class Environment {

  private _temperature: number; // 气温

  h2o: H2O = new H2O(this);

  constructor() {
    this._temperature = 25;
    this.h2o.change(this);
  }

  get temperature() {
    return this._temperature;
  }

  set temperature(val) {
    this._temperature = val;
    this.h2o.change(this);
  }

  heating(val: number) {
    this.temperature += val;
  }

  cooling(val: number) {
    this.temperature -= val;
  }

  report() {
    const card = document.querySelector('#card');
    if (card) {
      card.innerHTML = 'h2o current state is ' + this.h2o.state.constructor.name + ' current temperature is ' + this.temperature;
    }
  }
}

class H2O {
  private _state: State;

  constructor(env: Environment) {
    this._state = new Gaseous();
  }

  change(env: Environment) {
    this._state.change(this, env);
  }

  get state() {
    return this._state;
  }

  set state(val: State) {
    this._state = val;
  }
}

abstract class State {
  abstract change(h2o: H2O, env: Environment): void;
}

class Gaseous extends State {
  change(h2o: H2O, env: Environment) {
    if (env.temperature > 0 && env.temperature < 100) {
      h2o.state = new Liquid(); // 液化
    } else if (env.temperature < 0) {
      h2o.state = new Solid(); // 凝华
    }
  }
}

class Liquid extends State {
  change(h2o: H2O, env: Environment) {
    if (env.temperature < 0) {
      h2o.state = new Solid(); // 凝固
    } else if (env.temperature > 100) {
      h2o.state = new Gaseous(); // 汽化
    }
  }
}

class Solid extends State {
  change(h2o: H2O, env: Environment) {
    if (env.temperature > 100) {
      h2o.state = new Gaseous(); // 升华
    } else if (env.temperature > 0) {
      h2o.state = new Liquid(); // 溶化
    }
  }
}

window.onload = function () {
  const env = new Environment();
  const app = document.querySelector('#app');

  const slowHeat = document.createElement('button');
  slowHeat.innerText = '缓慢受热';
  slowHeat.addEventListener('click', function() {
    env.heating(10);
    env.report();
  });

  const fastHeat = document.createElement('button');
  fastHeat.innerText = '快速受热';
  fastHeat.addEventListener('click', function() {
    env.heating(200);
    env.report();
  });

  const slowCool = document.createElement('button');
  slowCool.innerText = '缓慢降温';
  slowCool.addEventListener('click', function() {
    env.cooling(10);
    env.report();
  });

  const fastCool = document.createElement('button');
  fastCool.innerText = '快速降温';
  fastCool.addEventListener('click', function() {
    env.cooling(200);
    env.report();
  });

  const card = document.createElement('h3');
  card.setAttribute('id', 'card');

  app?.appendChild(card);
  app?.appendChild(slowHeat);
  app?.appendChild(fastHeat);
  app?.appendChild(slowCool);
  app?.appendChild(fastCool);
  
  env.report();
}