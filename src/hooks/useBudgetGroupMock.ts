import { useEffect, useMemo, useState } from "react"
import { budgetGroupsMock, type BudgetGroup } from "@/mocks/budget-groups"

type Options = {
  groups?: string[]
  delayMs?: number
  sortDir?: "asc" | "desc"
}

export function useBudgetGroupsMock({
  groups,
  delayMs = 400,
  sortDir = "desc",
}: Options = {}) {
  const [data, setData] = useState<BudgetGroup[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      let res = budgetGroupsMock

      if (groups?.length) {
        res = res.filter((g) => groups.includes(g.group))
      }

      res = res.map((g) => ({
        ...g,
        items: [...g.items].sort((a, b) =>
          sortDir === "asc" ? a.budget - b.budget : b.budget - a.budget
        ),
      }))

      setData(res)
      setLoading(false)
    }, delayMs)

    return () => clearTimeout(t)
  }, [delayMs, sortDir, groups?.join("|")])

  const totals = useMemo(() => {
    if (!data) return { byGroup: {} as Record<string, number>, overall: 0 }
    const byGroup: Record<string, number> = {}
    let overall = 0
    data.forEach((g) => {
      const sum = g.items.reduce((s, i) => s + i.budget, 0)
      byGroup[g.group] = sum
      overall += sum
    })
    return { byGroup, overall }
  }, [data])

  const flatItems = useMemo(() => {
    if (!data) return []
    return data.flatMap((g) =>
      g.items.map((i) => ({ ...i, group: g.group }))
    )
  }, [data])

  return { data, loading, totals, flatItems }
}
