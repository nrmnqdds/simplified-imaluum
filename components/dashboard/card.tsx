import React from "react";

const Card = ({
  className = "",
  children,
  ...props
}: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
