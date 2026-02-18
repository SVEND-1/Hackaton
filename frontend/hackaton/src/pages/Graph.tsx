import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Node {
    id: string;
    name: string;
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

interface Link {
    source: string;
    target: string;
}

export default function Graph() {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const nodes: Node[] = [
        { id: "node1", name: "Агент 1" },
        { id: "node2", name: "Агент 2" },
    ];

    const links: Link[] = [
        { source: "node1", target: "node2" },
    ];

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 400;
        const height = 300;

        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#222")
            .style("border-radius", "8px");

        const simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg
            .append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "orange")
            .attr("stroke-width", 2);

        const node = svg
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 20)
            .attr("fill", "skyblue")
            .call(
                d3
                    .drag<SVGCircleElement, Node>()
                    .on("start", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on("end", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        const text = svg
            .append("g")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", 5)
            .attr("fill", "#fff")
            .text((d) => d.name);

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

            text.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
        });

        // Правильный деструктор для useEffect
        return () => {
            simulation.stop(); // просто вызываем, ничего не возвращаем
        };
    }, []);

    return <svg ref={svgRef}></svg>;
}
