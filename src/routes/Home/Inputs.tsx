import React, { useState } from "react";
import qs from "query-string";
import { useHistory } from "react-router-dom";
import Qr from "../../components/QrReader";
import PopOver from "../../components/PopOver";
import ListItem from "../../components/ListItem";
import { useAccount } from "../../provider";
import { usePaginatedQuery } from "react-query";
import { getStores } from "../../api/stores";

function Inputs() {
  const history = useHistory();
  const params = qs.parse(history.location.search, { arrayFormat: "comma" });

  const [scanQr, setScanQr] = useState(false);

  const account = useAccount();

  const pushQuery = (obj: Record<string, any>) => {
    history.push({
      search: qs.stringify({ ...params, ...obj }, { arrayFormat: "comma" }),
    });
  };

  const { resolvedData: stores } = usePaginatedQuery(
    ["stores", { storeSearchTerm: params.storeSearchTerm }],
    getStores
  );

  return (
    <>
      <div className="flex border shadow-md rounded-lg w-full bg-white  text-gray-700 leading-tight focus:outline-none">
        <input
          type="search"
          value={params.productSearchTerm || ""}
          onChange={(evt) =>
            pushQuery({
              productSearchTerm: evt.currentTarget.value.length
                ? evt.currentTarget.value
                : undefined,
            })
          }
          className="focus:outline-none rounded-tl-md border-r-2 rounded-bl-md  py-3 px-5 font-bold text-gray-600 bg-transparent  w-full h-full"
          placeholder="Προίον 🛍️"
        />
        <PopOver
          position="right"
          className="rounded-tl-md border-r-2 rounded-bl-md focus:outline-none  py-3 px-5 w-full h-full"
          label={
            <input
              type="search"
              onBlur={() =>
                !params.storeId &&
                params.searchTerm !== "κοντά μου" &&
                pushQuery({
                  storeSearchTerm: undefined,
                  storeId: undefined,
                  latitude: account.coords.latitude,
                  longitude: account.coords.longitude,
                })
              }
              value={params.storeSearchTerm || ""}
              onChange={(evt) => {
                pushQuery({
                  storeSearchTerm: evt.currentTarget.value.length
                    ? evt.currentTarget.value
                    : undefined,
                  storeId: evt.currentTarget.value.length
                    ? params.storeId
                    : undefined,
                });
              }}
              className="focus:outline-none font-bold text-gray-600 w-full h-full"
              placeholder="Κατάστημα 🏢"
            />
          }
        >
          <ul>
            <ListItem>
              <div
                onClick={() =>
                  pushQuery({
                    storeSearchTerm: "κοντά μου",
                    storeId: undefined,
                  })
                }
                className="flex"
              >
                <img
                  className="w-5 h5 mr-4"
                  src="/images/pin.svg"
                  aria-label="location pin"
                  alt="location"
                />
                <span>κοντά μου</span>
              </div>
            </ListItem>
            {stores?.data?.map((obj) => (
              <ListItem
                onClick={() =>
                  pushQuery({
                    storeSearchTerm: obj.name,
                    storeId: obj.id,
                  })
                }
                key={obj.id}
              >
                {obj.name}
              </ListItem>
            ))}
          </ul>
        </PopOver>
        <button
          onClick={() => setScanQr(true)}
          className="appearance-none px-3 py-2 focus:outline-none bg-transparent text-lg"
        >
          <span role="img" aria-label="camera">
            📷
          </span>
        </button>
      </div>
      {scanQr && (
        <Qr
          onScan={(str) => {
            if (str) {
              qs.parse(str);
              pushQuery(qs.parse(str));
              setScanQr(false);
            }
          }}
          onClose={() => setScanQr(false)}
        />
      )}
    </>
  );
}

export default Inputs;
