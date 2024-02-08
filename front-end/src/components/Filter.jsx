import { useSearchParams } from "react-router-dom";

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };

  const mappedFilters = options.map((option) => (
    <button
      onClick={() => handleClick(option.value)}
      key={option.value}
      className={`${
        currentFilter === option.value && "bg-emerald-300"
      } py-2 px-4 rounded-md font-semibold transition duration-300 
       text-gray-700 hover:bg-emerald-300 `}
    >
      {option.label}
    </button>
  ));
  return (
    <div className="border bg-white border-gray-100 rounded-md shadow-sm p-1 flex gap-1">
      {mappedFilters}
    </div>
  );
};

export default Filter;
