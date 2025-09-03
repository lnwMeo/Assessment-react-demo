import img1 from "@/assets/images/gen2.png"
import img2 from "@/assets/images/gen3.png"

import { Button } from "@/components/ui/button"
const employee = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-sm">พนักงานทั้งหมด</div>
                <Button variant="outline" size="sm">กลับ</Button>
            </div>


            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2 mt-2 ">


                <label className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-accent rounded-lg w-80  bg-accent/50 dark:bg-accent/50 focus:ring-blue-500 focus:border-accent  dark:border-accent dark:placeholder-gray-400 dark:text-white dark:focus:ring-accent dark:focus:border-accent" placeholder="Search for users" />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 border border-accent">
                <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                    <thead className="text-sm text-gray-700 uppercase  dark:text-gray-200 bg-accent/50 dark:bg-accent/50 ">
                        <tr>

                            <th scope="col" className="px-6 py-2">
                                ชื่อ
                            </th>
                            <th scope="col" className="px-6 py-2">
                                กลุ่มงาน
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Status
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b  dark:border-accent border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={img1} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-sm font-semibold">Neil Sims</div>
                                    <div className="text-xs font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                เครือข่าย
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>

                        </tr>
                        <tr className="border-b  dark:border-accent border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="flex items-center px-6 py-2 text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={img1} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-sm font-semibold">Neil Sims</div>
                                    <div className="text-xs font-normal text-gray-500">neil.sims@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                เครือข่าย
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                </div>
                            </td>

                        </tr>

                        <tr className=" hover:bg-gray-50 dark:hover:bg-gray-600">

                            <th scope="row" className="flex items-center  px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img className="w-10 h-10 rounded-full" src={img2} alt="Jese image" />
                                <div className="ps-3">
                                    <div className="text-sm font-semibold">Leslie Livingston</div>
                                    <div className="text-xs  font-normal text-gray-500">leslie@flowbite.com</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                เครือข่าย
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Offline
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default employee