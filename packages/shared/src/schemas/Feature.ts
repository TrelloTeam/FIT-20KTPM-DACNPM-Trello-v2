import { z } from "zod";

export const FeatureSchema = z.object({
  type: z.string(),
});
export type IFeature = z.infer<typeof FeatureSchema>;
export type Feature_CardLabel = IFeature & {
  type: "label";
  label_id: string;
};
export type Feature_Attachment = IFeature & {
  type: "attachment";
  link: string;
};
export type Feature_Date = IFeature & {
  type: "date";
  start_date?: Date;
  due_date: Date;
};
export type Feature_Checklist = IFeature & {
  type: "checklist";
  items: { name: string; is_checked: boolean }[];
};

export type Feature =
  | Feature_CardLabel
  | Feature_Attachment
  | Feature_Date
  | Feature_Checklist;
