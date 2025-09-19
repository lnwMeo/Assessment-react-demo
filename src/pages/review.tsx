"use client"

import * as React from "react"
import { useLocation } from "react-router-dom"
import { decodePayload } from "@/lib/review-link"
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IconStar, IconStarFilled, IconCalendar, IconCircleCheckFilled } from "@tabler/icons-react"

type ReviewPayload = {
  prefix?: string
  fullName?: string
  affiliation?: string
  providerGroup?: string
  staff?: string[]
  description?: string
  items?: { id: string; name: string; price: number }[]
  total?: number
  photoDataUrl?: string
  createdAt?: string
}

/** สร้าง SVG data URL ใช้แทนรูป (จำลอง) */
function makePlaceholderImage({
  width = 960,
  height = 540,
  title = "ภาพประกอบ (จำลอง)",
  subtitle = "",
}: { width?: number; height?: number; title?: string; subtitle?: string }) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#6EE7F9"/>
        <stop offset="100%" stop-color="#A78BFA"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g fill="#ffffff" font-family="Segoe UI, Roboto, Helvetica, Arial" text-anchor="middle">
      <text x="${width / 2}" y="${height / 2 - 8}" font-size="28" font-weight="700">${title}</text>
      <text x="${width / 2}" y="${height / 2 + 24}" font-size="16" opacity="0.85">${subtitle}</text>
    </g>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// --- ข้อมูลจำลอง (fallback) ---
const MOCK_PAYLOAD: ReviewPayload = {
  prefix: "นาย",
  fullName: "ตัวอย่าง ผู้รับบริการ",
  affiliation: "สำนักคอมพิวเตอร์",
  providerGroup: "งานเครือข่าย",
  staff: ["สมชาย ใจดี", "วรินทร์ พัฒน์"],
  description: "ขอติดตั้งจุดกระจายสัญญาณเพิ่มเติมที่อาคาร A ชั้น 3 พื้นที่หน้าห้องประชุม\nต้องการภายในสัปดาห์นี้ ",
  items: [
    { id: "i-1", name: "สายแลน CAT6 (10 เมตร)", price: 250 },
    { id: "i-2", name: "ปลั๊กพ่วงมาตรฐาน 6 ช่อง", price: 520 },
  ],
  total: 770,
  createdAt: new Date().toISOString(),
}

const QUESTIONS = [
  { id: "q1", label: "ความรวดเร็วในการให้บริการ" },
  { id: "q2", label: "ความสุภาพของผู้ให้บริการ" },
  { id: "q3", label: "ความพึงพอใจโดยรวม" },
]

// ⭐ กดดาวให้คะแนน (รองรับ disabled)
function StarRating({
  value,
  onChange,
  max = 5,
  disabled = false,
}: {
  value: number
  onChange: (v: number) => void
  max?: number
  disabled?: boolean
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
        const filled = n <= value
        return (
          <button
            key={n}
            type="button"
            onClick={() => !disabled && onChange(n)}
            aria-label={`${n} ดาว`}
            className="p-0.5 disabled:opacity-50"
            disabled={disabled}
          >
            {filled ? (
              <IconStarFilled className="text-yellow-500" />
            ) : (
              <IconStar className="text-yellow-500" />
            )}
          </button>
        )
      })}
    </div>
  )
}

const fmtTHB = (n = 0) => n.toLocaleString("th-TH")

export default function ReviewPage() {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const encoded = search.get("d") || undefined
  const token = search.get("t") || undefined

  const fromQuery = React.useMemo(() => (encoded ? decodePayload(encoded) : null), [encoded])
  const incoming = (location.state || {}) as ReviewPayload
  const data: ReviewPayload =
    (fromQuery && Object.keys(fromQuery).length > 0 && fromQuery) ||
    (incoming && Object.keys(incoming).length > 0 && incoming) ||
    MOCK_PAYLOAD

  const photoUrl = React.useMemo(
    () =>
      data.photoDataUrl ??
      makePlaceholderImage({
        title: "ภาพประกอบ (จำลอง)",
        subtitle: data.providerGroup ? `กลุ่มงาน: ${data.providerGroup}` : (data.affiliation ?? ""),
      }),
    [data.photoDataUrl, data.providerGroup, data.affiliation]
  )

  // ===== กันประเมินซ้ำฝั่ง client ด้วย localStorage =====
  const storageKey = React.useMemo(() => {
    if (token) return `reviewed:token:${token}`
    if (encoded) return `reviewed:d:${encoded}`
    return undefined
  }, [token, encoded])

  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    if (storageKey && localStorage.getItem(storageKey) === "1") {
      setSubmitted(true)
    }
  }, [storageKey])

  // ===== state ของแบบประเมิน =====
  const [ratings, setRatings] = React.useState<Record<string, number>>(
    () => Object.fromEntries(QUESTIONS.map((q) => [q.id, 0]))
  )
  const [comment, setComment] = React.useState("")
  const [confirmed, setConfirmed] = React.useState(false)
  const [reviewerName, setReviewerName] = React.useState("")
  const [reviewerTitle, setReviewerTitle] = React.useState("")

  const allRated = React.useMemo(
    () => QUESTIONS.every((q) => (ratings[q.id] ?? 0) > 0),
    [ratings]
  )
  const canSubmit =
    allRated && confirmed && reviewerName.trim() !== "" && reviewerTitle.trim() !== ""

  function handleSubmit() {
    if (!canSubmit) return
    const result = {
      ratings,
      comment,
      confirmed,
      reviewerName,
      reviewerTitle,
      evaluatedAt: new Date().toISOString(),
      ref: data,
      token,
    }
    console.log("REVIEW SUBMIT:", result)

    // ✅ กันประเมินซ้ำ: เซ็ต flag ใน localStorage
    if (storageKey) localStorage.setItem(storageKey, "1")

    // ✅ ปิดหน้าแบบประเมิน แสดงหน้า "ขอบคุณ"
    setSubmitted(true)

    // ⚠️ โปรดเชื่อมต่อ API จริงในโลกจริง:
    // await fetch('/api/submit-review',{method:'POST', body: JSON.stringify(result)})
    // ฝั่งเซิร์ฟเวอร์ควร mark token ว่าใช้แล้ว / เพิ่ม uses_count
  }

  // ======== โหมดขอบคุณ (ซ่อนแบบประเมินทั้งหมด) ========
  if (submitted) {
    return (
      <div className="mx-auto max-w-md p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <IconCircleCheckFilled className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>ขอบคุณที่ใช้บริการ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ระบบได้รับผลการประเมินของคุณเรียบร้อยแล้ว
            </p>
            {/* <div className="flex items-center justify-center gap-2">
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                กลับหน้าแรก
              </Button>
              <Button onClick={() => window.print()}>พิมพ์ใบยืนยัน</Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    )
  }

  // ======== โหมดแสดงแบบประเมินปกติ ========
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* หัวเรื่อง + เมตา */}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">แบบประเมินความพึงพอใจ</h1>
          <p className="text-sm text-muted-foreground">
            โปรดตรวจสอบรายละเอียดบริการ และให้คะแนนตามความเป็นจริง
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <IconCalendar className="size-4" />
          <span>
            วันที่สร้าง:{" "}
            {data.createdAt ? new Date(data.createdAt).toLocaleString("th-TH") : "-"}
          </span>
        </div>
      </div>

      {/* รายละเอียดงาน */}
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>รายละเอียดงานสำหรับประเมิน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="text-sm">
                  <span className="font-medium">ผู้รับบริการ: </span>
                  {`${data.prefix ?? ""} ${data.fullName ?? ""}`.trim() || "-"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">สังกัด: </span>
                  {data.affiliation ?? "-"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">กลุ่มงานที่ให้บริการ: </span>
                  <span>{data.providerGroup ?? "-"}</span>
                </div>

                {Array.isArray(data.staff) && data.staff.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 text-sm">
                    <span className="mr-1 font-medium">ผู้ปฏิบัติงาน:</span>
                    {data.staff.map((s, i) => (
                      <Badge key={`${s}-${i}`} variant="outline" className="text-sm">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* รูป */}
                 <span className="font-medium text-sm">รูปภาพการทำงาน </span>
                <div className="flex justify-center">
                  {photoUrl && (
                    <div className="max-w-md space-y-4 rounded-md border p-1">
                      <img
                        src={photoUrl}
                        alt="ภาพแนบ"
                        className="h-48 w-full rounded object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>

              {data.description && (
                <>
                  <Separator />
                  <div className="space-y-1 text-sm">
                    <div className="font-medium">รายละเอียดของงาน (พอสังเขป)</div>
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {data.description}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* รายการวัสดุ/อุปกรณ์ */}
          {Array.isArray(data.items) && data.items.length > 0 && (
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
                      {data.items.map((it) => (
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
                  <span className="tabular-nums font-semibold">{fmtTHB(data.total ?? 0)}</span>{" "}
                  บาท
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* แบบประเมินกดดาว + ความเห็น */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>ให้คะแนนความพึงพอใจ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="flex items-center justify-between gap-4 rounded-md border p-3">
                  <div className="text-sm">{q.label}</div>
                  <StarRating
                    value={ratings[q.id] ?? 0}
                    onChange={(v) => setRatings((s) => ({ ...s, [q.id]: v }))}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="comment">ข้อเสนอแนะเพิ่มเติม (ถ้ามี)</Label>
                <Textarea
                  id="comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="พิมพ์ความคิดเห็นเพิ่มเติม"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* บล็อกยืนยัน */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>ยืนยันการรับบริการ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox id="confirm" checked={confirmed} onCheckedChange={(v) => setConfirmed(!!v)} />
                <Label htmlFor="confirm" className="text-sm">ยืนยันว่ารับบริการจริง</Label>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="reviewerName">ชื่อผู้ประเมิน</Label>
                  <Input
                    id="reviewerName"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="กรอกชื่อผู้ประเมิน"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="reviewerTitle">ตำแหน่ง</Label>
                  <Input
                    id="reviewerTitle"
                    value={reviewerTitle}
                    onChange={(e) => setReviewerTitle(e.target.value)}
                    placeholder="กรอกตำแหน่ง"
                  />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  กลับไปด้านบน
                </Button>
                <Button onClick={handleSubmit} disabled={!canSubmit}>
                  ยืนยันส่งผลประเมิน
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
