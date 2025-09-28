import { useEffect, useState } from "react";
import { getBudget } from "../api/budgetApi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function BudgetChartJS() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getBudget()
      .then((data) => setItems(data.myBudget || []))
      .catch((e) => setErr(e?.message || String(e)));
  }, []);

  if (err) return <div style={{color: 'crimson'}}>ChartJS error: {err}</div>;
  if (!items.length) return <div>Loading budget…</div>;

  const labels = items.map(i => i.title);
  const values = items.map(i => i.budget);
  const options = { responsive: true, maintainAspectRatio: false };

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h3>ChartJS – Doughnut</h3>
        <div style={{ width: 480, height: 320 }}>
          <Doughnut data={{ labels, datasets: [{ data: values }] }} options={options} />
        </div>
      </div>
      <div>
        <h3>ChartJS – Bar</h3>
        <div style={{ width: 640, height: 360 }}>
          <Bar data={{ labels, datasets: [{ label: "Budget", data: values }] }} options={options} />
        </div>
      </div>
    </div>
  );
}
