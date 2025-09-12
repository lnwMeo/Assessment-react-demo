

import { ChartBarLabelCustom } from "@/components/ui/cardtotal"

import Marqueetext from "@/components/ui/Marqueetext";
import { Button } from "@/components/ui/button";

import SectionCrdtopFive from "@/components/section-card-topfive";

const homepage = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto ">
                <Marqueetext />
                <SectionCrdtopFive />

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
            </div>
        </>


    );
}

export default homepage