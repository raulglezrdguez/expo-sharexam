import { ObjectSchema, Realm } from "realm";

export class UserProfile extends Realm.Object<UserProfile> {
  _id!: string;
  name!: string;
  email!: string;
  image?: string;

  static schema: ObjectSchema = {
    name: "UserProfile",
    primaryKey: "_id",
    properties: {
      _id: "string",
      name: "string",
      email: "string",
      image: "string?",
    },
  };
}
