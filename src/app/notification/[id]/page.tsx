import NotificationDetail from "@/containers/notification/[id]";

interface NotificationDetailPageProps {
  params: {
    id: string;
  };
}

const NotificationDetailPage = ({ params }: NotificationDetailPageProps) => {
  return <NotificationDetail id={params.id} />;
};

export default NotificationDetailPage;
