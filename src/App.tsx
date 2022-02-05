import React from "react";
import { Graph } from "@antv/x6";
import { Environment } from "./FSM";
import { Button, Divider } from "antd";
import "antd/dist/antd.css";
import "./App.less";

class App extends React.Component {
  private env = new Environment();

  private canvasRef = React.createRef<HTMLDivElement>();

  constructor(props: any) {
    super(props);
    this.slowHeat = this.slowHeat.bind(this);
    this.fastHeat = this.fastHeat.bind(this);
    this.slowCool = this.slowCool.bind(this);
    this.fastCool = this.fastCool.bind(this);
    this.addGraph = this.addGraph.bind(this);
  }

  render() {
    return (
      <div className="app">
        <h3>水的三种状态随着温度的变化而变化</h3>
        <div ref={this.canvasRef}></div>
        <Divider type="horizontal"></Divider>
        <div className="group">
          <Button type="primary" onClick={this.slowHeat}>
            缓慢受热
          </Button>
          <Button type="primary" onClick={this.fastHeat}>
            快速受热
          </Button>
          <Button type="primary" onClick={this.slowCool}>
            缓慢降温
          </Button>
          <Button type="primary" onClick={this.fastCool}>
            快速降温
          </Button>
        </div>
      </div>
    );
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

  componentDidMount() {
    this.addGraph();
  }

  addGraph() {
    const data = {
      // 节点
      nodes: [
        {
          id: "gaseous",
          x: 300,
          y: 60,
          width: 120,
          height: 60,
          label: "气态",
          shape: "ellipse",
          attrs: {
            body: {
              fill: "#2ECC71",
              stroke: "#fff",
            },
          },
        },
        {
          id: "liquid",
          x: 40,
          y: 450,
          width: 120,
          height: 60,
          label: "液态",
          shape: "ellipse",
          attrs: {
            body: {
              fill: "#2ECC71",
              stroke: "#fff",
            },
          },
        },
        {
          id: "solid",
          x: 560,
          y: 450,
          width: 120,
          height: 60,
          label: "固态",
          shape: "ellipse",
          attrs: {
            body: {
              fill: "#2ECC71",
              stroke: "#fff",
            },
          },
        },
      ],
      // 边
      edges: [
        {
          source: "gaseous",
          target: "liquid",
          connector: { name: "normal" },
          label: "液化",
        },
        {
          source: "liquid",
          target: "gaseous",
          connector: { name: "smooth" },
          vertices: [
            {
              x: (300 + 40) / 2,
              y: (60 + 450) / 2,
            },
          ],
          label: "汽化",
        },
        {
          source: "gaseous",
          target: "solid",
          connector: { name: "normal" },
          label: "凝华",
        },
        {
          source: "solid",
          target: "gaseous",
          connector: { name: "smooth" },
          vertices: [
            {
              x: (300 + 560) / 2 + 120,
              y: (60 + 450) / 2,
            },
          ],
          label: "升华",
        },
        {
          source: "liquid",
          target: "solid",
          connector: { name: "normal" },
          label: "凝固",
        },
        {
          source: "solid",
          target: "liquid",
          connector: { name: "smooth" },
          vertices: [
            {
              x: (40 + 560) / 2 + 50,
              y: 450 + 95,
            },
          ],
          label: "溶化",
        },
      ],
    };

    const graph = new Graph({
      container: this.canvasRef.current,
      width: 720,
      height: 600,
      panning: false, // 禁止画布平移
      grid: true,
      interacting: function () {
        return {
          nodeMovable: false,
          edgeMovable: false,
        };
      },
    });

    graph.fromJSON(data);
  }
}

export default App;
