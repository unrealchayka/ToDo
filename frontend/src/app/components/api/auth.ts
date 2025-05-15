import { jwtDecode } from 'jwt-decode';

interface UserData {
    username: string;
    email: string;
    user_id: number;
}

interface DecodedToken extends UserData {
    exp: number;
    iat: number;
    // другие стандартные поля JWT
}

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Ошибка авторизации');
        }

        const tokens = await response.json();
        storeTokens(tokens);

        return tokens;
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};


export const storeTokens = (tokens: { access: string; refresh: string }): void => {
    try {
        // Проверяем, что мы в браузере (localStorage доступен)
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', tokens.access);
            localStorage.setItem('refresh_token', tokens.refresh);

            // Опционально: устанавливаем время истечения токена
            const expiresIn = 60 * 60 * 1000; // 1 час
            const expirationDate = new Date().getTime() + expiresIn;
            localStorage.setItem('token_expires', expirationDate.toString());
        }
    } catch (error) {
        console.error('Ошибка при сохранении токена:', error);
    }
};

export const getUserDataFromToken = (): UserData | null => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
        const decoded: DecodedToken = jwtDecode(token);
        return {
            username: decoded.username,
            email: decoded.email,
            user_id: decoded.user_id,
        };
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return null;
    }
};

export const fetchUserProfile = async (): Promise<UserData | null> => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    try {
        const response = await fetch('http://localhost:8000/api/user/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка получения данных пользователя');
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
};

