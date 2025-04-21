import { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
    const [product, setProduct] = useState({ name: '', sku: '', price: '', quantity: '', supplier: '', reorderLevel: '', comments: '' });

    // Update form inputs on change
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Submit form data to backend API
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/products/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        onAddProduct(data); // Pass data to parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
            <input type="text" name="sku" placeholder="SKU" onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
            <input type="text" name="supplier" placeholder="Supplier" onChange={handleChange} required />
            <input type="number" name="reorderLevel" placeholder="Reorder Level" onChange={handleChange} required />
            <textarea name="comments" placeholder="Comments" onChange={handleChange}></textarea>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
