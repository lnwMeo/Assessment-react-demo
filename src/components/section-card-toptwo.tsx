
import ChartBarLabelCustom from "@/components/ui/cardtotal"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const SectionCardTopTwo = () => {
    return (
        <>
            <section>
                <div className="mt-4 max-w-screen-xl  items-center justify-between mx-auto">
                    <div className="mt-4">
                        <div className="flex items-center justify-between mt-4 mb-2">
                            <h1 className="text-sm font-medium text-foreground">
                                ยอดงบการให้บริการ
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
                                <Button variant="ghost" size="sm">
                                    ดูทั้งหมด
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            <ChartBarLabelCustom />

                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default SectionCardTopTwo