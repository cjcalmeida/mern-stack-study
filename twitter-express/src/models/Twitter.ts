import { model, Schema } from "mongoose";

interface Twitter {
  tweet: String;
  img: String;
}

const schema = new Schema<Twitter>({
  tweet: { type: String, required: true },
  img: { type: String, required: false },
});

const TwitterModel = model<Twitter>("contents", schema);

export default TwitterModel;
