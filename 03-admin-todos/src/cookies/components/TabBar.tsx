// https://tailwindcomponents.com/component/radio-buttons-1

const tabOptions = [1, 2, 3, 4, 5];

const TabBar = () => {
  return (
    <div
      className={`grid w-full grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((option) => (
        <div key={option}>
          <input type="radio" id={String(option)} className="peer hidden" />
          <label className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
