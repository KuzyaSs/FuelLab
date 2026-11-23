import { useEffect, type JSX, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setUnauthorizedHandler } from "../../../common/api/client";
import { loggedOut } from "../authSlice";

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const dispatch = useDispatch()

    useEffect(() => {
        setUnauthorizedHandler(() => dispatch(loggedOut()))

        return () => {
            setUnauthorizedHandler(null)
        }
    }, [dispatch])

    return <>{children}</>
}
