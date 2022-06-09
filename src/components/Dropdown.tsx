import { useEffect, useState } from "react";

interface PropType {
  options: string[];
  defaultVal: string;
  onSelect: (val: string) => void;
}

const Dropdown = ({ options, defaultVal, onSelect }: PropType) => {
  const [selected, setSelected] = useState(defaultVal);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  const optionHandler = (val: string) => {
    setSelected(val);
    setIsOpen((prevVal) => !prevVal);
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown-input"
        onClick={() => {
          setIsOpen((prevVal) => !prevVal);
        }}
      >
        {selected}
        <div className={isOpen ? "triangle-down" : "triangle-up"} />
      </div>
      {isOpen && (
        <div className="dropdown-content scroll">
          <ul>
            {options.map((option, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    optionHandler(option);
                  }}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
