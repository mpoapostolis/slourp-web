import React, { createContext, useReducer, useContext } from 'react';
import reducer, { Store, initState } from './reducer';

export type ProviderType = Store & { dispatch: any };
export const Account = createContext<ProviderType>({
  ...initState,
  dispatch: () => 0
});

type Props = {
  children: React.ReactNode;
};

function AccountProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Account.Provider value={{ ...state, dispatch }}>
      {props.children}
    </Account.Provider>
  );
}

export const useAccount = () => useContext(Account);

export default AccountProvider;
