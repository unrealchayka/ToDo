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
import Link from "next/link"

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
          <div className="flex justify-between items-center py-3">
            <ul className="flex text-[12px] sm:text-[15px] md:text-[18px] gap-2 md:gap-5">
              <li className="hover:text-blue-500 transition-colors duration-300"><Link href='/'>Home</Link></li>
              <li className="hover:text-blue-500 transition-colors duration-300"><Link href='/note'>Note Dashboard</Link></li>
              <li className="hover:text-blue-500 transition-colors duration-300"><Link href='/profile'>Profile</Link></li>
            </ul>
          </div>
          <div className="ml-auto px-3">
            <ModeToggle />
          </div>
        </header>
        <div className="px-3 py-5 m-auto w-[98%] sm:mx-5 sm:px-5 sm:mt-10 border rounded-xl">
          <h2 className="text-[20px] md:text-[45px] pt-3 font-[700] md:pl-10 md:pb-5" style={{ fontFamily: 'var(--font-raleway)' }}>Note dashboard</h2>
          <DataTableDemo />

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
