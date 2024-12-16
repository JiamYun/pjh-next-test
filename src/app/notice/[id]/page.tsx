import NoticeDetailContainer from "@/containers/notice/[id]";

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

const NoticeDetailPage = ({ params }: NoticeDetailPageProps) => {
  return <NoticeDetailContainer id={Number(params.id)} />;
};

export default NoticeDetailPage;
