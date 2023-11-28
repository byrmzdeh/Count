import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [basketUl, setBasketUl] = useState(
    localStorage.getItem('basket')
      ? JSON.parse(localStorage.getItem('basket'))
      :
      []
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketUl))
  }, [basketUl])

  useEffect(() => {
    fetch('https://mocki.io/v1/8fa1ba1b-e2d7-46b9-9435-726ea8e2bca7')
      .then(res => res.json())
      .then(api => setData(api));
  }, []);

  function AddBasket(item) {
    let elementIndex = basketUl.findIndex((x) => x.id === item.id);
    if (elementIndex !== -1) {
      const newBasket = [...basketUl];
      newBasket[elementIndex].count++;
      setBasketUl(newBasket);
    } else {
      setBasketUl([...basketUl, { ...item, count: 1 }]);
    }
  }


  function setValueCount(isAdd, item) {
    let elementIndex = basketUl.findIndex((x) => x.id === item.id);
    const newBasket = [...basketUl];

    if (elementIndex !== -1) {
      if (isAdd) {
        newBasket[elementIndex].count++;
      } else {
        if (newBasket[elementIndex].count > 1) {
          newBasket[elementIndex].count--;
        }
      }

      setBasketUl(newBasket);
    }
  }



  function RemoveBasket(id) {
    setBasketUl(basketUl.filter((x) => x.id !== id));
  }

  return (
    <div className='big'>
      <h2>Basket</h2>
      <table border={1}>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
          <th>Delete</th>


        </tr>
        {basketUl.map((item) => (
          <tr className='cart' key={item.id}>
            <td>
              <img width={110} src={item.img} alt="" />
            </td>
            <td>{item.name}</td>
            <td>$ {item.count * item.price}</td>
            <td>
              <div className='count'>
                <button className='minus' onClick={() => setValueCount(false, item)}>
                  -
                </button>
                <span>{item.count}</span>
                <button className='plus' onClick={() => setValueCount(true, item)}>
                  +
                </button>
                <br />
              </div>
            </td>
            <td>
              <button className='remove' onClick={() => RemoveBasket(item.id)}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </table>

      <h1>Wishlist</h1>
      <div className='product'>
        {data.map(item => (
          <div className='cart' key={item.id}>
            <img width={120} src={item.img} alt="" />
            <p>$ {item.price}</p>
            <p>{item.name}</p>
            <button onClick={() => { AddBasket(item); setValueCount(true, item); }}>Add Basket</button>

          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default App;
