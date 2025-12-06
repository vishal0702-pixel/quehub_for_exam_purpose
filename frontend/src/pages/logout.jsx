import { useDispatch } from "react-redux";
import { logoutUser } from "../authsllice";

export function Logout() {
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logoutUser()); // <-- call the function!
  };

  return (
    <div>
      <ul>
        <li onClick={handlelogout} className="cursor-pointer text-red-500 hover:text-red-700">
          Logout
        </li>
      </ul>
    </div>
  );
}
