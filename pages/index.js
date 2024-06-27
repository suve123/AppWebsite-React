import Home from '../components/Home';
import ResponsiveAppBar from '../components/Topbar/ResponsiveAppBar';


const IndexPage = (props) => (
    <>
      <ResponsiveAppBar {...props} />
      <Home />
    </>
  );

export default IndexPage;
