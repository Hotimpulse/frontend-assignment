import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import { JSX } from "react/jsx-runtime";

const CardSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#484283"
    {...props}
  >
    <rect x="172" y="185" rx="0" ry="0" width="300" height="300" />
  </ContentLoader>
);

export default CardSkeleton;
