import React, { useState, useEffect } from 'react';
import './productos.css';
import axios from 'axios';

const ProductosComponent = () => {
  const [filtro, setFiltro] = useState('');
  const [productos, setProductos] = useState({});
  const [productosVisibles, setProductosVisibles] = useState({});
  const [productosRestantes, setProductosRestantes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/datos-procesados')
      .then((response) => {
        const data = response.data;
        setProductos(data);
      })
      .catch((error) => {
        console.error('Error al obtener datos del servidor:', error);
      });
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="inputBox"
      />
      <div className="productBox">
        {Object.keys(productos).map((ean, index) => {
          const productosFiltrados = productos[ean].filter((producto) =>
            producto.nombre_producto.toLowerCase().includes(filtro.toLowerCase())
          );

          if (productosFiltrados.length > 0) {
            return (
              <div key={index}>
                {productosFiltrados.map((producto, subIndex) => (
                  <div key={subIndex}>
                    <h3>{producto.nombre_producto}</h3>
                    <p>Rango de Precios: {producto.rango_precios.join(' - ')}</p>
                    <p>Mercados Diferentes: {producto.cantidad_markets}</p>
                    <p>Valores: {producto.valores}</p>
                  </div>
                ))}
              </div>
            );
          } else {
            return null; // No renderizar si no hay productos que coincidan con el filtro
          }
        })}
      </div>
    </div>
  );
};

export default ProductosComponent;