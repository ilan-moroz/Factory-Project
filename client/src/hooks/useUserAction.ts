import { useSelector } from "react-redux";
import { RootState, store } from "../redux/Store";
import { setLogoutAction } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";

// hook that checks how many action the user has, if he has 0 left log them out
export const useUserActions = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();

  if (user?.numOfActions === 0) {
    // if user have no actions left then log them out
    store.dispatch(setLogoutAction());
    // navigate the user to main page(login)
    navigate("/");
    // show error message
  }
};
