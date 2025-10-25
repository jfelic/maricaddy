import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Shadcn imports
import {
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from '@/components/ui/sidebar'

// Icon imports
import {
  UserIcon
} from '@/components/ui/icons/lucide-user'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maricaddy",
  description: "Maritime Contract Management Platform", // SEO
};

// Sidebar menu items
const items = [
  {
    title: "Contractors",
    url: "/contractors",
    icon: UserIcon
  }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Sidebar>
              <SidebarHeader>Maricaddy</SidebarHeader>
              <SidebarContent>
                {items.map((item) => (
                  // For each item, create a SidebarMenuItem
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />              {/* Renders the icon */}
                        <span>{item.title}</span>  {/* Renders the title */}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarContent>
            </Sidebar>
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
