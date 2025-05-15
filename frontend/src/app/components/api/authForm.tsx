'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: mode === 'register' ? '' : undefined
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const url = 'http://127.0.0.1:8000/api/v1/token/'
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Ошибка авторизации')
            }

            if (mode === 'login') {
                const { access, refresh } = await response.json()
                // Сохраняем токены
                localStorage.setItem('access_token', access)
                localStorage.setItem('refresh_token', refresh)
                router.push('/')
            } else {
                router.push('/login')
            }
        } catch (err) {
            setError('err.message = login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        {mode === 'login' ? 'Вход' : 'Регистрация'}
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === 'register' && (
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                                Имя пользователя
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Пароль
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                minLength={3}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading
                                ? 'bg-blue-700 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        >
                            {isLoading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        {mode === 'login' ? (
                            <>
                                Нет аккаунта?{' '}
                                <Link href="/register" className="text-blue-400 hover:text-blue-300">
                                    Зарегистрируйтесь
                                </Link>
                            </>
                        ) : (
                            <>
                                Уже есть аккаунт?{' '}
                                <Link href="/login" className="text-blue-400 hover:text-blue-300">
                                    Войдите
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}