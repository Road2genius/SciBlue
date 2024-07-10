export type TagInputProps = {
  label: string;
  placeholder: string;
  defaultTags: string[];
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};
