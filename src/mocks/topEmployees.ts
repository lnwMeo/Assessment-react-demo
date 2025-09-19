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
        avatarUrl: "https://i.pinimg.com/736x/64/6e/c7/646ec76c384413c7a2ea6928d9cdd32f.jpg",
    },
    {
        id: "u2",
        name: "สมใจ",
        team: "สนับสนุน",
        totalClosed: 15,
        avatarUrl: "https://i.pinimg.com/736x/39/78/49/397849694f13acb2b35099bd4ca18ee8.jpg",
    },
    {
        id: "u3",
        name: "จอนนี่",
        team: "เครือข่าย",
        totalClosed: 13,
        avatarUrl: "https://i.pinimg.com/736x/74/78/90/747890212339412ee71eabd8896fedb0.jpg",
    },
    {
        id: "u4",
        name: "ศิริพร",
        team: "บริการลูกค้า",
        totalClosed: 11,
        avatarUrl: "https://i.pinimg.com/1200x/58/21/f9/5821f96165247e463fa898c387ca1657.jpg",
    },
    {
        id: "u5",
        name: "อนันต์",
        team: "ปฏิบัติการ",
        totalClosed: 10,
        avatarUrl: "https://i.pinimg.com/736x/5d/2f/96/5d2f9614dbc5f7441110dddcc4249d1f.jpg",
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