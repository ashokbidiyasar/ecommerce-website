// src/components/Meta.jsx
import { Helmet } from "@dr.pogodin/react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To ProShop",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
