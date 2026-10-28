import { useState } from 'react';
import texts from "../texts";

interface NavigationProps {
  links: string[];
}

const Navigation = ({ links }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col items-center justify-center w-full p-4">
      <button
        className="
          block text-xl px-8 py-3 w-36 h-12
          md:block md:text-xl md:px-2 md:py-6
          lg:hidden
        "
        onClick={toggleMenu}
      >
        <span aria-label={texts.navigation.menu}>☰</span>
      </button>

      <div
        className={`
          flex flex-col items-center gap-4 mt-4
          overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
          ${isOpen ? 'max-h-[500px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
          lg:flex lg:flex-row lg:gap-0 lg:max-h-none lg:opacity-100 lg:pointer-events-auto lg:mt-0
          xl:gap-4
        `}
      >
        {links.map((link, index) => (
          <button
            key={index}
            className="py-2 px-4 text-lg"
            onClick={() => (window.location.hash = link.toLowerCase())}
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
