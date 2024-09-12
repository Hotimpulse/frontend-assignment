import { Button, FormSelect } from "react-bootstrap";
import filterStyles from "./filter.module.scss";
import { useState } from "react";
import { OrderStatus } from "@src/interfaces/IOrder";

interface IFilter {
  onFilterChange: (status: number | "") => void;
  onSortChange: (sortOrder: string) => void;
}

export default function Filter({ onFilterChange, onSortChange }: IFilter) {
  const [statusFilter, setStatusFilter] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = Number(e.target.value);
    setStatusFilter(newStatus);
    onFilterChange(newStatus);
  };

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    onSortChange(newSortOrder);
  };

  return (
    <div className={filterStyles.filters}>
      <Button onClick={handleSortToggle}>
        Сортировка по сумме заказа {sortOrder === "asc" ? "⬇" : "⬆"}
      </Button>
      <FormSelect
        value={statusFilter}
        onChange={handleStatusChange}
        defaultValue={statusFilter}
      >
        <option value="">Статусы</option>
        {Object.entries(OrderStatus).map(([status, value]) => (
          <option key={value} value={value}>
            {status}
          </option>
        ))}
      </FormSelect>
    </div>
  );
}
