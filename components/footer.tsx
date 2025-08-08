import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { config } from "@/lib/core";
import { ThemeToggler } from "./theme-togglers";

export default function Footer() {
  return (
          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Cotalib. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <div className="flex gap-3 ml-4">
            <Link href={config.socials.facebook} aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href={config.socials.twitter} aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href={config.socials.instagram} aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <Link href={config.socials.linkedin} aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
            <ThemeToggler />
          </div>
        </nav>
      </footer>
  )
}
