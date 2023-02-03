import { useUser } from './useUser';

export const useAuth = () => {
    const { user, addUser, removeUser } = useUser();
  
    const login = (user: User) => {
      addUser(user);
    };
  
    const logout = () => {
      removeUser();
    };
  
    return { user, login, logout };
};