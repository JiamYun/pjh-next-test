"use client";

import { UserBoardEditContainer } from "@/containers/userboard/edit";

interface UserBoardEditPageProps {
  params: {
    id: string;
  };
}

const UserBoardEditPage = ({ params }: UserBoardEditPageProps) => {
  return <UserBoardEditContainer id={Number(params.id)} />;
};

export default UserBoardEditPage;
