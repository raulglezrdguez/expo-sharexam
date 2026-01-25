import { ObjectSchema, Realm } from "realm";

export class Patient extends Realm.Object<Patient> {
  _id!: Realm.BSON.ObjectId;
  identifier!: string;
  name!: string;
  birthdate!: Date;
  sex!: "M" | "F";

  static schema: ObjectSchema = {
    name: "Patient",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      identifier: "string",
      name: "string",
      birthdate: "date",
      sex: "string",
    },
  };
}

export class Exam extends Realm.Object<Exam> {
  _id!: string;
  title!: string;
  description!: string;
  authorName!: string;
  authorEmail!: string;
  result!: Realm.List<ExamResult>;
  nodes!: string;
  edges!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: ObjectSchema = {
    name: "Exam",
    primaryKey: "_id",
    properties: {
      _id: "string",
      title: "string",
      description: "string",
      authorName: "string",
      authorEmail: "string",
      result: "ExamResult[]",
      nodes: "string",
      edges: "string",
      createdAt: "date",
      updatedAt: "date",
    },
  };
}

export class ExamResult extends Realm.Object<ExamResult> {
  label?: string;
  value?: string;
  reference?: string;

  static schema: ObjectSchema = {
    name: "ExamResult",
    embedded: true,
    properties: {
      label: "string?",
      value: "string?",
      reference: "string?",
    },
  };
}

export class ExamAnswer extends Realm.Object<ExamAnswer> {
  id!: string;
  value!: string;

  static schema: ObjectSchema = {
    name: "ExamAnswer",
    embedded: true,
    properties: {
      id: "string",
      value: "string",
    },
  };
}

export class AppliedExam extends Realm.Object<AppliedExam> {
  _id!: Realm.BSON.ObjectId;
  patientId!: Realm.BSON.ObjectId;
  examId!: string;
  date!: Date;
  results!: Realm.List<ExamResult>;
  answers!: Realm.List<ExamAnswer>;

  static schema: ObjectSchema = {
    name: "AppliedExam",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      patientId: "objectId",
      examId: "string",
      date: "date",
      results: "ExamResult[]",
      answers: "ExamAnswer[]",
    },
  };
}
