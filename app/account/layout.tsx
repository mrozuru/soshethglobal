import Footer from "@/components/Footer";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className=" mb-[10vh]">{children}</div>
      <Footer />
    </div>
  );
}
