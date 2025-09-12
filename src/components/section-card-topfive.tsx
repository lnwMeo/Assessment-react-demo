import { Button } from "./ui/button"
import { NavLink } from "react-router-dom"
import { useTopEmployeesMock } from "@/hooks/useTopEmployeesMock"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  // CardAction,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const SkeletonCard = () => (
  <div className="sm:max-w-2xs w-full">
    <div className="block w-full p-4 border border-accent/50 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 shrink-0 rounded-md bg-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-gray-200/70 rounded animate-pulse" />
          <div className="h-3 w-32 bg-gray-200/70 rounded animate-pulse" />
          <div className="h-5 w-20 bg-gray-200/70 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const SectionCrdtopFive = () => {
  const { data, loading } = useTopEmployeesMock(600);
  const employees = data ?? [];

  return (
    <><section>
      <div className="flex items-center justify-between mt-4 mb-2">
        <h1 className="text-sm font-medium text-foreground">
          พนักงานที่ยอดปิดงานสูงสุด 5 อันดับ
        </h1>
        <div className="flex gap-2">

          <Select>
            <SelectTrigger >
              <SelectValue placeholder="ประจำเดือน" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger >
              <SelectValue placeholder="ประจำปี" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>


          <Button asChild variant="ghost" size="sm">
            <NavLink to="/employee">
              ดูทั้งหมด
            </NavLink>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4 items-center">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading && employees.length === 0 && (
          <div className="text-sm text-muted-foreground col-span-full">
            ยังไม่มีข้อมูล
          </div>
        )}

        {!loading &&
          employees.map((emp) => (
      

            <Card key={emp.id} className="w-full max-w-sm ">
              <CardHeader >
                <div className="flex flex-col gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={emp.avatarUrl}
                    />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <CardTitle> {emp.name}</CardTitle>
                  <CardDescription>
                    กลุ่มงาน {emp.team}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardFooter className="flex-col gap-2">
                <div className="w-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-sm px-2 py-4">
                  <div className="grid grid-cols-2 place-items-center">
                    <div className="flex flex-col items-center text-center">
                      <p className="text-sm font-medium">จำนวนงาน</p>
                      <p className="text-xl font-bold"> {emp.totalClosed}</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <p className="text-sm font-medium">คะแนนรวม</p>
                      <p className="text-xl font-bold">4.9 / 5</p>
                    </div>
                  </div>
                </div>
              </CardFooter>

            </Card>
          ))}

       
      </div>
    </section></>
  )
}
export default SectionCrdtopFive