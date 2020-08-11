import React from "react";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../Hooks/useClickOutse";

type Props = {
  children: React.ReactNode;
  label: React.ReactNode;
  className?: string;
  stayOpen?: boolean;
  minWidth?: number;
  position?: "left" | "right";
  showClose?: boolean;
  maxHeight?: string;
  onCLose?: (e?: any) => void;
};

export default (props: Props) => {
  const divRef = useRef(null);
  const clickOutside = useClickOutside(divRef.current);
  const [open, setOpen] = useState(false);

  function togglePopOver() {
    setOpen(!open);
    if (!open) props?.onCLose?.();
  }

  useEffect(() => {
    setOpen(false);
  }, [clickOutside, props.stayOpen]);

  return (
    <div ref={divRef} className={`relative w-full`}>
      <div
        className={`cursor-pointer ${props.className}`}
        onClick={togglePopOver}
      >
        {props.label}
      </div>
      {open && (
        <div
          style={{
            maxHeight: props.maxHeight ?? "350px",
            minWidth: props.minWidth ? `${props.minWidth}px` : "250px",
          }}
          onClick={() => !props.stayOpen && togglePopOver()}
          className={`absolute border ${
            props.position ?? "left"
          }-0 shadow-md  overflow-y-auto rounded-md mt-1 bg-white z-50 w-full`}
        >
          {props.showClose && (
            <button
              onClick={togglePopOver}
              className="absolute select-none right-0 top-0 mt-2 mr-2 text-xs "
            >
              <span role="img" aria-label="close">
                ✖️
              </span>
            </button>
          )}
          {props.children}
        </div>
      )}
    </div>
  );
};
