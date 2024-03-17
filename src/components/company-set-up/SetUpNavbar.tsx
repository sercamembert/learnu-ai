"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import logoutIcon from "../../../public/icons/logout.png";

const variants = {
  open: { x: 0 },
  closed: { x: 800 },
};
const SetUpNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`w-full padding h-[80px] ${
        isOpen ? "bg-white" : "bg-white"
      } fixed top-0 flex items-center justify-between xl:h-[100px] z-50 ${
        isScrolled && "md:bg-white"
      } `}
    >
      <Link href="/" aria-description="Home">
        <Image
          src="/icons/logo.png"
          alt="Agromalz"
          aria-description="Home"
          width={293.32}
          height={41.62}
          className="w-[120px] md:w-[88px] lg:w-[117px] xl:w-[146px] 2xl:w-[164px] desktop:w-[197px] ultra:w-[293px]"
        />
      </Link>

      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Logout">
          <div className="flex items-center gap-[5px] md:gap-[6px] lg:gap-[8px] xl:gap-[9px] 2xl:gap-[11px] desktop:gap-[16px]">
            <p
              className="font-sf text-[#FF0000] opacity-70
            text-[11px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[17px] ultra:text-[25px] "
            >
              Logout
            </p>
            <Image
              src={logoutIcon}
              width={16}
              height={18}
              alt="logout"
              className="w-[11px] md:w-[5px] lg:w-[7px] xl:w-[8px] 2xl:w-[12px] desktop:w-[14px] ultra:w-[16px]"
            />
          </div>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default SetUpNavbar;
