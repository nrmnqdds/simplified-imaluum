import CGPAChart from "@/components/dashboard/CGPAChart";
import CGPAScrollList from "@/components/dashboard/CGPAScrollList";
import Card from "@/components/dashboard/card";

const BentoLayout = () => {
  return (
    <div className="grid auto-rows-[20vh] grid-cols-3 gap-2">
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
