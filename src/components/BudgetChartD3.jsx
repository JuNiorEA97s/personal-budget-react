import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getBudget } from "../api/budgetApi";

export default function BudgetChartD3() {
  const ref = useRef(null);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getBudget()
      .then((data) => setItems(data.myBudget || []))
      .catch((e) => setErr(e?.message || String(e)));
  }, []);

  useEffect(() => {
    if (!items.length || !ref.current) return;
    const el = ref.current;
    el.innerHTML = "";

    const width = 640, height = 360;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const svg = d3.select(el).append("svg").attr("width", width).attr("height", height);

    const x = d3.scaleBand()
      .domain(items.map(d => d.title))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(items, d => d.budget) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append("g").attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(x));
    svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y));

    svg.append("g")
      .selectAll("rect")
      .data(items)
      .join("rect")
      .attr("x", d => x(d.title))
      .attr("y", d => y(d.budget))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.budget));
  }, [items]);

  if (err) return <div style={{color: 'crimson'}}>D3 error: {err}</div>;
  if (!items.length) return <div>Loading D3 chart…</div>;

  return (
    <div>
      <h3>D3 – Bar</h3>
      <div ref={ref} />
    </div>
  );
}

