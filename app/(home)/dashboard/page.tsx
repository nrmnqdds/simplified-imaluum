import Advertisement from "@/components/Advertisements";
import CGPAChart from "@/components/dashboard/CGPAChart";
import Card from "@/components/dashboard/card";
import CGPAScrollList from "@/components/dashboard/CGPAScrollList";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid auto-rows-[192px] grid-cols-3 gap-2">
        <Card>Coming Soon</Card>
        <Card>Coming Soon</Card>
        <Card>Coming Soon</Card>
        <Card className="col-span-2">
          <CGPAChart />
        </Card>
        <Card className="overflow-y-scroll scrollbar-hide">
          <CGPAScrollList />
        </Card>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
          Coming Soon
        </div>
        <div className="row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 col-span-2">
          Coming Soon
        </div>
      </div>

      <Advertisement className={"w-full h-fit flex flex-col"} />
    </div>
  );
};

export default DashboardPage;
