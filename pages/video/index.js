import Video from '../../components/Video';
import ResponsiveAppBar from '../../components/Topbar/ResponsiveAppBar';


const VideoPage = (props) => (
    <>
        <ResponsiveAppBar {...props} />
        <Video />
    </>
);

export default VideoPage;