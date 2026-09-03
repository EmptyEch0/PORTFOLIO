'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="flex md:flex-col gap-3 text-sm font-medium">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`transition-colors duration-150 ${
              isActive
                ? 'text-gray-900 dark:text-white font-bold'
                : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
