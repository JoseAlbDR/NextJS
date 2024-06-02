import { create } from 'zustand';

interface State {
  orderStatus: {
    status: string;
  };

  // Methods
  setOrderStatus: (orderStatus: State['orderStatus']) => void;
}

export const usePaypalStore = create<State>()((set, get) => ({
  orderStatus: {
    status: '',
  },
  setOrderStatus: (orderStatus) => {
    set({ orderStatus });
  },
}));
