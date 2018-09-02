import React from 'react';
import { Component } from 'react';
const d3 = require('d3');


class Graph extends Component {
    constructor() {
        super();
    }

    build() {
        let viz = d3.select(".graph-viz");
        let r = 380;
        let node_r = 30;
        let package_node_r = 40;

        const degreesToRadians = d => d * (Math.PI / 180);

        let pentagon_points = [...Array(5).keys()]
            .map(i => [r * Math.cos(degreesToRadians(90 + 72 * i)), r * Math.sin(degreesToRadians(90 + 72 * i))]);

        d3.select(".area-fill-collection").remove();
        viz.append("g")
            .classed("area-fill-collection", true)
            .selectAll("polygon")
            .data(pentagon_points)
            .enter()
            .append("polygon")
            .classed("area-fill", true)
            .attr("points", (_, i) => {

                let [curr_point, last_point] = [null, null];
                if (i === 0) {
                    curr_point = pentagon_points[0];
                    last_point = pentagon_points[pentagon_points.length - 1];
                } else {
                    curr_point = pentagon_points[i];
                    last_point = pentagon_points[i - 1];
                }

                return `0,0 ${last_point[0]},${last_point[1]} ${curr_point[0]},${curr_point[1]}`;

            })
            .attr("fill", (_, i) => `rgba(${this.props.annotation_order[i].rgb},0.25)`)
            .attr("transform", "scale(1, -1)");

        d3.select(".seperator-collection").remove();
        viz.append("g")
            .classed("seperator-collection", true)
            .selectAll("line")
            .data(pentagon_points)
            .enter()
            .append("line")
            .classed("separator", true)
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", p => p[0])
            .attr("y2", p => p[1])
            .attr("stroke", (_, i) => `rgb(${this.props.annotation_order[i].rgb})`);

        d3.select(".frame").remove();
        viz.append("circle")
            .attr("frame", true)
            .attr("r", r)
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("stroke", "lightgray")
            .attr("stroke-width", 5)
            .attr("fill", "transparent");

        d3.select(".area-labels-collection").remove();
        viz.append("g")
            .classed("area-labels-collection", true)
            .selectAll("text")
            .data(pentagon_points)
            .enter()
            .append("text")
            .classed("area-label", true)
            .attr("x", (_, i) => {

                let [curr_point, last_point] = [null, null];
                if (i === 0) {
                    curr_point = pentagon_points[0];
                    last_point = pentagon_points[pentagon_points.length - 1];
                } else {
                    curr_point = pentagon_points[i];
                    last_point = pentagon_points[i - 1];
                }

                return (curr_point[0] + last_point[0] + 0) / 3;
            })
            .attr("y", (_, i) => {

                let [curr_point, last_point] = [null, null];
                if (i === 0) {
                    curr_point = pentagon_points[0];
                    last_point = pentagon_points[pentagon_points.length - 1];
                } else {
                    curr_point = pentagon_points[i];
                    last_point = pentagon_points[i - 1];
                }

                return (curr_point[1] + last_point[1] + 0) / 3;

            })
            .attr("fill", (_, i) => `rgba(${this.props.annotation_order[i].rgb},1)`)
            .attr("transform", (_, i) => {

                let [curr_point, last_point] = [null, null];
                if (i === 0) {
                    curr_point = pentagon_points[0];
                    last_point = pentagon_points[pentagon_points.length - 1];
                } else {
                    curr_point = pentagon_points[i];
                    last_point = pentagon_points[i - 1];
                }

                let [cx, cy] = [(curr_point[0] + last_point[0] + 0) / 3, (curr_point[1] + last_point[1] + 0) / 3];
                return `scale(1, -1) rotate(180 ${cx}, ${cy})`

            })
            .text((_, i) => this.props.icons[this.props.annotation_order[i].type]);

        let pentagonalSideLength = 2 * r * Math.sin(Math.PI / 5);

        // Node layout algorithm.
        const nodeDepth = (node_width, n_row) => n_row * node_width / pentagonalSideLength * r + (n_row) * node_width * 0.4;
        function nodePosition(node_idx, slice_idx, node_width) {
            const [slice_start_angle, slice_end_angle] = [18 + slice_idx * 72, 18 + (slice_idx + 1) * 72];

            let angle = null;
            let node_depth = null;
            if (node_idx === 0) {
                node_depth = nodeDepth(node_width, 1);
                angle = slice_start_angle + 36;
            } else if (node_idx <= 2) {
                node_depth = nodeDepth(node_width, 2);
                const angle_section = ((slice_end_angle - slice_start_angle) / 3);
                angle = (node_idx === 1) ?
                    slice_start_angle + angle_section - (0.25 * angle_section) :
                    slice_start_angle + 2 * angle_section + (0.25 * angle_section);
            } else if (node_idx >= 3) {   // node_idx === 3
                node_depth = nodeDepth(node_width, 3);
                const angle_section = ((slice_end_angle - slice_start_angle) / 4);
                if (node_idx === 3)  angle = slice_start_angle + angle_section - (0.25 * angle_section);
                if (node_idx === 4)  angle = slice_start_angle + 2 * angle_section;
                if (node_idx === 5)  angle = slice_start_angle + 3 * angle_section + (0.25 * angle_section);
            }

            return [node_depth * Math.cos(degreesToRadians(angle)), node_depth * Math.sin(degreesToRadians(angle))];
        }

        d3.select(".data-package-node-circle").remove();
        viz.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", package_node_r)
            .classed("data-package-node-circle", true)
            .classed("data-package-node-circle-todo", this.props.data_package_defined)
            .classed("data-package-node-circle-initialized", !this.props.data_package_defined)
            .on("click", () => { this.props.onClickDataPackageNode(); })
            .on("mouseover", () => { d3.select(".data-package-node-circle").classed("data-package-node-mouseover", true); })
            .on("mouseout",  () => { d3.select(".data-package-node-circle").classed("data-package-node-mouseover", false); });

        d3.select(".data-package-node-circle-label").remove();
        let data_package_node_text_label = this.props.data_package_defined ? '💾' : '+';
        viz.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .classed("data-package-node-circle-label", true)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text(data_package_node_text_label)
            .on("click", () => { this.props.onClickDataPackageNode(); })
            .on("mouseover", () => { d3.select(".data-package-node-circle").classed("data-package-node-mouseover", true); })
            .on("mouseout",  () => { d3.select(".data-package-node-circle").classed("data-package-node-mouseover", false); });

        viz.selectAll(".node-circle").remove();
        for (let cls of Object.keys(this.props.contents)) {

            let location = this.props.annotation_order.findIndex(e => e.type === cls);
            this.props.contents[cls].forEach((item, item_idx) => {

                let [cx, cy] = nodePosition(item_idx, location, 80);
                let rgb = this.props.annotation_order[location].rgb;

                // TODO: triage attaching mouseovers to these elements.
                viz.append("circle")
                    .attr("cx", cx)
                    .attr("cy", cy)
                    .attr("r", node_r)
                    .attr("fill", `rgba(${rgb},1)`)
                    .attr("stroke", `rgba(${rgb},0.5)`)
                    .attr('transform', 'scale(1, -1)')
                    .classed("node-circle", true)
                    .on("click", () => { this.props.onClickAnnotationNode(cls, item_idx) })
            });
        }

    }

    componentDidMount() {
        this.build();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.count_annotation_nodes !== this.props.count_annotation_nodes ||
            nextProps.data_package_defined !== this.props.data_package_defined)
    }


    render() {
        this.build();
        return <svg className={"graph-viz"} viewBox={"-400 -400 800 800"} ref={node => this.node = node}>
        </svg>
    }
}


export default Graph;