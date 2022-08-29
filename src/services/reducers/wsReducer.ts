
type TWSState = {
  wsConnected: boolean;
  messages: string[];

  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: []
};


export const wsReducer = (state = initialState, action: TW)