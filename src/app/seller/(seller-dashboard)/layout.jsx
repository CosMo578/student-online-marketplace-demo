import SellerNavBar from "@/components/SellerNavBar";

export default function Layout({ children }) {
  return (
    <section>
      <SellerNavBar />
      <div className="pt-16 lg:ml-64">{children}</div>
    </section>
  );
}

// ${pathname == "/pastQuestions" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"}
// ${pathname == "/home" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"}
// ${pathname.includes("/quiz") ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"}
// ${pathname == "/chatroom" ? "bg-primary-100 text-white" : "bg-neutral-100 text-neutral-600"}
