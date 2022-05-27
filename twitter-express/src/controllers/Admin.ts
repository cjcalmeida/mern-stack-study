import { Request, Response } from "express";
import mongoose from "mongoose";
import { pgDatasource } from "../configuration/pg-datasource";
import { Twitter as TwitterPG } from "../entities/Twitter";
import Twitter from "../models/Twitter";

const tweetRepository = pgDatasource.getRepository(TwitterPG);

export const getTweets = (req: Request, res: Response): void => {
  Twitter.find((err, data) => {
    console.log(data);
    res.json(data);
    if (err) {
      console.log(err);
    }
  });
};

export const getTweet = async (req: Request, res: Response): Promise<any> => {
  const tweetId = req.params.tweetId;

  console.log("Tweet id", tweetId);

  if (!mongoose.Types.ObjectId.isValid(tweetId)) return false;

  await Twitter.findById(tweetId).exec();

  Twitter.findById(tweetId, (err: any, tweet: any) => {
    console.log(tweet);
    res.json(tweet);

    if (err) {
      console.log(err);
    }
  });
};

export const postTweet = async (req: Request, res: Response) => {
  const { tweet, img } = req.body;
  const twitter = new Twitter({ tweet: tweet, img: img });

  const { id } = await twitter.save();
  await tweetRepository.save({ id: id, tweet: tweet, img: img });

  console.log("Tweet created");

  res.status(201).json({ msg: "Tweet created" });
};

export const updateTweet = async (req: Request, res: Response) => {
  const tweetId = req.params.tweetId;
  const { tweet, img } = req.body;
  tweetRepository.findOneBy({ id: tweetId }).then((pgTweet) => {
    if (pgTweet != null) {
      tweetRepository.merge(pgTweet, { tweet: tweet, img: img });
      tweetRepository.save(pgTweet);
      Twitter.findByIdAndUpdate(pgTweet.id, { tweet: tweet, img: img }).then(
        () => {
          console.log(`Tweet ${tweetId} updated`);
          res.json({ msg: `Tweet ${tweetId} updated` });
        }
      );
    } else {
      res.status(404).json({ msg: `Tweet ${tweetId} not found` });
    }
  });
};

export const deleteTweet = (req: Request, res: Response) => {
  const tweetId = req.body.tweetId;

  tweetRepository.delete(tweetId);

  Twitter.findByIdAndRemove(tweetId, () => {
    res.json({ msg: `Tweet ${tweetId} deleted` });
  });
};
