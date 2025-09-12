import Marquee from "react-fast-marquee";

const Marqueetext = () => {
  return (
   <Marquee className="text-sm text-gray-800 dark:text-gray-300" speed={40} gradient={false}  gradientWidth={50}  gradientColor="rgb(0,96,239)" >
      <span style={{ margin: "0 2rem" }}>🚀 ยินดีต้อนรับเข้าสู่เว็บไซต์ของเรา</span>
      <span style={{ margin: "0 2rem" }}>🔥 ข้อมูลล่าสุดประจำเดือนนี้</span>
      <span style={{ margin: "0 2rem" }}>✨ ติดต่อเราได้บางชั่วโมง</span>
      <span style={{ margin: "0 2rem" }}>🔔 ข่าวประชาสัมพันธ์: ประชุมประจำเดือนวันที่ 20 ก.ค. เวลา 10.00 น. - 12.00 น.</span>
      <span style={{ margin: "0 2rem" }}>🔔 ขอให้พนักงานขยันทำงานทุกคน</span>
      <span style={{ margin: "0 2rem" }}>🔔 5 อันดับประจำเดือนจะได้รับรางวัล เพื่อเป็นขวัญกำลังใจ</span>
    </Marquee>
  )
}

export default Marqueetext