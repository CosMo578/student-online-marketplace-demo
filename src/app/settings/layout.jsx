import Header from '@/components/Header';
import SettingNavBar from "@/components/SettingNavBar";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <section className="flex w-[100vw] max-w-[100vw] gap-10 overflow-x-hidden">
        <SettingNavBar />
        <section className="w-[70vw] p-8">{children}</section>
      </section>
    </>
  );
}
