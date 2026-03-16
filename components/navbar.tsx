'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">MedBook</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/doctors" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Find Doctors
            </Link>
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button className="bg-primary text-white hover:bg-blue-700">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/doctors" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Find Doctors
              </Link>
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Button className="w-full bg-primary text-white hover:bg-blue-700">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
