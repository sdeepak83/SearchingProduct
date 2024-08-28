import React from 'react'
import { useState, useEffect } from 'react'


const SearchProduct = () => {
    const [products, setProducts] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        productData()
    }, [])

    const productData = async () => {

        try {
            const Products = await fetch("https://fakestoreapi.com/products")
                .then(res => res.json())
                .then(json => setProducts(json))
            setLoading(false)

        } catch (error) {
            console.log("error fatching product", error)
            setLoading(false);
        }

    }
    const handleSearchChange = (event) => {
        setInputVal(event.target.value)
    }
    const filterProducts = products.filter(product =>
        product.title.toLowerCase().includes(inputVal.toLowerCase()) || product.description.toLowerCase().includes(inputVal.toLowerCase())
    )


    if (loading) {
        return <p>Loading.....</p>
    }

    return (
        <>
            <div>Pr0ducts</div>
            <input type="text" placeholder='Search Product' value={inputVal}
                onChange={handleSearchChange} />
            <div className=' '>
                {filterProducts.length > 0 ? (
                    filterProducts.map(product => (
                        <li key={products.id}>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>Price:{product.price}</p>
                            <img src={product.image} alt="image" width="100" />


                        </li>
                    ))
                ) : (
                    <p>No Product Found</p>
                )
                }
            </div>
        </>
    )
}

export default SearchProduct