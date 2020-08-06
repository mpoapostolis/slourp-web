import React from "react";
import PopOver from "../PopOver";
import { useState, useEffect } from "react";
import { useAccount } from "../../provider";
import { LOGIN } from "../../provider/names";
import { useMutation } from "react-query";

import ky from "ky";
import { login, register } from "../../api/users";

type Rec = Record<string, any>;

const Login = () => {
  const [view, setView] = useState("Συνδεση");
  const setCreds = (obj: Rec) => _setCreds((s) => ({ ...s, ...obj }));
  const [creds, _setCreds] = useState<Record<string, string>>({});
  const [registerInfo, _setRegisterInfo] = useState<Record<string, string>>({});
  const setRegisterInfo = (obj: Rec) =>
    _setRegisterInfo((s) => ({ ...s, ...obj }));
  const account = useAccount();

  const loginWithFacebook = () => {
    FB.login((res) => {
      ky.post(`/api/users/facebook`, {
        json: {
          token: res.authResponse.accessToken,
        },
      })
        .json()
        .then((payload) => {
          console.log(payload);
          account.dispatch({ type: LOGIN, payload });
        });
    });
  };

  const [_login] = useMutation(login, {
    onSuccess: (payload) => {
      account.dispatch({ type: LOGIN, payload });
    },
  });

  const [_register] = useMutation(register, {
    onSuccess: () => setView("Συνδεση"),
  });

  return (
    <PopOver
      showClose
      stayOpen
      position="right"
      label={
        <button className="focus:outline-none py-3 h-full uppercase tracking-wide text-xs text-indigo-600 font-bold">
          {view}
        </button>
      }
    >
      {view === "Συνδεση" ? (
        <>
          <input
            onChange={(evt) => setCreds({ user_name: evt.currentTarget.value })}
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Όνομα χρήστη"
          />
          <input
            onChange={(evt) => setCreds({ password: evt.currentTarget.value })}
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Κώδικος"
          />
          <button
            onClick={() => _login(creds)}
            className="bg-indigo-500 mb-4 focus:outline-none w-full hover:bg-indigo-700 text-white font-bold py-1 rounded"
          >
            Σύνδεση
          </button>
          <button
            onClick={loginWithFacebook}
            className="bg-blue-600 mb-4 focus:outline-none w-full hover:bg-indigo-700 text-white font-bold py-1 rounded"
          >
            Facebook
          </button>
          <button
            onClick={() => setView("Εγγραφη")}
            className="text-gray-500 w-full  focus:outline-none float-right text-xs"
          >
            <div>Δεν έχετε λογαριασμο</div>
            <div className="underline">
              Δημιουργήστε έναν &nbsp;
              <strong className="text-indigo-500">εδω</strong>
            </div>
          </button>
        </>
      ) : (
        <div key="new">
          <input
            onChange={(evt) =>
              setRegisterInfo({ user_name: evt.currentTarget.value })
            }
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Όνομα χρήστη"
          />
          <input
            onChange={(evt) =>
              setRegisterInfo({ password: evt.currentTarget.value })
            }
            autoComplete="new-password"
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Κώδικος"
          />
          <input
            onChange={(evt) =>
              setRegisterInfo({ reapeat_password: evt.currentTarget.value })
            }
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Επαλήθευση κωδικού"
          />
          <input
            onChange={(evt) =>
              setRegisterInfo({ first_name: evt.currentTarget.value })
            }
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Όνομα"
          />
          <input
            onChange={(evt) =>
              setRegisterInfo({ last_name: evt.currentTarget.value })
            }
            className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Επώνυμο"
          />

          <select
            onChange={(evt) => setRegisterInfo({ gender: evt.target.value })}
            placeholder="Gender"
            className="shadow  bg-transparent mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="male">Άντρας</option>
            <option value="female">Γύναικα</option>
          </select>

          <input
            onChange={(evt) => setRegisterInfo({ birthday: evt.target.value })}
            className="shadow bg-transparent mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            defaultValue={"1991-01-12"}
            placeholder="Ημερομηνία γέννησης"
          />

          <button
            onClick={() => _register(registerInfo)}
            className="bg-indigo-500 mb-4 w-full focus:outline-none hover:bg-indigo-700 text-white font-bold py-1 rounded"
          >
            Εγγραφή
          </button>
          <button
            onClick={() => setView("Συνδεση")}
            className="text-gray-500 w-full focus:outline-none  float-right text-xs"
          >
            <div>Έχετε ήδη λογαριασμό</div>
            <div className="underline">
              Συνδεθείτε &nbsp;
              <strong className="text-indigo-500">εδω</strong>
            </div>
          </button>
        </div>
      )}
    </PopOver>
  );
};

export default Login;
