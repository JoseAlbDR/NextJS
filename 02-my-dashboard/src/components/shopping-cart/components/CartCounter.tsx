'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  decrement,
  increment,
  initCounterState,
} from '@/store/counter/counterSlice';
import React, { useEffect } from 'react';

interface Props {
  value?: number;
}

interface CounterResponse {
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const data: CounterResponse = await fetch('/api/counter').then((res) =>
    res.json()
  );

  return data;
};

const CartCounter = ({ value = 10 }: Props) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.count);

  // useEffect(() => {
  //   dispatch(initCounterState(value));
  // }, [dispatch, value]);

  useEffect(() => {
    const getCounter = async () => {
      const data = await getApiCounter();
      dispatch(initCounterState(data.count));
    };
    getCounter();
  }, [dispatch]);

  return (
    <>
      <span className="text-9xl">{count}</span>
      <div className="flex">
        <button
          onClick={() => dispatch(decrement())}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          +1
        </button>
      </div>
    </>
  );
};

export default CartCounter;
