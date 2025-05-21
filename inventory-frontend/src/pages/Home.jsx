import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      fetchProducts();
      resetForm();
    } catch {
      alert('Error adding product');
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${form.id}`, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });
      fetchProducts();
      resetForm();
    } catch {
      alert('Error updating product');
    }
  };

  const editProduct = (product) => {
    setForm({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    });
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch {
        alert('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setForm({ id: '', name: '', description: '', price: '', quantity: '' });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Inventory Management</h2>

      <form onSubmit={form.id ? updateProduct : addProduct} className="row g-3 mb-5">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 d-flex justify-content-center gap-3">
          <button type="submit" className="btn btn-primary">
            {form.id ? 'Update' : 'Add'} Product
          </button>
          {form.id && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="text-center text-muted">Loading products...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center text-muted fst-italic">No products available.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((prod) => (
            <div key={prod._id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{prod.name}</h5>
                  <p className="card-text">{prod.description || 'No description'}</p>
                  <p className="card-text mb-1">
                    <strong>Price:</strong> ${prod.price}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {prod.quantity}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-success btn-sm" onClick={() => editProduct(prod)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(prod._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
