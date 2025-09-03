
import { ModeToggle } from "@/components/mode-toggle"
import { Layers } from 'lucide-react';
import { Button } from "./button";
import { NavLink } from "react-router-dom";

const navbar = () => {
    return (
        <>
            <nav className="fixed w-full z-20 top-0 start-0  backdrop-blur-sm">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">

                        <Layers className="w-5 h-5" />
                        <span className="self-center font-medium text-sm   whitespace-nowrap dark:text-white">ระบบประเมินความพึงพอใจในการรับบริการ</span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
                        <Button variant="outline" size="sm">
                            <NavLink to="/loginpage">
                                ทำแบบประเมิน
                            </NavLink>
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default navbar