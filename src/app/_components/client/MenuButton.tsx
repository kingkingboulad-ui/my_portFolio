"use client";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const MenuButton = ({ isOpen, toggle }: Props) => {
  return (
    <button
      onClick={toggle}
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10"
    >
      <span className="sr-only">فتح القائمة</span>

      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            isOpen
              ? "M1 1l15 12M1 13L16 1"
              : "M1 1h15M1 7h15M1 13h15"
          }
        />
      </svg>
    </button>
  );
};

export default MenuButton;