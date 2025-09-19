// src/pages/admin/JobDetailPage.tsx
import * as React from "react"
import { IconStarFilled, IconCalendar } from "@tabler/icons-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { downloadJobReviewPdf, type JobDetail } from "@/components/pdf/JobReviewPdf"

const fmtTHB = (n = 0) => n.toLocaleString("th-TH")

// —— ข้อมูลจำลอง (Mock) ——
const MOCK_JOB: JobDetail = {
  id: "rvw_abc123",
  header: "ติดตั้ง Access Point ชั้น 3 อาคาร A",
  status: "Done",
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 ชม.ก่อน
  usedAt: new Date().toISOString(),
  payload: {
    prefix: "นาย",
    fullName: "ตัวอย่าง ผู้รับบริการ",
    affiliation: "สำนักคอมพิวเตอร์",
    providerGroup: "งานเครือข่าย",
    staff: ["สมชาย ใจดี", "วรินทร์ พัฒน์"],
    description:
      "ขอติดตั้งจุดกระจายสัญญาณเพิ่มหน้า ห้องประชุมชั้น 3\nทดสอบความเร็วและความครอบคลุม หลังติดตั้ง",
    items: [
      { id: "i1", name: "สายแลน CAT6 (10 เมตร)", price: 250 },
      { id: "i2", name: "ปลั๊กพ่วง 6 ช่อง", price: 520 },
    ],
    total: 770,
    photoDataUrl: undefined,
  },
  review: {
    ratings: {
      "ความรวดเร็วในการให้บริการ": 4,
      "ความสุภาพของผู้ให้บริการ": 5,
      "ความพึงพอใจโดยรวม": 4,
    },
    comment: "บริการดีมาก รวดเร็ว แนะนำปรับตำแหน่ง AP อีกเล็กน้อย",
    reviewerName: "น.ส. ผู้ประเมิน งานทั่วไป",
    reviewerTitle: "เจ้าหน้าที่",
    submittedAt: new Date().toISOString(),
  },
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: value }).map((_, i) => (
        <IconStarFilled key={i} className="text-yellow-500" />
      ))}
    </div>
  )
}

export default function JobDetailPage() {
  // ตอนนี้ใช้ MOCK_JOB ไปก่อน (ภายหลังค่อยเปลี่ยนมา fetch จาก backend)
  const job = MOCK_JOB
  const avg =
    job.review && Object.values(job.review.ratings).length
      ? (
          Object.values(job.review.ratings).reduce((a, b) => a + b, 0) /
          Object.values(job.review.ratings).length
        ).toFixed(1)
      : "-"

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      {/* Header + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">รายละเอียดงาน</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IconCalendar className="size-4" />
            <span>
              วันที่สร้าง: {new Date(job.createdAt).toLocaleString("th-TH")}
            </span>
            {job.usedAt && (
              <>
                <span>•</span>
                <span>ยืนยันผล: {new Date(job.usedAt).toLocaleString("th-TH")}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={job.status === "Done" ? "default" : "secondary"}>
            {job.status === "Done" ? "ยืนยันงานแล้ว" : job.status}
          </Badge>
         
        </div>
      </div>

      {/* ข้อมูลงาน */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{job.header}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-1 text-sm">
            <div>
              <b>ผู้รับบริการ:</b>{" "}
              {`${job.payload.prefix ?? ""} ${job.payload.fullName ?? ""}`.trim() || "-"}
            </div>
            <div>
              <b>สังกัด:</b> {job.payload.affiliation ?? "-"}
            </div>
            <div>
              <b>กลุ่มงาน:</b> {job.payload.providerGroup ?? "-"}
            </div>
            {job.payload.staff?.length ? (
              <div className="flex flex-wrap gap-1">
                <b className="mr-1">ผู้ปฏิบัติงาน:</b>
                <span>{job.payload.staff.join(", ")}</span>
              </div>
            ) : null}
          </div>

          {job.payload.description && (
            <>
              <Separator />
              <div className="space-y-1">
                <div className="font-medium">รายละเอียดของงาน</div>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {job.payload.description}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* รายการวัสดุ/อุปกรณ์ */}
      {job.payload.items?.length ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>รายการวัสดุ/อุปกรณ์</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รายการ</TableHead>
                    <TableHead className="w-40 text-right">ราคา (บาท)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {job.payload.items.map((it) => (
                    <TableRow key={it.id}>
                      <TableCell className="truncate">{it.name}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {fmtTHB(it.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="text-right text-sm">
              ยอดรวม:{" "}
              <span className="font-semibold tabular-nums">
                {fmtTHB(job.payload.total ?? 0)}
              </span>{" "}
              บาท
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* ผลประเมิน */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>ผลประเมิน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {job.review ? (
            <>
              {Object.entries(job.review.ratings).map(([q, v]) => (
                <div key={q} className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <div>{q}</div>
                  <div className="flex items-center gap-2">
                    <Stars value={v} />
                    <span>{v} ดาว</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-md border p-2 text-sm">
                <div className="font-medium">คะแนนรวมเฉลี่ย</div>
                <div className="font-semibold">{avg} ★</div>
              </div>
              <Separator />
                 {job.review.comment ? (
                <div className="text-sm">
                  <b>ข้อเสนอแนะ:</b> {job.review.comment}
                </div>
              ) : null}
              <Separator />
              <div className="grid gap-1 text-sm">
                <div>
                  <b>ผู้ประเมิน:</b> {job.review.reviewerName} ({job.review.reviewerTitle})
                </div>
                <div className="text-muted-foreground">
                  เวลาส่งผล: {new Date(job.review.submittedAt).toLocaleString("th-TH")}
                </div>
              </div>
    <Separator />
               <Button size="sm" onClick={() => downloadJobReviewPdf(job)}>Export PDF</Button>
           
            </>
          ) : (
            <div className="text-sm text-muted-foreground">ยังไม่มีผลประเมิน</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
