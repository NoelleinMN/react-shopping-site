function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({});
  
    function addMelonToCart(melonCode) {
      setShoppingCart((currentShoppingCart) => {
        const newShoppingCart = Object.assign({}, currentShoppingCart);
  
        if (newShoppingCart[melonCode]) {
          newShoppingCart[melonCode] += 1;
        } else {
          newShoppingCart[melonCode] = 1;
        }
        return newShoppingCart;
        });
      }
    console.log(shoppingCart);

  React.useEffect(() => {
    fetch("/api/melons")
      .then((response) => response.json())
      .then((melonData) => setMelons(melonData));
  }, []);

  React.useEffect(() => {
    const initialCart = localStorage.getItem("shoppingCart");
    if (initialCart) {
      setShoppingCart(JSON.parse(initialCart));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);
  

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon">
        <ReactRouterDOM.NavLink
          to="/shop"
          activeClassName="navlink-active"
          className="nav-link"
        >
          Shop for Melons
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/cart"
          activeClassName="navlink-active"
          className="nav-link"
        >
          Shopping Cart
        </ReactRouterDOM.NavLink>
      </Navbar>

      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          <ShoppingCartPage cart={shoppingCart} melons={melons} />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
