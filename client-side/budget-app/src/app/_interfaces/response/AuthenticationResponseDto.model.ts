export interface AuthResponseDto {
    tokenType: string,
    accessToken: string,
    expiresIn: number,
    refreshToken: string
}