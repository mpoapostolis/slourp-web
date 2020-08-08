import React from "react";
import QrReader from "react-qr-reader";

type Props = {
  onClose: () => void;
};
function Qr(props: Props) {
  return (
    <div
      onClick={props.onClose}
      style={{ top: "0px", zIndex: 10000 }}
      className="fixed left-0 bg-black w-full flex h-full"
    >
      <button className="absolute font-bold  select-none right-0 text-white z-50 top-0 mt-2 mr-2 text-base ">
        <span role="img" aria-label="close">
          ✖️ Κλείσιμο
        </span>
      </button>
      <div className="w-screen md:w-1/2 mx-auto h-screen flex justify-center items-center shadow-xs">
        <QrReader
          delay={750}
          onError={console.log}
          onScan={console.log}
          className="m-auto w-full"
        />
      </div>
    </div>
  );
}
export default Qr;
