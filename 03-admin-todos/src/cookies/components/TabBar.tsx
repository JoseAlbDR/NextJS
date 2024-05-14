'use client';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentIndex?: number;
  tabOptions?: number[];
}

const TabBar = ({ currentIndex = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentIndex);

  const onTabChange = (index: number) => {
    setSelected(index);
    setCookie('selectedTab', index.toString());
    router.refresh();
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
