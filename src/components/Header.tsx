import ThemeToggle from "./ThemeToggle";
import ViewCounter from './Counter';
import type { HeaderProps } from "../types";
import texts from "../texts";

const Header = ({ name, title, children }: HeaderProps) => {
  const today = new Date().toLocaleDateString("et-EE");

  return (
    <header className="
        col-start-2 col-span-6 row-start-1
        grid grid-cols-1 gap-4
        text-xl lg:text-[1.375rem] uppercase p-2
        lg:grid-cols-2 lg:grid-rows-[min-content_1fr]
      ">
      <div className="col-span-1 lg:col-span-2 text-center leading-[1.2]">
        <h1 className="text-3xl font-bold">
          {name} - {title}
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 lg:text-[1.15rem]">
        <p className="text-base text-center ">
          {texts.header.welcome} {today}.
        </p>
        <ViewCounter />
      </div>

      <div className="flex flex-col items-center justify-center gap-2
                      lg:flex-row lg:gap-1 lg:justify-end lg:items-center lg:flex-nowrap  xl:gap-4">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
