"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaTasks } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Jobs", href: "/jobs" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaTasks />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
