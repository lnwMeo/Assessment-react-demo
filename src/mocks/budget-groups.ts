// src/mocks/budget-groups.ts
export type AgencyDatum = {
  agency: string;
  budget: number;
};

export type BudgetGroup = {
  group: string;        // ชื่อกลุ่มงานหลัก
  items: AgencyDatum[]; // รายการหน่วยงานในกลุ่ม
};

export const budgetGroupsMock: BudgetGroup[] = [
  {
    group: "งานเครือข่าย",
    items: [
      { agency: "คณะสาธารณสุขศาสตร์", budget: 255 },
      { agency: "คณะพยาบาลศาสตร์", budget: 1700 },
      { agency: "คณะเทคโนโลยีอุตสาหกรรม", budget: 360 },
      { agency: "สำนักการเรียนรู้ตลอดชีวิต", budget: 18000 },
      { agency: "สำนักงานอธิการบดี (กองบริหารงานบุคคล)", budget: 209 },
      { agency: "สำนักคอมพิวเตอร์", budget: 3214 },
      { agency: "คณะครุศาสตร์", budget: 2134 },
      { agency: "คณะมนุษยศาสตร์และสังคมศาสตร์", budget: 214 },
      { agency: "คณะวิทยาศาสตร์และเทคโนโลยี", budget: 2154 },
      { agency: "โรงเรียนสาธิตฯ ฝ่ายมัธยม", budget: 5000 },
      { agency: "สถาบันวิจัยไม้กลายเป็นหิน", budget: 29909 },
      { agency: "สำนักงานอธิการบดี (กองกลาง)", budget: 2104 },
      { agency: "สำนักงานอธิการบดี (กองกิจการพิเศษ)", budget: 21004 },
      { agency: "สำนักงานอธิการบดี (กองอาคารสถานที่และบริการ)", budget: 10000 }, // ตามที่ระบุ
      { agency: "สำนักงานอธิการบดี (กองกฎหมาย)", budget: 2014 },
      { agency: "สำนักศิลปะและวัฒนธรรม", budget: 2184 },
    ],
  },
  {
    group: "ซ่อมบำรุง",
    items: [
      { agency: "ศูนย์ช่างเขต 1", budget: 4200 },
      { agency: "ศูนย์ช่างเขต 2", budget: 3800 },
      { agency: "ศูนย์ช่างเขต 3", budget: 5600 },
    ],
  },
];
