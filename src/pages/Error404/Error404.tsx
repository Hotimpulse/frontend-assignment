import { useNavigate } from "react-router-dom";
import error from "./error.module.scss";
import { Button } from "react-bootstrap";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className={error["error-wrapper"]}>
      <div className={error.container}>
        <h1 className={error.heading}>Такой страницы нет 😒</h1>
        <Button
          onClick={() => navigate("/")}
          children={"На главную"}
          type={"button"}
          disabled={false}
          aria-label={"Кнопка перехода на главную страницу"}
        />
      </div>
    </div>
  );
}
