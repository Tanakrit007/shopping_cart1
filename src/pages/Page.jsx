import { useSelector } from "react-redux";
import Home from "./Home";
import MyCart from "./Mycart";

const Page = () => {
  const page = useSelector((state) => state.pages);
  return <div>{page.home ? <Home /> : <MyCart />}</div>;
};

export default Page;
