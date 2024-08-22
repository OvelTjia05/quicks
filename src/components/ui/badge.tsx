import React from "react";

const Badge: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div className="inline-block rounded-[5px] bg-sticker-blue-100 px-3 py-2 font-bold text-primary-blue">
      {label}
    </div>
  );
};

export default Badge;
