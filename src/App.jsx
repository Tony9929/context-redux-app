import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "./productSlice";

function App() {
  const { isLoggedIn, userName, role, login, logout } = useContext(AuthContext);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [productName, setProductName] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h2>Login</h2>

        <input
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <button
          className="admin"
          disabled={!username.trim()}
          onClick={() => login(username, "admin")}
        >
          Login as Admin
        </button>

        <button
          disabled={!username.trim()}
          onClick={() => login(username, "user")}
        >
          Login as User
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>
        Welcome {userName} ({role})
      </h3>

      <button className="logout" onClick={logout}>
        Logout
      </button>

      {role === "admin" && (
        <>
          <input
            placeholder="Enter product name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />

          <button
            className="admin"
            disabled={!productName.trim()}
            onClick={() => {
              dispatch(addProduct({ id: Date.now(), name: productName }));
              setProductName("");
            }}
          >
            Add Product
          </button>
        </>
      )}

      <div>
        {products.length === 0 && (
          <p style={{ color: "#64748b" }}>No products added yet</p>
        )}

        {products.map(p => (
          <div className="product" key={p.id}>
            <span>{p.name}</span>
            {role === "admin" && (
              <button onClick={() => dispatch(removeProduct(p.id))}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
