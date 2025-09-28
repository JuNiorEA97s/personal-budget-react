import axios from "axios";

export async function getBudget() {
  try {
    const res = await axios.get("/budget", { headers: { Accept: "application/json" } });
    console.log("[getBudget] backend OK:", res.status, res.data);
    return res.data; 
  } catch (e) {
    console.warn("[getBudget] backend failed, falling back to /budget.json:", e?.message);
    const res = await axios.get("/budget.json");
    console.log("[getBudget] fallback OK:", res.status, res.data);
    return res.data;
  }
}
