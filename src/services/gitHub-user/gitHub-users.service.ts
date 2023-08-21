import {http} from "@/config/http.ts";
import {IGitHubUsersResponse} from "@/services/gitHub-user/gitHub-users.types.ts";

export const GitHubUsersService = {
    async getUsers(params: {q: string, page?: number, per_page?: number, order?: 'desc' | 'asc' | string, sort?: 'followers' | 'repositories' | 'joined' | string, username?: string}) {
        return await http.get<IGitHubUsersResponse>('/users', {params})
    },
}