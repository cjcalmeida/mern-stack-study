import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { TwitterModule } from "./twitter/twitter.module";

@Module({
  imports: [
    TwitterModule,
    MongooseModule.forRoot("mongodb://twitter:twitter@localhost:27017/twitter"),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "twitter",
      password: "twitter",
      entities: ["dist/**/*.entity{.ts,.js]"],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
