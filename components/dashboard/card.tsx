import React from "react";

const Card = ({
  className = "",
  children,
  ...props
}: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={`row-span-1 rounded-xl border border-border bg-background p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
