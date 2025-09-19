"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// import { useBudgetGroupsMock } from "@/hooks/useBudgetGroupsMock"  
import { useBudgetGroupsMock } from "@/hooks/useBudgetGroupMock"

const chartConfig: ChartConfig = {
  budget: { label: "งบประมาณ (บาท)", color: "var(--primary)" },
  label:  { color: "var(--background)" },
}

export default function ChartBarLabelCustom() {
  const { data, loading, totals } = useBudgetGroupsMock({ sortDir: "desc" })
  const groups = data ?? []

  if (loading && groups.length === 0) {
    return <div className="text-sm text-muted-foreground">กำลังโหลดข้อมูล…</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3 w-full">
      {groups.map((g) => (
        <BudgetGroupCard
          key={g.group}
          title={g.group}
          items={g.items}
          total={totals.byGroup[g.group] ?? 0}
        />
      ))}
    </div>
  )
}

type BudgetItem = { agency: string; budget: number }
function BudgetGroupCard({
  title, items, total,
}: { title: string; items: BudgetItem[]; total: number }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>งบประมาณการให้บริการ</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={items} layout="vertical" margin={{ right: 20 }}>
            <CartesianGrid horizontal={true} />
            <YAxis dataKey="agency" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey="budget" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="budget" layout="vertical" fill="var(--primary)" radius={4}>
              <LabelList
                dataKey="agency"
                position="insideLeft"
                offset={10}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="budget"
                position="right"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          ยอดรวม: {total.toLocaleString("th-TH")} บาท <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">ตัวเลขประมาณการล่าสุด</div>
      </CardFooter>
    </Card>
  )
}
