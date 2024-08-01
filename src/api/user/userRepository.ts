import type { User } from '@/api/user/userModel';
// TODO: Talk with the team to see if they have preferences on attribute order
// ie: eslint-plugin-sort-class-members
export const users: User[] = [
  {
    accountType: 'admin',
    id: 1,
    name: 'Alice',
    lastLoginDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    accountType: 'freeUser',
    id: 2,
    name: 'Robert',
    lastLoginDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
];

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    return users;
  }

  async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }
}
