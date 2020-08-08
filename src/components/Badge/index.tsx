import React from "react";

type Props = {
  notifications?: number;
};
function Badge(props: Props) {
  const doIHaveNotf = Boolean(props.notifications && props.notifications > 0);
  return (
    <div className="relative">
      {doIHaveNotf && (
        <div className="bg-blue-400 a -mt-3 -mr-3 font-bold absolute flex w-5 h-5 text-2xs justify-center items-center rounded-full">
          {props.notifications}
        </div>
      )}
      <img src="/images/notification.svg" alt="seen" />
    </div>
  );
}

export default Badge;
