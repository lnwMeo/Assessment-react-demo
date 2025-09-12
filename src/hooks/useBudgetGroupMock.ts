// src/hooks/useBudgetGroupMock.ts
import { useEffect, useMemo, useState } from "react";
import { budgetGroupsMock } from "@/mocks/budget-groups";
import type { AgencyDatum } from "@/mocks/budget-groups";

type Options = {
  group?: string;
  query?: string;
  sortDir?: "asc" | "desc";
  limit?: number;
  delayMs?: number;
};

export function useBudgetGroupMock(opts: Options = {}) {
  const {
    group,
    query = "",
    sortDir = "desc",
    limit,
    delayMs = 300,
  } = opts;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AgencyDatum[]>([]);

  const groups = useMemo(() => budgetGroupsMock.map((g) => g.group), []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const activeGroup =
        budgetGroupsMock.find((g) => g.group === group) ?? budgetGroupsMock[0];

      let rows = [...activeGroup.items];

      const q = query.trim().toLowerCase();
      if (q) rows = rows.filter((r) => r.agency.toLowerCase().includes(q));

      // เรียงตาม budget เสมอ
      rows.sort((a, b) =>
        sortDir === "asc" ? a.budget - b.budget : b.budget - a.budget
      );

      if (limit) rows = rows.slice(0, limit);

      setData(rows);
      setLoading(false);
    }, delayMs);

    return () => clearTimeout(t);
  }, [group, query, sortDir, limit, delayMs]);

  const totalBudget = useMemo(
    () => data.reduce((s, r) => s + r.budget, 0),
    [data]
  );

  return { data, loading, groups, totalBudget };
}
