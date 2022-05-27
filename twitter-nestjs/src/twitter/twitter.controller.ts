import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CreateTwitterDto, TwitterDto } from "./dto/create-twitter.dto";
import { TwitterService } from "./twitter.service";

@Controller("tweets")
export class TwitterController {
  constructor(private twitterService: TwitterService) {}

  @Post()
  async create(createTwitterDto: CreateTwitterDto) {
    this.twitterService.create(createTwitterDto);
  }

  @Get()
  async findAll(): Promise<TwitterDto[]> {
    return this.twitterService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<TwitterDto> {
    return this.twitterService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() twitter: CreateTwitterDto
  ): Promise<TwitterDto> {
    return this.twitterService.update(id, twitter);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<TwitterDto> {
    return this.twitterService.delete(id);
  }
}
