import React, { useRef, useMemo } from "react";
import { useAccount } from "../../provider";

type Props = {
  open: boolean;
  onClose: () => void;
};

function Modal(props: Props) {
  const divRef = useRef(null);
  const account = useAccount();

  const uniqCartItems = useMemo(() => {
    return new Set(
      account.cart?.map((o) => ({
        id: o.id,
        product_name: o.product_name,
        price: o.price,
      }))
    );
  }, [account.cart]);

  const list: Record<string, { total: string; price: number }> = useMemo(() => {
    return Array.from(uniqCartItems).reduce((acc, curr) => {
      const total = account.cart.filter((obj) => obj.id === curr.id).length;
      return {
        ...acc,
        [curr.product_name]: { total, price: total * curr.price },
      };
    }, {});
  }, [uniqCartItems]);

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
        <div className="bg-white w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex w-full sm:items-start">
            <div className="mt-3 w-full sm:mt-0 sm:ml-4 text-left">
              <h3
                className="text-lg mb-2 leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Επιβεβαίωση παραγγελίας
              </h3>
              <hr className="w-full" />

              <div className="mt-4">
                {Object.keys(list).map((product_name) => (
                  <div
                    className="flex my-1 w-full text-sm items-center"
                    key={product_name}
                  >
                    <h1>
                      {product_name}{" "}
                      <span className="text-xs text-gray-600">
                        &nbsp; x{list[product_name].total}
                      </span>
                    </h1>

                    <span className=" text-gray-800  ml-auto font-bold">
                      {list[product_name].price.toFixed(2)}€
                    </span>
                    <div className="flex justify-end w-20">
                      <button className="mx-1 w-6 h-6 border rounded-full text-xs ">
                        <span role="img" className="text-xs" aria-label="plus">
                          ➕
                        </span>
                      </button>

                      <button className="w-6 h-6 border rounded-full text-xs ">
                        <span role="img" className="text-xs" aria-label="minus">
                          ➖
                        </span>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex mb-2 mt-4 w-full text-sm items-center">
                  <h1>Σύνολο</h1>
                  <span className=" text-gray-800 ml-auto font-bold">
                    {Object.keys(list)
                      .reduce((acc, curr) => acc + list[curr].price, 0)
                      .toFixed(2)}
                    €
                  </span>
                  <span className="w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 pb-3 pt-2 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
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
