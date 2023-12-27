import CGPAChart from "@/components/dashboard/CGPAChart";
import Card from "@/components/dashboard/card";
import CGPAScrollList from "@/components/dashboard/CGPAScrollList";

const BentoLayout = () => {
  return (
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
      <Card>Coming Soon</Card>
      <Card className="col-span-2">Coming Soon</Card>
    </div>
  );
};

export default BentoLayout;
