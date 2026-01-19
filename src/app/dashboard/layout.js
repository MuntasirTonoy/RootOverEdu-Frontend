import AppSidebar from '@/components/AppSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-base-100">
      <AppSidebar />
      <main className="flex-1 p-8 bg-base-200/50 min-h-[calc(100vh-5rem)]">
        {children}
      </main>
    </div>
  );
}
