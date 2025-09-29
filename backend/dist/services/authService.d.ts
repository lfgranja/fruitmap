import User from '../models/User';
interface LoginCredentials {
    email: string;
    password: string;
}
interface RegisterData {
    email: string;
    password: string;
    username: string;
    fullName?: string;
}
interface TokenPayload {
    id: string;
    email: string;
}
declare class AuthService {
    private jwtSecret;
    private jwtExpiry;
    constructor();
    register(userData: RegisterData): Promise<{
        user: User;
        token: string;
    }>;
    login(credentials: LoginCredentials): Promise<{
        user: User;
        token: string;
    }>;
    private generateToken;
    verifyToken(token: string): Promise<TokenPayload>;
    getUserById(id: string): Promise<User | null>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=authService.d.ts.map