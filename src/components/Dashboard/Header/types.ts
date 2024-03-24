import { IUser } from "../../Register/types";
import { Dispatch, SetStateAction } from "react";

export interface IHeaderProps {
	user: IUser | undefined;
	setUser: Dispatch<SetStateAction<IUser | undefined>>;
}
