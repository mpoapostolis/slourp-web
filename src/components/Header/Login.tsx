import React from "react";
import PopOver from "../PopOver";
import { useState } from "react";
import { useAccount } from "../../provider";
import { LOGIN } from "../../provider/names";
import { useMutation } from "react-query";

import ky from "ky";
import { login, register } from "../../api/users";

type Rec = Record<string, any>;

const inputClass =
  "shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const inputErrClass =
  "border-red-500 placeholder-red-300 text-red-600 shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none ";

const getClass = (hasErr?: string) => (hasErr ? inputErrClass : inputClass);

const Login = () => {
  const [view, setView] = useState("Συνδεση");
  const setCreds = (obj: Rec) => _setCreds((s) => ({ ...s, ...obj }));
  const [creds, _setCreds] = useState<Record<string, string>>({});
  const [err, setErr] = useState<Record<string, string>>({});
  const [registerInfo, _setRegisterInfo] = useState<
    Record<string, string | undefined>
  >({
    user_name: undefined,
    password: undefined,
    repeat_password: undefined,
    first_name: undefined,
    last_name: undefined,
    gender: "male",
    birthday: "1991-01-12",
  });
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
    onSuccess: () => {
      setErr({});
      setView("Συνδεση");
    },
    onError: async (err: any) => {
      const error = await err.response.json();
      setErr(error);
    },
  });

  return (
    <PopOver
      showClose
      stayOpen
      position="right"
      onCLose={() => setErr({})}
      label={
        <button className="focus:outline-none py-3 h-full uppercase tracking-wide text-xs text-indigo-600 font-bold">
          {view}
        </button>
      }
    >
      {view === "Συνδεση" ? (
        <div className="p-8">
          <input
            onChange={(evt) => setCreds({ user_name: evt.currentTarget.value })}
            className={inputClass}
            type="text"
            placeholder="Όνομα χρήστη"
          />
          <input
            onChange={(evt) => setCreds({ password: evt.currentTarget.value })}
            className={inputClass}
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
            className="text-gray-500 w-full  mb-4 focus:outline-none float-right text-xs"
          >
            <div>Δεν έχετε λογαριασμο</div>
            <div className="underline">
              Δημιουργήστε έναν &nbsp;
              <strong className="text-indigo-500">εδω</strong>
            </div>
          </button>
        </div>
      ) : (
        <div className="p-8" key="new">
          <input
            onChange={(evt) =>
              setRegisterInfo({ user_name: evt.currentTarget.value })
            }
            className={getClass(err.user_name)}
            type="text"
            value={registerInfo.user_name ?? ""}
            placeholder={err.user_name ?? "Όνομα χρήστη"}
          />
          <input
            onChange={(evt) =>
              setRegisterInfo({ password: evt.currentTarget.value })
            }
            onBlur={() => setErr({})}
            autoComplete="new-password"
            className={getClass(err.password)}
            type="password"
            value={registerInfo.password ?? ""}
            placeholder={err.password ?? "Κώδικος"}
          />
          <input
            onBlur={() => {
              if (registerInfo.repeat_password !== registerInfo.password) {
                setRegisterInfo({ repeat_password: undefined });
                setErr({
                  repeat_password: "password are not match",
                  password: "password are not match",
                });
              } else setErr({});
            }}
            onChange={(evt) =>
              setRegisterInfo({ repeat_password: evt.currentTarget.value })
            }
            className={getClass(err.repeat_password)}
            type="password"
            value={registerInfo.repeat_password ?? ""}
            placeholder={err.repeat_password ?? "Επαλήθευση κωδικού"}
          />{" "}
          <input
            onChange={(evt) =>
              setRegisterInfo({ first_name: evt.currentTarget.value })
            }
            className={getClass(err.first_name)}
            value={registerInfo.first_name ?? ""}
            placeholder={err.first_name ?? "Όνομα"}
          />
          <input
            onChange={(evt) =>
              setRegisterInfo({ last_name: evt.currentTarget.value })
            }
            className={getClass(err.last_name)}
            value={registerInfo.last_name ?? ""}
            placeholder={err.last_name ?? "Επώνυμο"}
          />
          <select
            onChange={(evt) => setRegisterInfo({ gender: evt.target.value })}
            value={registerInfo.gender}
            placeholder="Gender"
            className="shadow  bg-transparent mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="male">Άντρας</option>
            <option value="female">Γύναικα</option>
          </select>
          <input
            onChange={(evt) => setRegisterInfo({ birthday: evt.target.value })}
            className={inputClass}
            type="date"
            value={registerInfo.birthday ?? "1991-01-12"}
            placeholder="Ημερομηνία γέννησης"
          />
          <button
            onClick={() => {
              const { repeat_password, ...rest } = registerInfo;
              _register(rest);
            }}
            className="bg-indigo-500 mb-4 w-full focus:outline-none hover:bg-indigo-700 text-white font-bold py-1 rounded"
          >
            Εγγραφή
          </button>
          <button
            onClick={() => setView("Συνδεση")}
            className="text-gray-500 mb-8 w-full focus:outline-none  float-right text-xs"
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
