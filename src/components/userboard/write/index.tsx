import { Body3, Frame } from "@/atoms";

interface WritePostProps {
  title: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const WritePost = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onClose,
  onSubmit,
}: WritePostProps) => {
  return (
    <Frame w="100%" h="100vh" col>
      <Frame w="100%" col p={16} gap={24}>
        <input
          value={title}
          onChange={onTitleChange}
          placeholder="제목을 입력해주세요"
          style={{
            width: "100%",
            border: "none",
            fontSize: "18px",
            outline: "none",
          }}
        />
        <textarea
          value={content}
          onChange={onContentChange}
          placeholder="본문을 입력해주세요. (욕설, 폭언 등을 사용할 경우 이용이 제한될 수 있습니다.)"
          style={{
            width: "100%",
            border: "none",
            fontSize: "16px",
            outline: "none",
            resize: "none",
            minHeight: "200px",
          }}
        />
      </Frame>
    </Frame>
  );
};

export default WritePost;
