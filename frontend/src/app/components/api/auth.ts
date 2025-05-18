export const refreshToken = async (): Promise<string | null> => {
    try {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) return null;

        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh }),
        });

        if (response.ok) {
            const { access } = await response.json();
            localStorage.setItem('access_token', access);
            return access;
        }
        return null;
    } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
    }
};

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const tokens = await response.json();
        storeTokens(tokens);

        return tokens;
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const verify = async (): Promise<boolean> => {
    try {
        const access = localStorage.getItem('access_token');
        
        if (!access) {
            return false;
        }

        const response = await fetch('http://127.0.0.1:8000/api/token/verify/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: access }),
        });

        if (response.ok) {
            return true;
        }

        const newAccessToken = await refreshToken();
        return !!newAccessToken;
        
    } catch (error) {
        return false;
    }
}


export const storeTokens = (tokens: { access: string; refresh: string }): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);

            const expiresIn = 60 * 60 * 1000; // 1 час
            const expirationDate = new Date().getTime() + expiresIn;
            localStorage.setItem('token_expires', expirationDate.toString());
        }
    } catch (error) {
        console.error('Ошибка при сохранении токена:', error);
    }
};