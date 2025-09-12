"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useBudgetGroupMock } from "@/hooks/useBudgetGroupMock"

export const description = "A bar chart with a custom label"

const chartConfig = {
  budget: { label: "งบประมาณ (บาท)", color: "var(--primary)" },
  label: { color: "var(--background)" },
} satisfies ChartConfig

export function ChartBarLabelCustom() {
  const { data, loading, totalBudget } = useBudgetGroupMock({
    group: "งานเครือข่าย",
    sortDir: "desc",

  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>งานเครือข่าย</CardTitle>
        <CardDescription>งบประมาณการให้บริการ</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ right: 20 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="agency"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => String(value).slice(0, 3)}
              hide
            />
            <XAxis dataKey="budget" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

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
                formatter={(v: number) => v.toLocaleString("th-TH")}
              />
            </Bar>
          </BarChart>
        </ChartContainer>

        {loading && (
          <div className="mt-2 text-xs text-muted-foreground">
            กำลังโหลดข้อมูลจำลอง…
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          ยอดงบการให้บริการรวม : {totalBudget.toLocaleString("th-TH")} บาท
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          ตัวเลขประมาณการล่าสุด
        </div>
      </CardFooter>
    </Card>
  )
}
