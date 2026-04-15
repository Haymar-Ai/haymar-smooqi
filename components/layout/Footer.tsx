import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-primary">
              Smooqi
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              One lesson a day. Build real knowledge.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; 2026 Smooqi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
