import {IUser} from "@/types/IUser.ts";

export interface IGitHubUsersResponse {
    incomplete_results: boolean,
    items: IUser[],
    total_count: number
}