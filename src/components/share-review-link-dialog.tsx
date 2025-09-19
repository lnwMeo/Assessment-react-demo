// components/share-review-link-dialog.tsx
import * as React from "react"
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"   // ⬅️ ใช้ sonner

export function ShareReviewLinkDialog({
  open,
  onOpenChange,
  link,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  link: string
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
      inputRef.current?.select()
      toast.success("คัดลอกลิงก์แล้ว")
    } catch {
      inputRef.current?.select()
      toast.error("คัดลอกไม่สำเร็จ ลองกด Ctrl/Cmd + C")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>ลิงก์แบบประเมิน</DialogTitle>
          <DialogDescription>
            ส่งลิงก์นี้ให้ผู้รับบริการเพื่อเปิดหน้าให้คะแนน
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label htmlFor="review-link">ลิงก์</Label>
          <Input id="review-link" ref={inputRef} readOnly value={link} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ปิด
          </Button>
          <Button onClick={copy}>คัดลอกลิงก์</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
