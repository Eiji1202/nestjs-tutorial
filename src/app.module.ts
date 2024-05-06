import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { MongooseModule } from "@nestjs/mongoose"
import * as dotenv from "dotenv"

dotenv.config()

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
