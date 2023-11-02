import { usersModel } from "../db/models/users.models";

class UsersManager {
  async findAll() {
    const response = await usersModel.find();
    return response;
  }

  async createOne(obj) {
    const response = await usersModel.create(obj);
    return response;
  }
}
export const userMananger = new UsersManager();
