import React from "react";
import { useState } from "react";

type Props = {
  onChange?: (val: number) => void;
  canIRate?: boolean;
  defaultValue?: number;
};
export default (props: Props) => {
  const [rate, setRate] = useState(props.defaultValue || 0);
  const [enlight, setEnlight] = useState(0);
  const _setRate = (num: number) => {
    if (props.onChange) props.onChange(num);
    setRate(num);
  };
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4, 5].map((num) => {
        const amIYellow = (rate > num || enlight >= num) && props.canIRate;
        return (
          <svg
            onMouseEnter={() => props.canIRate && setEnlight(num)}
            onClick={() => props.canIRate && _setRate(num)}
            onMouseLeave={() => props.canIRate && setEnlight(0)}
            key={num}
            fill={amIYellow ? "gold" : "gray"}
            className="w-5 h-5 text-gray-500 cursor-pointer"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        );
      })}
    </div>
  );
};
