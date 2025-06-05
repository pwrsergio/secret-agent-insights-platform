import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};