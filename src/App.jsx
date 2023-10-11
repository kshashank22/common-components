import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [filterNum, setFilterNum] = useState(null);
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        filterNum={filterNum}
        onFilterTextChange={setFilterText}
        onFilterPriceChange={setFilterNum}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        filterNum={filterNum}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly, filterNum }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 ||
      product.price.indexOf(filterNum) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  filterNum,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
  onFilterPriceChange,
}) {
  return (
    <form>
      <label>
        Name
        <br />
        <input
          type="text"
          value={filterText}
          placeholder="Search by name..."
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price
        <br />
        <input
          type="text"
          value={filterNum}
          placeholder="Search by price..."
          onChange={(e) => onFilterPriceChange(e.target.value)}
        />
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

const List = [
  { category: "Fruits", price: "25", stocked: true, name: "Apple" },
  { category: "Fruits", price: "50", stocked: false, name: "Dragonfruit" },
  { category: "Flowers", price: "30", stocked: false, name: "Rose" },
  { category: "Flowers", price: "20", stocked: true, name: "Sunflower" },
  { category: "Vegetables", price: "30", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "35", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable products={List} />;
}
