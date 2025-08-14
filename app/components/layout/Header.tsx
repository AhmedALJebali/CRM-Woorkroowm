import { FiSearch, FiSettings } from "react-icons/fi";

export default function Header() {
  return (
    <header className="h-fit flex px-1 justify-between">
      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className=" outline-none"
        />
      </div>

      <div className="flex items-center gap-4 bg-white">
        <FiSettings className="text-gray-500 cursor-pointer" />
        <div className="flex items-center gap-2">
          <img
            src="/avatar.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">Evan Yates</span>
        </div>
      </div>
    </header>
  );
}
