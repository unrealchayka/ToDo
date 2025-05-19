import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DataTableDemo } from "@/components/ui/dataTable"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div>
            <ul className="flex text-[15px] md:text-[22px] gap-2 md:gap-5">
              <li>Home</li>
              <li>Dashboard</li>
              <li>Profile</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="ml-auto px-3">
            <ModeToggle />
          </div>
        </header>
        <div className="m-auto px-3 mt-10 py-5 md:mx-[5%] md:px-10 border rounded-xl md:py-10">

        <DataTableDemo/>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
