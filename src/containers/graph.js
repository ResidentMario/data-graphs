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
        let node_r = 40;

        viz.append("circle")
            .attr("r", r)
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("stroke", "black")
            .attr("fill", "transparent");

        const degreesToRadians = d => d * (Math.PI / 180);

        let pentagon_points = [...Array(5).keys()]
            .map(i => [r * Math.cos(degreesToRadians(90 - 72 * i)), r * Math.sin(degreesToRadians(90 - 72 * i))]);

        viz.append("g")
            .selectAll("line")
            .data(pentagon_points)
            .enter()
            .append("line")
            .classed("separator", true)
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", p => p[0])
            .attr("y2", p => p[1]);

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

        viz.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", node_r)
            .classed("database-node-circle", true)
            .classed("database-node-circle-todo", this.props.database_defined)
            .classed("database-node-circle-initialized", !this.props.database_defined);

        if (!this.props.database_defined) {
            viz.append("text")
                .attr("x", 0)
                .attr("y", 0)
                .classed("database-node-circle-todo-label", true)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .text('+');
        }

        if (this.props.database_defined) {
            // TODO: pass in a database icon.
        } else {
            // TODO: pass in a plus icon.
        }

        for (let cls of Object.keys(this.props.contents)) {

            let location = this.props.order.findIndex(e => e.type === cls);
            this.props.contents[cls].forEach((item, item_idx) => {
                console.log('About to graph ', item);

                let [cx, cy] = nodePosition(item_idx, location, 80);
                let rgb = this.props.order[location].rgb;

                viz.append("circle")
                    .attr("cx", cx)
                    .attr("cy", cy)
                    .attr("r", node_r)
                    .attr("fill", `rgba(${rgb},0.8)`)
                    .attr("stroke", `rgb(${rgb})`)
                    .attr("stroke-width", "2px")
                    .attr('transform', 'scale(1, -1)')
                    .classed("node-circle", true);
            });
        }

        // Rough to-do:
        // Re-add database node.
        // Specialize areas with color codes.
        // Make nodes click-able.
        // Introduce buttons for adding nodes.
        // Implement adding nodes.
        // Mock a sharer.
        // Introduce turn-it-on central node functionality.
        // Implement a backend.
        // Make the sharer functional using the backend.
        // Warn of unsaved progress on exit. Save in-progress graphs to cookie?
    }

    componentDidMount() {
        this.build();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.count_contents !== this.props.count_contents) {
            console.log("FOO");
            return true;
        }
        return false;
    }

    render() {
        this.build();
        return <svg className={"graph-viz"} viewBox={"-400 -400 800 800"} ref={node => this.node = node}>
        </svg>
    }
}


export default Graph;