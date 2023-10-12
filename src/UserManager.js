import { existsSync, promises } from "fs";

const path = "UsersFile.json";

class UsersManager {
  async getUsers(queryObj = {}) {
    const { limit } = queryObj;
    try {
      if (existsSync(path)) {
        const usersFile = await promises.readFile(path, "utf-8");
        const usersData = JSON.parse(usersFile);
        return limit ? usersData.slice(0, +limit) : usersData;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(user) {
    try {
      const users = await this.getUsers({});
      let id;
      if (!users.length) {
        id = 1;
      } else {
        id = users[users.length - 1].id + 1;
      }
      const newUser = { id, ...user };
      users.push(newUser);
      await promises.writeFile(path, JSON.stringify(users));
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(id) {
    try {
      const users = await this.getUsers();
      const user = users.find((u) => u.id === id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const users = await this.getUsers({});
      const user = users.find((u) => u.id === id);
      if (user) {
        const newArrayUsers = users.filter((u) => u.id !== id);
        await promises.writeFile(path, JSON.stringify(newArrayUsers));
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, obj) {
    try {
      const users = await this.getUsers({});
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        return null;
      }
      const updateUser = { ...users[index], ...obj };
      users.splice(index, 1, updateUser);
      await promises.writeFile(path, JSON.stringify(users));
      return updateUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const manager = new UsersManager();
