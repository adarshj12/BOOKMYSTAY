import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { login } from "../../redux/userSlice";
import jwtDecode from "jwt-decode";

export default function PublicRouteUser({children}) {
    const token = localStorage.getItem('userToken');
    if(token){
        const decode = jwtDecode(token)
        store.dispatch(login({
            user:decode.name,
            token
        }))
        return <Navigate to={'/profile'} />
    }
    return children;
}
