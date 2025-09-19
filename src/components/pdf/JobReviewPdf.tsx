// src/components/pdf/JobReviewPdf.tsx
import { pdf, Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer"

Font.register({
  family: "NotoSansThai",
  fonts: [
    { src: "/fonts/NotoSansThai-VariableFont_wdth,wght.ttf", fontWeight: "normal" },
    { src: "/fonts/NotoSansThai-VariableFont_wdth,wght.ttf", fontWeight: "bold" },
  ],
})
Font.registerHyphenationCallback((w) => [w])

export type JobPayload = {
  prefix?: string
  fullName?: string
  affiliation?: string
  providerGroup?: string
  staff?: string[]
  description?: string
  items?: { id: string; name: string; price: number }[]
  total?: number
  photoDataUrl?: string
}
export type JobReview = {
  ratings: Record<string, number>
  comment?: string | null
  reviewerName: string
  reviewerTitle: string
  submittedAt: string
}
export type JobDetail = {
  id: string
  header: string
  status: "Done" | "In Progress" | "Not Started"
  createdAt: string
  usedAt: string | null
  payload: JobPayload
  review: JobReview | null
}

/** ---------- Placeholders (โลโก้/ภาพทำงานจำลอง) ---------- */
function svgDataUrl(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
function makeLogoPlaceholder(size = 40) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="100%" stop-color="#b91c1c"/>
      </linearGradient>
    </defs>
    <rect rx="${size/6}" width="${size}" height="${size}" fill="url(#g)"/>
    <g font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${size*0.36}" fill="#fff">
      <text x="50%" y="58%" text-anchor="middle">ICT</text>
    </g>
  </svg>`
  return svgDataUrl(svg)
}
function makeWorkflowPlaceholder({
  width = 960,
  height = 300,
  title = "แผนภาพขั้นตอนการทำงาน (จำลอง)",
  subtitle = "รับคำขอ → จัดทีม → ดำเนินงาน → ประเมินผล → ปิดงาน",
}: { width?: number; height?: number; title?: string; subtitle?: string } = {}) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#FEF2F2"/>
        <stop offset="100%" stop-color="#FEE2E2"/>
      </linearGradient>
      <linearGradient id="p" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#ef4444"/>
        <stop offset="100%" stop-color="#b91c1c"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <g font-family="Noto Sans Thai, Segoe UI" fill="#111827">
      <text x="${width/2}" y="42" text-anchor="middle" font-size="18" font-weight="700">${title}</text>
      <text x="${width/2}" y="68" text-anchor="middle" font-size="12" opacity="0.8">${subtitle}</text>
    </g>
    ${["รับคำขอ","จัดทีม","ดำเนินงาน","ประเมินผล","ปิดงาน"].map((t,i)=>{
      const gap = (width-160)/4; const x = 80 + i*gap; const y = height/2
      return `
        <circle cx="${x}" cy="${y}" r="28" fill="url(#p)" opacity="0.9"/>
        <text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${t}</text>
        ${i<4?`<line x1="${x+28}" y1="${y}" x2="${x+gap-28}" y2="${y}" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>`:''}
      `
    }).join("")}
  </svg>`
  return svgDataUrl(svg)
}

/** ---------- Theme ---------- */
const COLORS = {
  primary: "#b91c1c",
  primaryDark: "#7f1d1d",
  border: "#ef4444",
  bgSoft: "#FEF2F2",
  text: "#111827",
  muted: "#6b7280",
}

/** ---------- Styles ---------- */
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: "NotoSansThai",
    color: COLORS.text,
    lineHeight: 1.4,
  },

  banner: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerLogo: { width: 28, height: 28, marginRight: 8, borderRadius: 4 },
  bannerTextWrap: { alignItems: "center" },
  bannerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  bannerSub: { color: "#fff", fontSize: 12, marginTop: 2, opacity: 0.95 },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginTop: 12,
    marginBottom: 6,
  },

  /** 👇 กันแตกหน้ากลางกล่อง */
  avoidBreak: { break: "avoid" as any },

  box: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },

  row: { flexDirection: "row" },
  col: { flexGrow: 1, flexBasis: 0 },
  leftCol: { marginRight: 8 },
  rightCol: { marginLeft: 8 },

  label: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  value: { fontSize: 12, marginBottom: 2 },

  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.bgSoft,
    color: COLORS.primaryDark,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.border,
    fontSize: 11,
    marginBottom: 6,
  },

  avgWrap: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    backgroundColor: COLORS.bgSoft,
    marginTop: 6,
  },
  avgLabel: { fontSize: 11, color: COLORS.muted },
  avgScore: { fontSize: 22, color: COLORS.primaryDark, fontWeight: "bold" },

  table: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.border,
    borderRadius: 6,
  },
  tr: { flexDirection: "row" },
  th: {
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: COLORS.primary,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  td: {
    flexGrow: 1,
    flexBasis: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: COLORS.border,
    fontSize: 12,
  },

  small: { fontSize: 10, color: COLORS.muted },
  mt6: { marginTop: 6 },
  divider: { height: 8 },

  imageWide: { width: "100%", height: 160, objectFit: "cover", borderRadius: 6, marginTop: 6 },
})

/** ---------- Utils ---------- */
function th(n?: number) {
  return (n ?? 0).toLocaleString("th-TH")
}
function average(ratings: Record<string, number> = {}) {
  const vals = Object.values(ratings)
  if (!vals.length) return null
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

/** ---------- PDF Doc ---------- */
export function JobReviewPdfDoc({ job }: { job: JobDetail }) {
  const avg = job.review ? average(job.review.ratings) : null
  const logoSrc = makeLogoPlaceholder()
  const workImageSrc = job.payload.photoDataUrl || makeWorkflowPlaceholder({})

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Banner + โลโก้ */}
        <View style={[styles.banner, styles.avoidBreak]}>
          <Image src={logoSrc} style={styles.bannerLogo} />
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>ใบประเมินงาน</Text>
            <Text style={styles.bannerSub}>สำนักคอมพิวเตอร์ มหาวิทยาลัยราชภัฏนครราชสีมา</Text>
          </View>
        </View>

        {/* ข้อมูลสองคอลัมน์ */}
        <View style={styles.row}>
          <View style={[styles.col, styles.leftCol]}>
            <Text style={styles.sectionTitle}>ข้อมูลงาน / ผู้รับบริการ</Text>
            <View style={[styles.box, styles.avoidBreak]}>
              <Text style={styles.label}>หัวข้อบริการ</Text>
              <Text style={styles.value}>{job.header}</Text>

              <Text style={styles.label}>ผู้รับบริการ</Text>
              <Text style={styles.value}>
                {`${job.payload.prefix ?? ""} ${job.payload.fullName ?? ""}`.trim() || "-"}
              </Text>

              <Text style={styles.label}>สังกัด</Text>
              <Text style={styles.value}>{job.payload.affiliation ?? "-"}</Text>

              <Text style={styles.label}>กลุ่มงานที่ให้บริการ</Text>
              <Text style={styles.value}>{job.payload.providerGroup ?? "-"}</Text>

              {job.payload.staff?.length ? (
                <>
                  <Text style={styles.label}>ผู้ปฏิบัติงาน</Text>
                  <Text style={styles.value}>{job.payload.staff.join(", ")}</Text>
                </>
              ) : null}
            </View>
          </View>

          <View style={[styles.col, styles.rightCol]}>
            <Text style={styles.sectionTitle}>สรุปสถานะ</Text>
            <View style={[styles.box, styles.avoidBreak]}>
              <Text style={styles.statusPill}>{job.status === "Done" ? "ยืนยันงานแล้ว" : job.status}</Text>

              <Text style={styles.label}>วันที่สร้าง</Text>
              <Text style={styles.value}>{new Date(job.createdAt).toLocaleString("th-TH")}</Text>

              {job.usedAt ? (
                <>
                  <Text style={styles.label}>ยืนยันเมื่อ</Text>
                  <Text style={styles.value}>{new Date(job.usedAt).toLocaleString("th-TH")}</Text>
                </>
              ) : null}

              <View style={styles.avgWrap}>
                <Text style={styles.avgLabel}>คะแนนรวมเฉลี่ย</Text>
                <Text style={styles.avgScore}>{avg ? avg.toFixed(1) : "-"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ภาพประกอบการทำงาน */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>ภาพประกอบการทำงาน</Text>
        <View style={[styles.box, styles.avoidBreak]}>
          <Text style={styles.small}>หมายเหตุ: แผนภาพนี้เป็นการจำลองเพื่ออธิบายขั้นตอนการให้บริการ</Text>
          <Image src={workImageSrc} style={styles.imageWide} />
        </View>

        {/* ตารางวัสดุ/อุปกรณ์ */}
        {job.payload.items?.length ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>รายการวัสดุ/อุปกรณ์</Text>
            <View style={[styles.table, styles.avoidBreak]}>
              <View style={[styles.tr, styles.avoidBreak]}>
                <Text style={styles.th}>รายการ</Text>
                <Text style={[styles.th, { textAlign: "right" }]}>ราคา (บาท)</Text>
              </View>
              {job.payload.items.map((it) => (
                <View key={it.id} style={[styles.tr, styles.avoidBreak]}>
                  <Text style={styles.td}>- {it.name}</Text>
                  <Text style={[styles.td, { textAlign: "right" }]}>{th(it.price)}</Text>
                </View>
              ))}
              <View style={[styles.tr, styles.avoidBreak]}>
                <Text style={[styles.td, { fontWeight: "bold" }]}>รวม</Text>
                <Text style={[styles.td, { textAlign: "right", fontWeight: "bold" }]}>{th(job.payload.total)}</Text>
              </View>
            </View>
          </>
        ) : null}

        {/* รายละเอียดของงาน */}
        {job.payload.description ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>รายละเอียดของงาน</Text>
            <View style={[styles.box, styles.avoidBreak]}>
              <Text>{job.payload.description}</Text>
            </View>
          </>
        ) : null}

        {/* ผลประเมิน */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>ผลประเมิน</Text>
        {job.review ? (
          <View style={[styles.box, styles.avoidBreak]}>
            {Object.entries(job.review.ratings).map(([q, v]) => (
              <Text key={q}>- {q}: {v} ดาว</Text>
            ))}
            <Text style={styles.mt6}>
              ผู้ประเมิน: {job.review.reviewerName} ({job.review.reviewerTitle})
            </Text>
            <Text style={[styles.small, styles.mt6]}>
              เวลาส่งผลประเมิน: {new Date(job.review.submittedAt).toLocaleString("th-TH")}
            </Text>
            {job.review.comment ? <Text style={styles.mt6}>ข้อเสนอแนะ: {job.review.comment}</Text> : null}
          </View>
        ) : (
          <View style={[styles.box, styles.avoidBreak]}>
            <Text>ยังไม่มีผลประเมิน</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

/** ดาวน์โหลดไฟล์ */
export async function downloadJobReviewPdf(job: JobDetail) {
  const blob = await pdf(<JobReviewPdfDoc job={job} />).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `job-review-${job.id}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
