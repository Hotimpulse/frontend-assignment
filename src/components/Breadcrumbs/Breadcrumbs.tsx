import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";

export interface IBreadCrumbs {
  page: string;
}

function Breadcrumbs({ page }: IBreadCrumbs) {
  const navigate = useNavigate();

  function handleClick(): void {
    navigate("/");
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item onClick={handleClick}>Объявления</Breadcrumb.Item>
      <Breadcrumb.Item active>{page}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
