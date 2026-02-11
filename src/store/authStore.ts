import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  password?: string
  bio?: string
  avatar?: string
}

interface AuthState {
  // State
  isAuthenticated: boolean
  user: User | null
  showAuth: boolean
  authMode: 'login' | 'register'

  // Actions
  login: (username: string, password: string) => boolean
  register: (firstName: string, lastName: string, username: string, password: string) => boolean
  logout: () => void
  setAuthMode: (mode: 'login' | 'register') => void
  setUser: (user: User) => void
}

// Mock database - in real app this would be in backend
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Demo',
    lastName: 'User',
    username: 'demo',
    password: 'demo123',
    bio: 'Hey there! I am using Telegram.',
    avatar: 'https://i.pravatar.cc/150?img=10',
  }
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      showAuth: true,
      authMode: 'login',

      // Login with username and password
      login: (username: string, password: string) => {
        const user = mockUsers.find(
          u => u.username === username && u.password === password
        )

        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({
            isAuthenticated: true,
            user: userWithoutPassword,
            showAuth: false,
          })
          return true
        }
        return false
      },

      // Register new user
      register: (firstName: string, lastName: string, username: string, password: string) => {
        // Check if username already exists
        if (mockUsers.find(u => u.username === username)) {
          return false
        }

        const newUser: User = {
          id: Date.now().toString(),
          firstName,
          lastName,
          username,
          password,
          bio: 'Hey there! I am using Telegram.',
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        }

        mockUsers.push(newUser)
        const { password: _, ...userWithoutPassword } = newUser

        set({
          isAuthenticated: true,
          user: userWithoutPassword,
          showAuth: false,
        })
        return true
      },

      // Logout
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          showAuth: true,
          authMode: 'login',
        })
      },

      // Set auth mode (login/register)
      setAuthMode: (mode: 'login' | 'register') => {
        set({ authMode: mode })
      },

      // Set user directly
      setUser: (user: User) => {
        set({ user, isAuthenticated: true, showAuth: false })
      },
    }),
    {
      name: 'telegram-auth',
      // Only persist what we need
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
)
