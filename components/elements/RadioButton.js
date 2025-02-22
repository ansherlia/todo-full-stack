import React from "react";

function RadioButton({ value, title, children, status, setStatus, className }) {
  return (
    <div className={className}>
      <label className="flex  items-center gap-x-1">
        {children}
        {title}
      </label>
      <input
        type="radio"
        checked={value === status}
        value={value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
