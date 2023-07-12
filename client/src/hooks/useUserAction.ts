import { useSelector } from "react-redux";
import { RootState, store } from "../redux/Store";
import { setLogoutAction } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

// hook that checks how many action the user has, if he has 0 left log them out
export const useUserActions = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.numOfActions === 0) {
      // if user have no actions left then log them out
      store.dispatch(setLogoutAction());
      // navigate the user to main page(login)
      navigate("/");
      // show error toast
      toast.error(
        "You've been logged out because you have no actions left for today"
      );
    }
  }, [user, navigate]);
};
