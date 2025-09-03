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
import type { ChartConfig } from "@/components/ui/chart";
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a custom label"

const chartData = [
  { month: "คณะสาธารณสุขศาสตร์", desktop: 255, mobile: 80 },
  { month: "คณะพยาบาลศาสตร์", desktop: 1700, mobile: 200 },
  { month: "คณะเทคโนโลยีอุตสาหกรรม", desktop: 360, mobile: 120 },
  { month: "สำนักการเรียนรู้ตลอดชีวิต", desktop: 18000, mobile: 190 },
  { month: "สำนักงานอธิการบดี (กองบริหารงานบุคคล)", desktop: 209, mobile: 130 },
  { month: "สำนักคอมพิวเตอร์", desktop: 3214, mobile: 140 },
  { month: "คณะครุศาสตร์", desktop: 2134, mobile: 140 },
  { month: "คณะมนุษยศาสตร์และสังคมศาสตร์", desktop: 214, mobile: 140 },
  { month: "คณะวิทยาศาสตร์และเทคโนโลยี", desktop: 2154, mobile: 140 },
  { month: "โรงเรียนสาธิตฯ ฝ่ายมัธยม", desktop: 5000, mobile: 140 },
  { month: "สถาบันวิจัยไม้กลายเป็นหิน", desktop: 29909, mobile: 130 },
  { month: "สำนักงานอธิการบดี (กองกลาง)", desktop: 2104, mobile: 140 },
  { month: "สำนักงานอธิการบดี (กองกิจการพิเศษ)", desktop: 21004, mobile: 140 },
  { month: "สำนักงานอธิการบดี (กองอาคารสถานที่และบริการ)", desktop: 214, mobile: 140 },
  { month: "สำนักงานอธิการบดี (กองกฎหมาย)", desktop: 2014, mobile: 140 },
  { month: "สำนักศิลปะและวัฒนธรรม", desktop: 2184, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function ChartBarLabelCustom() {
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
            data={chartData}
            layout="vertical"
            margin={{
              right: 20,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="desktop" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="desktop"
              layout="vertical"
              fill="var(--chart-1)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={10}
                className="fill-(--color-label) "
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={10}
                className="fill-foreground "
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          ยอดงบการให้บริการรวม : 120,000 บาท <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          ตัวเลขประมาณการล่าสุด
        </div>
      </CardFooter>
    </Card>
  )
}
