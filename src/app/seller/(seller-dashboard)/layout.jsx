import SellerNavBar from "@/components/SellerNavBar";

export default function Layout({ children }) {
  return (
    <section>
      <SellerNavBar />
      <div className="pt-16 lg:ml-64">{children}</div>
    </section>
  );
}
