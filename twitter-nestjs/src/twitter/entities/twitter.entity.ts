import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "contents" })
export class Twitter {
  @PrimaryColumn()
  id: string;
  @Column()
  tweet: string;
  @Column()
  img: string;
}
