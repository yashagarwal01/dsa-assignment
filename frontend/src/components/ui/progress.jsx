import * as React from "react";

const Progress = React.forwardRef(function Progress(
  { value = 0, className = "", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      {...props}
      className={`relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 h-2 ${className}`}
    >
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
});

export { Progress };
