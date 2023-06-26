import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const Home = () => {
  const user = useSelector((state: RootState) => state.users.user);
  console.log(user?.isAdmin);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
