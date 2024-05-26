import { IUserDataForm } from "../types";

export class UserDataForm implements IUserDataForm {
	payment: string;
	address: string;
}