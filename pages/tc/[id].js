import { useRouter } from 'next/router';
import VideoLanding from '../../components/VideoLanding';

const VideoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <VideoLanding id={id} />;
};

export default VideoPage;
