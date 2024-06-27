import Product from '../../components/Product';
import ResponsiveAppBar from '../../components/Topbar/ResponsiveAppBar';

const ProductsPage = (props) => (
    <>
        <ResponsiveAppBar {...props} />
        <Product />
    </>
);

export default ProductsPage;
