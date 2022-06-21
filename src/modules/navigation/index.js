import { ChildrenPropType } from "../../utils/prop-types";
import Footer from "./components/footer";
import Header from "./components/header";

const Navigation = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Navigation;

Navigation.propTypes = {
  children: ChildrenPropType.isRequired,
};
