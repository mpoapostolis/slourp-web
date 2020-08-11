import React, { useRef, useEffect } from "react";
import { Product } from "../../api/products";
import useClickOutside from "../../Hooks/useClickOutse";

type Props = {
  open: boolean;
  onClose: () => void;
  productList?: Product[];
};

function Modal(props: Props) {
  const divRef = useRef(null);
  const clickOutside = useClickOutside(divRef.current);

  useEffect(() => props.onClose(), [clickOutside]);

  console.log(clickOutside);

  return props.open ? (
    <div className="fixed z-50 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-black  opacity-75"></div>
      </div>

      <div
        ref={divRef}
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Επιβεβαίωση παραγγελίας
              </h3>

              <div className="mt-2">
                {props?.productList?.map((obj) => (
                  <h1>{obj.product_name}</h1>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <span className="mt-3 flex items-center w-full rounded-md shadow-sm sm:mt-0">
            <button
              onClick={props.onClose}
              type="button"
              className="inline-flex border  justify-center w-full rounded-md px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <img
                src="/images/loyalty.svg"
                alt="loyalty"
                className="w-6 mr-5"
              />
              <span>Πληρωμή με slourps</span>
            </button>
          </span>

          <span className="flex w-full  items-center rounded-md shadow-sm sm:mt-0">
            <button
              onClick={props.onClose}
              type="button"
              className="inline-flex border  justify-center w-full  rounded-md px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <span className="w-6 mr-5" role="img" aria-label="money">
                💵
              </span>
              <span>Πληρωμή με μετρητά</span>
            </button>
          </span>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
