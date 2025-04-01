"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Body from "../Body";

// This whole component needs a rewrite. This is just a draft
const Header = () => {
  const pathname = usePathname();
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Projects</a>
                <ul className="p-2">
                  <li>
                    <Link
                      className="whitespace-nowrap"
                      href="/projects/snakeGame"
                    >
                      Snake Game
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="whitespace-nowrap"
                      href="/projects/userSearch"
                    >
                      User Search
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                // className="whitespace-nowrap"

                href="/"
                className={clsx("whitespace-nowrap ", {
                  underline: pathname === "/",
                })}
              >
                About Me
              </Link>
            </li>
            <li>
              <details>
                <summary>Projects</summary>

                <ul className="p-2">
                  <li>
                    <Link
                      className="whitespace-nowrap"
                      href="/projects/snakeGame"
                    >
                      Snake Game
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="whitespace-nowrap"
                      href="/projects/userSearch"
                    >
                      User Search
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
          />
        </div>
      </div>
      <Body />
    </div>
  );
};

export default Header;
