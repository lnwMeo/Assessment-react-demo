// src/pages/employee.tsx (หรือไฟล์ที่คุณวาง component นี้)
import { useMemo, useState } from "react";
import {
  CardMini,
  CardDescriptionMini,
  CardFooterMini,
  CardHeaderMini,
  CardTitleMini,
} from "@/components/ui/card-mini";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEmployeesMock, groupByTeam } from "@/hooks/useEmployeesMock";
import type { Employee } from "@/mocks/employees";
import { Link } from "react-router-dom";
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

const EmployeePage = () => {
  const [query, setQuery] = useState("");
  const { data, loading } = useEmployeesMock({ query }); // ใส่ team/limit ได้ตามต้องการ
  const grouped = useMemo(() => groupByTeam(data), [data]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-sm">พนักงานทั้งหมด</div>
        <Link to="/">
          <Button variant="outline" size="sm">กลับ</Button>
        </Link>
      </div>

      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2 mt-2 ">
        <div className="flex gap-2">
          <label htmlFor="table-search-users" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              id="table-search-users"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block p-2 ps-10 text-sm text-gray-900 border border-accent rounded-lg w-80 bg-accent/50 dark:bg-accent/50 focus:ring-blue-500 focus:border-accent dark:border-accent dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent"
              placeholder="ค้นหาพนักงานหรือกลุ่มงาน"
            />
          </div>
        </div>
      </div>

      {/* Loading state แบบง่าย ๆ */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-40 rounded-sm bg-accent/30 animate-pulse" />
          ))}
        </div>
      )}

      {!loading &&
        Object.entries(grouped).map(([team, members]) => (
          <section key={team} className="mt-2">
            <p className="text-base font-bold">กลุ่มงาน {team}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4 items-center">
              {members.map((emp: Employee) => (
                <CardMini className="w-full max-w-sm" key={emp.id}>
                  <CardHeaderMini>
                    <div className="flex flex-col gap-4 items-center">
                      <Avatar>
                        <AvatarImage src={emp.avatarUrl} alt={emp.fullName} />
                        <AvatarFallback>{initials(emp.fullName)}</AvatarFallback>
                      </Avatar>
                      <CardTitleMini>{emp.fullName}</CardTitleMini>
                      <CardDescriptionMini>
                        กลุ่มงาน {emp.team}
                      </CardDescriptionMini>
                    </div>
                  </CardHeaderMini>

                  <CardFooterMini className="flex-col gap-2">
                    <div className="w-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-sm px-2 py-4">
                      <div className="grid grid-cols-2 place-items-center">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-sm font-medium">จำนวนงาน</p>
                          <p className="text-xl font-bold">{emp.taskCount}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <p className="text-sm font-medium">คะแนนรวม</p>
                          <p className="text-xl font-bold">
                            {emp.avgScore.toFixed(1)} / 5
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardFooterMini>
                </CardMini>
              ))}
            </div>
          </section>
        ))}
    </>
  );
};

export default EmployeePage;
