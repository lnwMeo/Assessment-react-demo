import Navbar from "@/components/ui/navbar"
import StickyFooter from "@/components/ui/StickyFooter"

import { Outlet } from "react-router-dom";
const mainlayout = () => {
    return (
        <>
            <Navbar />
            <div className="pt-16 pb-16 w-full min-h-screen">
                <div className="max-w-screen-xl mx-auto px-2">
                    <Outlet />
                </div>
            </div>
            <StickyFooter />
        </>
    )
}
export default mainlayout