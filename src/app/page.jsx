import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsListing from "@/components/ProductsListing";

const HomePage = () => {
  return (
    <>
      {/* <h2>Categories</h2>
      <ul>
        <li>Clothes</li>
        <li>Electronics</li>
        <li>Kitchen Utensils</li>
        <li>Furniture</li>
        <li>Shoes</li>
        <li>Miscellaneous</li>
      </ul> */}
      <Header />
      <ProductsListing />
      <Footer />
    </>
  );
};

export default HomePage;
