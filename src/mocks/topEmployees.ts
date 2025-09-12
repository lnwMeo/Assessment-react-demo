export type Employee = {
    id: string;
    name: string;
    team: string;          // กลุ่มงาน
    avatarUrl: string;
    totalClosed: number;
}

export const topEmployeesMock: Employee[] = [
    {
        id: "u1",
        name: "สำรวย",
        team: "เครือข่าย",
        totalClosed: 18,
        avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: "u2",
        name: "สมใจ",
        team: "สนับสนุน",
        totalClosed: 15,
        avatarUrl: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: "u3",
        name: "จอนนี่",
        team: "เครือข่าย",
        totalClosed: 13,
        avatarUrl: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "u4",
        name: "ศิริพร",
        team: "บริการลูกค้า",
        totalClosed: 11,
        avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
    {
        id: "u5",
        name: "อนันต์",
        team: "ปฏิบัติการ",
        totalClosed: 10,
        avatarUrl: "https://i.pravatar.cc/150?img=23",
    },
    
    {
        id: "u6",
        name: "อนันต์",
        team: "ปฏิบัติการ",
        totalClosed: 10,
        avatarUrl: "https://i.pravatar.cc/150?img=23",
    },
];

// ฟังก์ชันเผื่ออนาคต: ดึง top N (ค่าเริ่มต้น 5)
export function getTopEmployeesMock(limit = 5): Employee[] {
    return topEmployeesMock
        .slice()
        .sort((a, b) => b.totalClosed - a.totalClosed)
        .slice(0, limit);
}