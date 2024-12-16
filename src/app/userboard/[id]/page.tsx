import UserBoardDetailContainer from "@/containers/userboard/[id]";

interface UserBoardDetailPageProps {
  params: {
    id: string;
  };
}

const UserBoardDetailPage = ({ params }: UserBoardDetailPageProps) => {
  return <UserBoardDetailContainer id={Number(params.id)} />;
};

export default UserBoardDetailPage;
