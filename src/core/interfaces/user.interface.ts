import { Role } from "./role.interface"

export interface User {
    id: number,
    name: string,
    roles: number[] | Role[];
}