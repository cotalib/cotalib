"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const pages: { title: string; href: string; }[] = [
  {
    title: "Mission",
    href: "#mission",
  },
  {
    title: "Traction",
    href: "#traction",
  },
  {
    title: "Awards",
    href: "#awards",
  },
  {
    title: "Contact",
    href: "#contact",
  },
]

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-4 shadow-md">
      <NavigationMenu className="mx-auto" viewport={false}>
        <NavigationMenuList>
          {pages.map((page) => (
            <NavigationMenuItem key={page.href}>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={page.href}>{page.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
