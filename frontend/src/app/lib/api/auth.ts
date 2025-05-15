interface TokenResponse {
    access: string;
    refresh: string;
}

export const login = async (credentials: { username: string; password: string }): Promise<TokenResponse> => {
    const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Ошибка авторизации');
    }

    return response.json();
};

export const storeTokens = (tokens: TokenResponse): void => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem('access_token');
};