
import { User } from '../types';

export const loginWithMicrosoft = async (): Promise<User> => {
  // In a real app, this would trigger the MS OAuth flow
  return new Promise((resolve) => {
    setTimeout(() => {
      const username = "Steve_Sheihu";
      resolve({
        username,
        uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5",
        isLoggedIn: true,
        skinUrl: `https://mc-heads.net/avatar/${username}/64`
      });
    }, 1500);
  });
};

export const logout = () => {
  // Logic to clear tokens
};
