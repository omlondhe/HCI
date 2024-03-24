import { IUser } from "../Register/types";
import { Dispatch, SetStateAction } from "react";

export interface ILogInProps {
	user: IUser | undefined;
	setTab: (tab: "login" | "register" | "dashboard") => void;
	setUser: Dispatch<SetStateAction<IUser | undefined>>;
}
