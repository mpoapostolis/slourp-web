import React from "react";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../Hooks/useClickOutse";

type Props = {
  children: React.ReactNode;
  label: React.ReactNode;
  className?: string;
  stayOpen?: boolean;
  position?: "left" | "right";
  showClose?: boolean;
};

export default (props: Props) => {
  const divRef = useRef(null);
  const clickOutside = useClickOutside(divRef.current);
  const [open, setOpen] = useState(false);

  function togglePopOver() {
    setOpen(!open);
  }

  useEffect(() => {
    if (!props.stayOpen) setOpen(false);
  }, [clickOutside]);

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
          style={{ minWidth: "256px", width: "100%" }}
          onClick={() => !props.stayOpen && togglePopOver()}
          className={`absolute border ${
            props.position ?? "left"
          }-0 px-8 py-3 pt-8 shadow-md rounded-md mt-1 bg-white z-50 w-full`}
        >
          {props.showClose && (
            <button
              onClick={togglePopOver}
              className="absolute select-none right-0 top-0 mt-2 mr-2 text-xs "
            >
              ✖️
            </button>
          )}
          {props.children}
        </div>
      )}
    </div>
  );
};
