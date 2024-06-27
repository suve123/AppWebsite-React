import Home from '../../components/Home';
import ResponsiveAppBar from '../../components/Topbar/ResponsiveAppBar';


const HomePage = (props) => (
    <>
        <ResponsiveAppBar {...props} />
        <Home />
    </>
);

export default HomePage;
