// src/mocks/employees.ts
export type Employee = {
  id: string;
  fullName: string;
  team: "เครือข่าย" | "ซ่อมบำรุง" | "บริการลูกค้า" | "ซอฟต์แวร์" | "ภาคสนาม";
  avatarUrl: string;
  taskCount: number;   // จำนวนงาน
  avgScore: number;    // คะแนนรวมเฉลี่ย (0-5)
};

export const employeesMock: Employee[] = [
  { id: "E001", fullName: "สมพงษ์ ชอบใจ", team: "เครือข่าย", avatarUrl: "https://i.pravatar.cc/150?img=1", taskCount: 12, avgScore: 4.8 },
  { id: "E002", fullName: "สำรวย เจริญสุข", team: "เครือข่าย", avatarUrl: "https://i.pravatar.cc/150?img=2", taskCount: 9,  avgScore: 4.6 },
  { id: "E003", fullName: "จอนนี่ เดชาวัฒน์", team: "เครือข่าย", avatarUrl: "https://i.pravatar.cc/150?img=3", taskCount: 7,  avgScore: 4.4 },

  { id: "E101", fullName: "อภิชัย ศรีทวี", team: "ซ่อมบำรุง", avatarUrl: "https://i.pravatar.cc/150?img=4", taskCount: 14, avgScore: 4.9 },
  { id: "E102", fullName: "ศศิประภา ใจดี", team: "ซ่อมบำรุง", avatarUrl: "https://i.pravatar.cc/150?img=5", taskCount: 11, avgScore: 4.7 },
  { id: "E103", fullName: "กิตติศักดิ์ สุขสม", team: "ซ่อมบำรุง", avatarUrl: "https://i.pravatar.cc/150?img=6", taskCount: 6,  avgScore: 4.2 },

  { id: "E201", fullName: "ปิยพร วงศ์ดี", team: "บริการลูกค้า", avatarUrl: "https://i.pravatar.cc/150?img=7", taskCount: 18, avgScore: 4.9 },
  { id: "E202", fullName: "ธนกร อินทร์สุข", team: "บริการลูกค้า", avatarUrl: "https://i.pravatar.cc/150?img=8", taskCount: 10, avgScore: 4.5 },
  { id: "E203", fullName: "พัชราภา ชื่นใจ", team: "บริการลูกค้า", avatarUrl: "https://i.pravatar.cc/150?img=9", taskCount: 8,  avgScore: 4.3 },

  { id: "E301", fullName: "ปาณิสรา เทพวงศ์", team: "ซอฟต์แวร์", avatarUrl: "https://i.pravatar.cc/150?img=10", taskCount: 13, avgScore: 4.8 },
  { id: "E302", fullName: "ธนา บรรเจิด", team: "ซอฟต์แวร์", avatarUrl: "https://i.pravatar.cc/150?img=11", taskCount: 9,  avgScore: 4.4 },

  { id: "E401", fullName: "ณัฐพงศ์ พากเพียร", team: "ภาคสนาม", avatarUrl: "https://i.pravatar.cc/150?img=12", taskCount: 16, avgScore: 4.7 },
  { id: "E402", fullName: "ณิชารีย์ อินทร", team: "ภาคสนาม", avatarUrl: "https://i.pravatar.cc/150?img=13", taskCount: 7,  avgScore: 4.1 },
];
