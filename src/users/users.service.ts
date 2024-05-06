import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./interfaces/user.interface"
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}
  users: CreateUserDto[] = []

  async create(user: CreateUserDto) {
    const createdUser = await new this.userModel({
      username: user.username,
      password: await bcrypt.hash(user.password, 12),
    })
    return createdUser.save()
  }

  async findAll() {
    return await this.userModel.find().exec()
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec()
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }

  async delete(username: string) {
    const user = await this.userModel.findOne({ username }).exec()
    if (!user) {
      throw new NotFoundException("User not found")
    }
    await this.userModel.deleteOne({ username }).exec()
  }
}
