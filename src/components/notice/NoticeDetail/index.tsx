import { Body1, Body3, Body4, Frame } from '@/atoms';
import Badge from '@/components/common/Badge';
import { NoticeType } from '@/types';
import { formatDate } from '@/utils';

interface NoticeDetailProps {
  notice: NoticeType;
}

const NoticeDetail = ({ notice }: NoticeDetailProps) => {
  // HTML 태그가 포함되어 있는지 확인
  const hasHtmlTags = /<[^>]*>/g.test(notice.content);

  // URL을 찾아서 링크로 변환하는 함수
  const convertUrlsToLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#0066cc', textDecoration: 'underline' }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // 일반 텍스트의 줄바꿈 처리
  const formatText = (text: string) => {
    return text.split(/\r\n|\n/).map((line, i) => (
      <span key={i}>
        {convertUrlsToLinks(line)}
        {i !== text.split(/\r\n|\n/).length - 1 && <br />}
      </span>
    ));
  };

  return (
    <Frame col w="100%" px={20} py={12} gap={12}>
      <Frame col w="100%">
        <Frame w="100%" col>
          <Badge categoryID={notice.category.id}>{notice.category.name}</Badge>
          <Frame row w="100%" alignment='left' gap="auto">
            <Frame row flex={1} pt={12}><Body3>관리자</Body3></Frame>
            <Body4 fontColor='#959CAA'>{formatDate(notice.createdAt)}</Body4>
          </Frame>
        </Frame>
        <Frame row w="100%" py={12}>
          <Body1>{notice.title}</Body1>
        </Frame>
      </Frame>
      <Frame>
        {hasHtmlTags ? (
          // HTML 태그가 있는 경우
          <div 
            className="notice-content"
            dangerouslySetInnerHTML={{ __html: notice.content }} 
          />
        ) : (
          // 일반 텍스트인 경우
          <Body3>
            {formatText(notice.content)}
          </Body3>
        )}
      </Frame>
    </Frame>
  );
};

export default NoticeDetail;