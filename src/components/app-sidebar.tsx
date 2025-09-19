import * as React from "react"
import {
  // IconCamera,
  // IconChartBar,
  IconDashboard,
  // IconDatabase,
  // IconFileAi,
  // IconFileDescription,
  // IconFileWord,
  // IconFolder,
  // IconHelp,
  IconInnerShadowTop,
  // IconListDetails,
  // IconReport,
  // IconSearch,
  // IconSettings,
  // IconUsers,
} from "@tabler/icons-react"
// import { ModeToggle } from "@/components/mode-toggle"
// import { Button } from "./button";
// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
// import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Link } from "react-router-dom"
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "แดชบอร์ด",
      url: "/admins",
      icon: IconDashboard,
    },
 
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link  to="/admins">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">ระบบประเมินความพึงพอใจในการรับบริการ</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
   
      <SidebarContent>
        <NavMain items={data.navMain}  />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
