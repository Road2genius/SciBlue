export type TagInputProps = {
  label: string;
  placeholder: string;
  tags: string[];
  nonDeletableTags?: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};
