

import Marqueetext from "@/components/ui/Marqueetext";
import SectionCrdtopFive from "@/components/section-card-topfive";
import SectionCardTopTwo from "@/components/section-card-toptwo";

const homepage = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto ">
                <Marqueetext />
                <SectionCrdtopFive />
                <SectionCardTopTwo />
            </div>
        </>


    );
}

export default homepage