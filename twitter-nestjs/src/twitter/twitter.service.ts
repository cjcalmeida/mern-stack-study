import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { CreateTwitterDto } from "./dto/create-twitter.dto";
import { Twitter, TwitterDocument } from "./schemas/twitter.schema";
import { Twitter as TwitterEntity } from "./entities/twitter.entity";

@Injectable()
export class TwitterService {
  constructor(
    @InjectModel(Twitter.name) private twitterModel: Model<TwitterDocument>,
    @InjectRepository(TwitterEntity)
    private twitterRepository: Repository<TwitterEntity>
  ) {}

  async create(createTwitterDto: CreateTwitterDto): Promise<Twitter> {
    const createdTwitter = new this.twitterModel(createTwitterDto);
    return createdTwitter.save();
  }

  async findAll(): Promise<Twitter[]> {
    return this.twitterModel.find().exec();
  }

  async findOne(id: string): Promise<Twitter> {
    return this.twitterModel.findOne({ _id: id });
  }

  async update(id: string, twitter: Twitter): Promise<Twitter> {
    return this.twitterModel.findByIdAndUpdate(id, twitter, { new: true });
  }

  async delete(id: string): Promise<Twitter> {
    return this.twitterModel.findByIdAndRemove({ _id: id });
  }
}
