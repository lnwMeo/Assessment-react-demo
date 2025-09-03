

import { ChartBarLabelCustom } from "@/components/ui/cardtotal"
import { NavLink } from "react-router-dom";
import Marqueetext from "@/components/ui/Marqueetext";
import { Button } from "@/components/ui/button";



const homepage = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <Marqueetext />
                <div className="flex items-center justify-between mt-4 mb-2">
                    <h1 className="text-sm font-medium text-foreground">
                        พนักงานที่ยอดปิดงานสูงสุด
                    </h1>
                    <Button asChild variant="ghost" size="sm">
                        <NavLink to="/employee">
                            ดูทั้งหมด
                        </NavLink>
                    </Button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-4 items-center">

                    <div className="max-w-2xs w-full">
                        <a
                            href="#"
                            className="block w-full p-4 bg-white border border-accent/50 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition dark:bg-accent/50 dark:border-accent/50 dark:hover:bg-gray-800"
                        >
                            <div className="flex items-center gap-4">
                                {/* รูปโปรไฟล์ */}
                                <div className="w-20 h-20 shrink-0 border-4 border-amber-400 rounded-md overflow-hidden">
                                    <img
                                        src="https://i.pinimg.com/736x/4b/ca/b7/4bcab76e173a866610f2c2ca449818d5.jpg"
                                        alt="Sommai"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* ข้อมูลผู้ใช้ */}
                                <div className="flex flex-col justify-center flex-1 text-start">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        ส้ม ซอยสาม
                                    </p>
                                    <p className="text-center">
                                        <span className="text-yellow-400 text-xl">🥇</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        กลุ่มงาน เครือข่าย
                                    </p>

                                    <div className=" flex items-baseline gap-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">จำนวน:</p>
                                        <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                            20
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">งาน</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="max-w-2xs w-full">
                        <a
                            href="#"
                            className="block w-full p-4 bg-white border border-accent/50 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition dark:bg-accent/50 dark:border-accent/50 dark:hover:bg-gray-800"
                        >
                            <div className="flex items-center gap-4">
                                {/* รูปโปรไฟล์ */}
                                <div className="w-20 h-20 shrink-0 border-4 border-gray-400 rounded-md overflow-hidden">
                                    <img
                                        src="https://i.pinimg.com/736x/da/0d/96/da0d966e26980d7acefc4a2b7b8e6774.jpg"
                                        alt="Sommai"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* ข้อมูลผู้ใช้ */}
                                <div className="flex flex-col justify-center flex-1 text-start">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        ดำ แบทแมน
                                    </p>
                                    <p className="text-center">
                                        <span className="text-gray-400 text-xl">🥈</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        กลุ่มงาน เครือข่าย
                                    </p>

                                    <div className="flex items-baseline gap-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">จำนวน:</p>
                                        <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                                            12
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">งาน</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="max-w-2xs w-full">
                        <a
                            href="#"
                            className="block w-full p-4 bg-white border border-accent/50 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition dark:bg-accent/50 dark:border-accent/50 dark:hover:bg-gray-800"
                        >
                            <div className="flex items-center gap-4">
                                {/* รูปโปรไฟล์ */}
                                <div className="w-20 h-20 shrink-0 border-4 border-amber-950 rounded-md overflow-hidden">
                                    <img
                                        src="https://i.pinimg.com/736x/fa/da/55/fada55bf00b3f6843a5b7c09f28e4919.jpg"
                                        alt="Sommai"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* ข้อมูลผู้ใช้ */}
                                <div className="flex flex-col justify-center flex-1 text-start">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        บัวลอย
                                    </p>
                                    <p className="text-center">
                                        <span className="text-orange-500 text-xl">🥉</span>
                                    </p>

                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        กลุ่มงาน เครือข่าย
                                    </p>

                                    <div className=" flex items-baseline gap-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">จำนวน:</p>
                                        <p className="text-lg font-bold text-amber-900 dark:text-amber-900">
                                            10
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">งาน</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="max-w-2xs w-full">
                        <a
                            href="#"
                            className="block w-full p-4 bg-white border border-accent/50 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition dark:bg-accent/50 dark:border-accent/50 dark:hover:bg-gray-800"
                        >
                            <div className="flex items-center gap-4">
                                {/* รูปโปรไฟล์ */}
                                <div className="w-20 h-20 shrink-0 border-4 border-gray-900 rounded-md overflow-hidden">
                                    <img
                                        src="https://i.pinimg.com/1200x/d7/a7/e7/d7a7e793450a182cb46de027d7aa71aa.jpg"
                                        alt="Sommai"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* ข้อมูลผู้ใช้ */}
                                <div className="flex flex-col justify-center flex-1 text-start">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        สำรวย
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        กลุ่มงาน เครือข่าย
                                    </p>

                                    <div className="mt-2 flex items-baseline gap-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">จำนวน:</p>
                                        <p className="text-lg font-bold text-gray-100 dark:text-gray-400">
                                            8
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">งาน</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="max-w-2xs w-full">
                        <a
                            href="#"
                            className="block w-full p-4 bg-white border border-accent/50 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-100 transition dark:bg-accent/50 dark:border-accent/50 dark:hover:bg-gray-800"
                        >
                            <div className="flex items-center gap-4">
                                {/* รูปโปรไฟล์ */}
                                <div className="w-20 h-20 shrink-0 border-4 border-gray-900 rounded-md overflow-hidden">
                                    <img
                                        src="https://i.pinimg.com/736x/0d/89/d5/0d89d51414ea16986fadfc4db613575a.jpg"
                                        alt="Sommai"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* ข้อมูลผู้ใช้ */}
                                <div className="flex flex-col justify-center flex-1 text-start">
                                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                                        จอนนี่
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        กลุ่มงาน เครือข่าย
                                    </p>

                                    <div className="mt-2 flex items-baseline gap-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">จำนวน:</p>
                                        <p className="text-lg font-bold text-gray-100 dark:text-gray-400">
                                            8
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">งาน</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>





                </div>

            </div>
            <div className="mt-4 max-w-screen-xl  items-center justify-between mx-auto">
                <div className="mt-4">
                    <div className="flex items-center justify-between mt-4 mb-2">
                        <h1 className="text-sm font-medium text-foreground">
                            ยอดงบการให้บริการ
                        </h1>
                        <Button variant="ghost" size="sm">
                            ดูทั้งหมด
                        </Button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <ChartBarLabelCustom />
                        <ChartBarLabelCustom />
                    </div>
                </div>
            </div>
        </>


    );
}

export default homepage