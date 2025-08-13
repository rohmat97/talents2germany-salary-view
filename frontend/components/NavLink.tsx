import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive 
          ? "text-blue-600 dark:text-blue-400" 
          : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
