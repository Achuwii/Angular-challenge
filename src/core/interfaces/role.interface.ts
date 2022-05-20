import { User } from "./user.interface"

export interface Role {
    id: number,
    name: string,
    colour: string
    users?: User[];
}