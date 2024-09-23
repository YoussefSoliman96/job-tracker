"use client";

import { Box, Flex, useThemeContext } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";
import ThemeSwitch from "./components/ThemeSwitch";

const NavBar = () => {
  const { appearance } = useThemeContext();
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Jobs", href: "/jobs" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">
      <Flex justify="between">
        <Flex className="flex space-x-6 items-center">
          <Link href="/">
            <FaTasks />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <Link
                className={classnames({
                  "nav-link":
                    true &&
                    (appearance === "light" || appearance === "inherit"),
                  "dark-nav-link": true && appearance === "dark",
                  "!text-zinc-900":
                    link.href === currentPath &&
                    (appearance === "light" || appearance === "inherit"),
                  "!text-zinc-200":
                    link.href === currentPath && appearance === "dark",
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </Flex>
      </Flex>
      <ThemeSwitch />
    </nav>
  );
};

export default NavBar;
