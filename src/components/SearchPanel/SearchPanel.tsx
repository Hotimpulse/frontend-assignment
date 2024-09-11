import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormEvent, useState } from "react";

interface SearchPanelProps {
  setSearchQuery: (query: string) => void;
}

export default function SearchPanel({ setSearchQuery }: SearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xl="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Найти</Button>
        </Col>
      </Row>
    </Form>
  );
}
