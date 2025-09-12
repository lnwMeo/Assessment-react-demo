// src/hooks/useEmployeesMock.ts
import { useEffect, useState } from "react";
import { employeesMock } from "@/mocks/employees";
import type { Employee } from "@/mocks/employees";

type Options = {
  query?: string;
  team?: Employee["team"];
  limit?: number;
  delayMs?: number;
};

export function useEmployeesMock(opts: Options = {}) {
  const { query = "", team, limit, delayMs = 400 } = opts;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const q = query.trim().toLowerCase();
      let rows = employeesMock;

      if (team) rows = rows.filter((e) => e.team === team);
      if (q) {
        rows = rows.filter(
          (e) =>
            e.fullName.toLowerCase().includes(q) ||
            e.team.toLowerCase().includes(q)
        );
      }
      if (limit) rows = rows.slice(0, limit);

      setData(rows);
      setLoading(false);
    }, delayMs);

    return () => clearTimeout(t);
  }, [query, team, limit, delayMs]);

  return { data, loading };
}

export function groupByTeam(rows: Employee[]) {
  return rows.reduce((acc, e) => {
    (acc[e.team] ||= []).push(e);
    return acc;
  }, {} as Record<Employee["team"], Employee[]>);
}
