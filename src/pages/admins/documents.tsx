"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

const STAFF_BY_GROUP: Record<string, { id: string; name: string }[]> = {
  "งานเครือข่าย": [
    { id: "net-01", name: "สมชาย ใจดี" },
    { id: "net-02", name: "วรินทร์ พัฒน์" },
    { id: "net-03", name: "กานต์รวี คุ้มภัย" },
  ],
  "ซ่อมบำรุง": [
    { id: "mt-01", name: "ช่างต้น สุขใจ" },
    { id: "mt-02", name: "ช่างเอ็ดดี้ คล่องแคล่ว" },
  ],
  "อื่นๆ": [],
}

const FormSchema = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  fullName: z.string().min(1, "กรุณากรอกชื่อ - สกุล"),
  affiliation: z.string().min(1, "กรุณาเลือกสังกัด"),
  providerGroup: z.string().min(1, "กรุณาเลือกกลุ่มงานที่ให้บริการ"),
  staff: z.array(z.string()).min(1, "กรุณาเลือกผู้ปฏิบัติงานอย่างน้อย 1 คน"),
  description: z.string().optional(),
  // ไฟล์เดียว หรือไม่ใส่
  photo: z.any().refine(
    (f) => f === undefined || f instanceof File,
    "กรุณาอัปโหลดไฟล์รูปภาพ 1 ไฟล์"
  ),
})

type FormValues = z.infer<typeof FormSchema>
type Item = { id: string; name: string; price: number }

export default function DocumentsForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      prefix: "",
      fullName: "",
      affiliation: "",
      providerGroup: "",
      staff: [],
      description: "",
    },
  })

  // ✅ ทุก Hook ต้องอยู่ "ภายใน" คอมโพเนนต์ และหลัง useForm
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const watchedFile = form.watch("photo") as File | undefined

  React.useEffect(() => {
    if (!watchedFile) {
      if (preview) {
        URL.revokeObjectURL(preview)
        setPreview(null)
      }
      return
    }
    const url = URL.createObjectURL(watchedFile)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [watchedFile])

  function clearPhoto() {
    if (fileInputRef.current) fileInputRef.current.value = ""
    form.setValue("photo", undefined as any, { shouldValidate: true, shouldDirty: true })
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  const [items, setItems] = React.useState<Item[]>([])
  const [itemName, setItemName] = React.useState("")
  const [itemPrice, setItemPrice] = React.useState<number | "">("")

  const total = React.useMemo(
    () => items.reduce((sum, i) => sum + i.price, 0),
    [items]
  )

  const fieldsForProgress = React.useMemo(() => ({
    prefix: (v?: string) => !!v,
    fullName: (v?: string) => !!v?.trim(),
    affiliation: (v?: string) => !!v,
    providerGroup: (v?: string) => !!v,
    staff: (v?: string[]) => Array.isArray(v) && v.length > 0,
    description: (v?: string) => !!v?.trim(),
    photo: (v?: File) => !!v,
  }), [])

  const watchedAll = form.watch()
  const progressTotal = React.useMemo(
    () => Object.keys(fieldsForProgress).length + 1, // +1 เงื่อนไขมีรายการวัสดุ >= 1
    [fieldsForProgress]
  )
  const progressDone =
    (Object.entries(fieldsForProgress) as [keyof FormValues, (v: any) => boolean][])
      .reduce((n, [key, check]) => n + (check((watchedAll as any)[key]) ? 1 : 0), 0)
    + (items.length > 0 ? 1 : 0)
  const percent = Math.round((progressDone / progressTotal) * 100)

  const selectedGroup = form.watch("providerGroup")
  const staffOptions = React.useMemo(
    () => STAFF_BY_GROUP[selectedGroup] ?? [],
    [selectedGroup]
  )
  React.useEffect(() => {
    form.setValue("staff", [])
  }, [selectedGroup, form])

  function addItem() {
    const price = Number(itemPrice || 0)
    if (!itemName.trim()) return
    setItems((prev) => [...prev, { id: crypto.randomUUID(), name: itemName.trim(), price }])
    setItemName("")
    setItemPrice("")
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function onSubmit(values: FormValues) {
    const payload = { ...values, items, total }
    console.log("SUBMIT:", payload)
    alert("บันทึกแบบประเมิน (จำลอง) สำเร็จ! — ดูข้อมูลใน console")
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 shadow-sm p-4 rounded-md">
            <h2 className="text-xl font-semibold">แบบประเมินการให้บริการ</h2>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <Progress value={percent} className="h-2 flex-1" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {progressDone}/{progressTotal} ช่อง • {percent}%
              </span>
            </div>

            {/* ผู้รับบริการ */}
            <div className="space-y-4">
              <h3 className="font-medium text-xl">ผู้รับบริการ</h3>

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>คำนำหน้า</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกคำนำหน้า" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="นาย">นาย</SelectItem>
                          <SelectItem value="นาง">นาง</SelectItem>
                          <SelectItem value="นางสาว">นางสาว</SelectItem>
                          <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อ - สกุล</FormLabel>
                      <FormControl>
                        <Input placeholder="ชื่อ - สกุล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="affiliation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สังกัด คณะ / หน่วยงาน / สำนัก</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกสังกัด" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="คณะสาธารณสุขศาสตร์">คณะสาธารณสุขศาสตร์</SelectItem>
                          <SelectItem value="คณะพยาบาลศาสตร์">คณะพยาบาลศาสตร์</SelectItem>
                          <SelectItem value="สำนักคอมพิวเตอร์">สำนักคอมพิวเตอร์</SelectItem>
                          <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* ผู้ให้บริการ */}
            <div className="space-y-4">
              <h3 className="font-medium text-xl">ผู้ให้บริการ</h3>

              <FormField
                control={form.control}
                name="providerGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>กลุ่มงานที่ให้บริการ</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหน่วยงาน" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="งานเครือข่าย">งานเครือข่าย</SelectItem>
                        <SelectItem value="ซ่อมบำรุง">ซ่อมบำรุง</SelectItem>
                        <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedGroup && (
                <FormField
                  control={form.control}
                  name="staff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลือกผู้ปฏิบัติงานในกลุ่ม “{selectedGroup}”</FormLabel>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {staffOptions.length > 0 ? (
                          staffOptions.map((s) => {
                            const checked = (field.value ?? []).includes(s.id)
                            return (
                              <div key={s.id} className="flex items-center gap-2 rounded-md border p-2">
                                <Checkbox
                                  id={`staff-${s.id}`}
                                  checked={checked}
                                  onCheckedChange={(isChecked) => {
                                    const set = new Set(field.value ?? [])
                                    if (isChecked) set.add(s.id)
                                    else set.delete(s.id)
                                    field.onChange(Array.from(set))
                                  }}
                                />
                                <Label htmlFor={`staff-${s.id}`} className="cursor-pointer">
                                  {s.name}
                                </Label>
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            ยังไม่มีรายชื่อพนักงานของกลุ่มนี้
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* รูปประกอบ (ไฟล์เดียว + พรีวิว) */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รูปประกอบ</FormLabel>
                    <FormControl>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
                      />
                    </FormControl>
                    <FormDescription>รองรับไฟล์ png, jpg หรือ webp (1 ไฟล์)</FormDescription>
                    <FormMessage />

                    {preview && (
                      <>
                        <div className="mt-3 space-y-3 flex justify-center">
                          <div className="rounded-md border p-1 max-w-xs ">
                            <img
                              src={preview}
                              alt="preview"
                              className="h-40 w-full object-cover rounded"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button type="button" variant="outline" size="sm" onClick={clearPhoto}>
                            ลบรูป
                          </Button>
                        </div>
                      </>
                    )}
                  </FormItem>
                )}
              />

              {/* รายการคำขอวัสดุ/อุปกรณ์ + ยอดรวม */}
              <div className="space-y-2">
                <Label>รายการคำขอวัสดุอุปกรณ์</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="กรอก ชื่อวัสดุอุปกรณ์"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={itemPrice}
                    onChange={(e) =>
                      setItemPrice(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="w-32 text-right"
                  />
                  <div className="self-center text-sm">บาท</div>
                  <Button type="button" onClick={addItem} className="w-20">
                    เพิ่ม
                  </Button>
                </div>

                {items.length > 0 && (
                  <div className="mt-2 overflow-hidden rounded-md border">
                    <div className="divide-y">
                      {items.map((it) => (
                        <div key={it.id} className="flex items-center justify-between p-2">
                          <div className="truncate">{it.name}</div>
                          <div className="flex items-center gap-3">
                            <div className="w-28 text-right tabular-nums">
                              {it.price.toLocaleString("th-TH")} บาท
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              type="button"
                              onClick={() => removeItem(it.id)}
                            >
                              ลบ
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-right font-medium">
                  ยอดรวม: <span className="tabular-nums">{total.toLocaleString("th-TH")}</span> บาท
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รายละเอียดของงาน (พอสังเขป)</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="กรอก รายละเอียดของงาน (พอสังเขป)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="flex items-center gap-2">
              <Button type="submit" className="px-8" disabled={percent < 100}>
                บันทึกแบบประเมิน
              </Button>
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setItems([])
                  setItemName("")
                  setItemPrice("")
                  clearPhoto()
                }}
              >
                ล้างฟอร์ม
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
