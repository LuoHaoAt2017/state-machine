import React from 'react';
import { Environment } from './fsm';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './index.less';

class App extends React.Component {
  env = new Environment();

  constructor() {
    super();
    this.slowHeat = this.slowHeat.bind(this);
    this.fastHeat = this.fastHeat.bind(this);
    this.slowCool = this.slowCool.bind(this);
    this.fastCool = this.fastCool.bind(this);
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={slowHeat}>缓慢受热</Button>
        <Button type="primary" onClick={fastHeat}>快速受热</Button>
        <Button type="primary" onClick={slowCool}>缓慢降温</Button>
        <Button type="primary" onClick={fastCool}>快速降温</Button>
      </div>
    )
  }

  slowHeat() {
    this.env.heating(20);
  }

  fastHeat() {
    this.env.heating(200);
  }

  slowCool() {
    this.env.cooling(20);
  }

  fastCool() {
    this.env.cooling(200);
  }
}

export default App;