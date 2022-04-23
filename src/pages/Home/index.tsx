import React from "react";
import { Graph } from "@antv/x6";
import { Button, Divider } from "antd";
import H2O from "./fsm";
import "antd/dist/antd.css";
import "./index.less";

interface IProps {}

interface IState {
  air_temperature: number;
}

class App extends React.Component<IProps, IState> {
  private h2o: H2O = new H2O();

  private canvasRef = React.createRef<HTMLDivElement>();

  private graph: Graph;

  constructor(props: any) {
    super(props);
    this.state = {
      air_temperature: 0,
    };
    this.heating = this.heating.bind(this);
    this.cooling = this.cooling.bind(this);
    this.createGraph = this.createGraph.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  set temperature(val) {
    this.h2o.change(val);
    this.handleChange();
    this.setState({
      air_temperature: val,
    });
  }

  get temperature() {
    return this.state.air_temperature;
  }

  heating(val: number) {
    this.temperature += val;
  }

  cooling(val: number) {
    this.temperature -= val;
  }

  render() {
    return (
      <div className="app">
        <h3>水的三种状态随着温度的变化而变化</h3>
        <div ref={this.canvasRef}></div>
        <Divider type="horizontal"></Divider>
        <h3>当前环境的温度是 {this.state.air_temperature}</h3>
        <div className="group">
          <Button type="primary" onClick={() => this.heating(20)}>
            缓慢受热
          </Button>
          <Button type="primary" onClick={() => this.heating(200)}>
            快速受热
          </Button>
          <Button type="primary" onClick={() => this.cooling(20)}>
            缓慢降温
          </Button>
          <Button type="primary" onClick={() => this.cooling(200)}>
            快速降温
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.createGraph();
    this.temperature = 25;
  }

  createGraph() {
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
            label: {
              fill: "#fff",
              fontSize: 16,
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
            label: {
              fill: "#fff",
              fontSize: 16,
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
            label: {
              fill: "#fff",
              fontSize: 16,
            },
          },
        },
      ],
      // 边
      edges: [
        {
          id: "liquefaction",
          source: "gaseous",
          target: "liquid",
          connector: { name: "normal" },
          label: "液化",
          attrs: {
            line: {
              stroke: "#000",
              strokeWidth: 1,
            },
            text: {

            }
          },
        },
        {
          id: "vaporize",
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
          attrs: {
            line: {
              stroke: "#000",
              strokeWidth: 1,
            },
          },
        },
        {
          id: "deposition",
          source: "gaseous",
          target: "solid",
          connector: { name: "normal" },
          label: "凝华",
          attrs: {
            line: {
              stroke: "#000",
              strokeWidth: 1,
            },
          },
        },
        {
          id: "sublimation",
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
          attrs: {
            line: {
              stroke: "#000",
              strokeWidth: 1,
            },
          },
        },
        {
          id: "solidification",
          source: "liquid",
          target: "solid",
          connector: { name: "normal" },
          label: "凝固",
          attrs: {
            line: {
              stroke: "#000",
              strokeWidth: 1,
            },
          },
        },
        {
          id: "melt",
          source: "solid",
          target: "liquid",
          connector: { name: "smooth" },
          vertices: [
            {
              x: (40 + 560) / 2 + 50,
              y: 450 + 80,
            },
          ],
          label: "溶化",
          attrs: {
            line: {
              stroke: "#000",
              strokeWidth: 1,
            },
          },
        },
      ],
    };

    const graph = (this.graph = new Graph({
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
    }));

    graph.fromJSON(data);
  }

  handleChange() {
    const preState = this.h2o.preState?.constructor.name.toLowerCase();
    const curState = this.h2o.curState?.constructor.name.toLowerCase();
    this.setNodeAtive(preState, curState);
    if (preState && curState && preState !== curState) {
      this.setEdgeActive(preState, curState);
    }
  }

  setNodeAtive(preState, curState) {
    const graph = this.graph;
    const nodes = graph.getNodes();
    nodes.forEach(function (item) {
      if (preState && item.id === preState) {
        item.updateAttrs({
          body: {
            fill: "blue",
            stroke: "#fff",
          },
        });
      } else if (curState && item.id === curState) {
        item.updateAttrs({
          body: {
            fill: "red",
            stroke: "#fff",
          },
        });
      } else {
        item.updateAttrs({
          body: {
            fill: "#2ECC71",
            stroke: "#fff",
          },
        });
      }
    });
  }

  setEdgeActive(preState, curState) {
    const graph = this.graph;
    const edges = graph.getEdges();
    edges.forEach(function (edge) {
      const source = (edge.source as any).cell;
      const target = (edge.target as any).cell;
      if (source === preState && target === curState) {
        edge.updateAttrs({
          line: {
            stroke: "orange",
            strokeWidth: 4,
            targetMarker: {
              name: 'classic',
              fill: "orange",
              stroke: "orange",
            }
          },
          text: {
            fill: 'orange',
          }
        });
      } else {
        edge.updateAttrs({
          line: {
            stroke: "#000",
            strokeWidth: 1,
            targetMarker: {
              fill: "#000",
              name: 'classic',
            }
          },
          text: {
            fill: '#000',
          }
        });
      }
    });
  }
}

export default App;
