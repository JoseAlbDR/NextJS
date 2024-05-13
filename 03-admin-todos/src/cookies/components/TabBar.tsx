'use client';
import { setCookie } from 'cookies-next';
import { useState } from 'react';
// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentIndex?: number;
  tabOptions?: number[];
}

const TabBar = ({ currentIndex = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
  const [selected, setSelected] = useState(currentIndex);

  const onTabChange = (index: number) => {
    setSelected(index);
    setCookie('selectedTab', index.toString());
  };

  return (
    <div
      className={`grid w-full ${
        'grid-cols-' + tabOptions.length
      } space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((option) => (
        <div key={option}>
          <input
            checked={selected === option}
            onChange={() => {}}
            type="radio"
            id={String(option)}
            className="peer hidden"
          />
          <label
            onClick={() => onTabChange(option)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-all"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
