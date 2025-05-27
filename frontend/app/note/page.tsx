import { DataTableDemo } from "@/components/ui/dataTable";
export default function Home() {
  return (

    <div className="w-full">
      <h2 className="text-[20px] md:text-[45px] pt-3 font-[700] md:pl-10 md:pb-5" style={{ fontFamily: 'var(--font-raleway)' }}>Note dashboard</h2>
          <DataTableDemo />

    </div>
  );
}
