import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import searchStyles from "./searchPanel.module.scss";

interface SearchPanelProps {
  setSearchQuery: (query: string) => void;
}

export default function SearchPanel({ setSearchQuery }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
    setSearchTerm("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={searchStyles.wrapper}>
        <Form.Control
          type="text"
          placeholder="Поиск объявлений"
          className={searchStyles.form}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Найти</Button>
      </div>
    </Form>
  );
}
