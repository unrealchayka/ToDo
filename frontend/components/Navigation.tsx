'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from './theme-toggle';
import { Menu, House, LayoutDashboard, CircleUserRound, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'Home', icon: <House color="#ffffff" /> },
    { href: '/note', label: 'Note Dashboard', icon: <LayoutDashboard /> },
    { href: '/profile', label: 'Profile', icon: <CircleUserRound /> }
  ];

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-md font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block ml-4">
            <ModeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <ModeToggle />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute z-10 w-[200px] top-20 right-5 md:hidde">
          <div className="bg-white dark:bg-[#0a0a0a] border rounded-[5px] px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}