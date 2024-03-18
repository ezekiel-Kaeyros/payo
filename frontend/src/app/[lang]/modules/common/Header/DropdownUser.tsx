import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RemoveCookie } from "../../../context/cookies";
import avatarIcon from '../../../../../../public/assets/150.jpeg'
import LanguageToggler from "../../../common/components/language/LanguageToggler";
import CommonHeaderElement from "./CommonHeaderElement";

const DropdownUser = ({ dict }: { dict: string }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false); 
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const router = useRouter();

  const [ userInfoOnNavBar, setUserInfoOnNavBar ] = useState<{first_name: string; last_name: string, role: Array<{ name: string }> }> ()

  useEffect(() => {
    const userU: any = JSON.parse(localStorage.getItem('user')!); 
    setUserInfoOnNavBar (userU); 
  }, [])

  return (
    <div className="relative" style={{
      zIndex: "999999"
    }}>
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-white dark:text-white">
            { userInfoOnNavBar?.first_name } { userInfoOnNavBar?.last_name }
          </span>
          <span className="block text-xs text-white">
            { userInfoOnNavBar?.role[0]?.name }
          </span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden">
          <Image
            width={112}
            height={112}
            src={avatarIcon}
            // /new_assets/user.jpg
            alt="User"
          />
        </span>

      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <CommonHeaderElement dict={ dict } specialStyle="sm:hidden" />
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
