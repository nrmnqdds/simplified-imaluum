interface TimetableRowProps {
  key: number;
  hour: number;
  numberOfDays: number;
  showHour: boolean;
}

export default function TimetableRow({
  hour,
  numberOfDays,
  showHour = true,
}: TimetableRowProps) {
  return (
    <div className="relative w-full h-16">
      <div className="absolute w-full h-full border-b border-border" />
      <div className="absolute left-0 w-12 h-full flex flex-col items-center justify-start border-r border-border bg-card">
        {showHour && (
          <p
            className="text-foreground text-xs font-bold mt-1
          -translate-y-1/2 pb-2"
          >
            {hour > 12 ? hour - 12 : hour} {hour > 11 ? "PM" : "AM"}
          </p>
        )}
      </div>
      <div className="absolute left-8 right-0 h-full flex flex-row ml-5">
        {[...Array(numberOfDays)].map((day, index) => (
          <div
            key={index}
            className={`flex-1 h-full
              ${index !== numberOfDays - 1 && "border-r border-border"}`}
          />
        ))}
      </div>
    </div>
  );
}
