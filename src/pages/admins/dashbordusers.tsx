import { DataTable } from "@/components/data-table"
import data from "./data.json"
const dashbordusers = () => {
    return (
        <>
            <div className="px-4 py-2 ">
                <div className="grid grid-cols-1  md:grid-cols-3 gap-2">
                
                    <div className="w-full bg-primary rounded-sm p-4 text-white">
                        <p>จำนวนงานรวม</p>
                        <div className="text-center font-bold text-2xl py-4"><p>23</p></div>
                    </div>
                    <div className="w-full bg-primary rounded-sm p-4 text-white">
                        <p>
                            จำนวนงานที่ยืนยันแล้ว
                        </p>
                        <div className="text-center font-bold text-2xl py-4"><p>23</p></div>
                    </div>
                    <div className="w-full bg-primary rounded-sm p-4 text-white">
                        <p>
                            จำนวนงานที่รอยืนยัน
                        </p>
                        <div className="text-center font-bold text-2xl py-4"><p>23</p></div>
                    </div>
                </div>

            </div>
                <DataTable data={data} />
        </>
    )
}
export default dashbordusers