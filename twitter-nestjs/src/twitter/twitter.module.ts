import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Twitter, TwitterSchema } from "./schemas/twitter.schema";
import { TwitterController } from "./twitter.controller";
import { TwitterService } from "./twitter.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Twitter.name, schema: TwitterSchema }]),
    TypeOrmModule.forFeature([Twitter]),
  ],
  controllers: [TwitterController],
  providers: [TwitterService],
  exports: [MongooseModule, TypeOrmModule],
})
export class TwitterModule {}
