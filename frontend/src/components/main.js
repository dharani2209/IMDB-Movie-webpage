import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

 
const ProductList = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
   
    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/getmovie');
        setProduct(response.data);
    }
 
    const addtowishlist = async (id) => {
        alert("login to wishlist")
    }


 
    return (
        <div className="totalcontainer">
        
            <Link to="/login" id="btn2" className="button is-primary mt-2">LOGIN/SIGNUP</Link>
            <div><h1>PLease Login to add movie to wishlist</h1> </div>


            <div className='tablecontainer'>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>MOVIE IMAGE</th>
                        <th>MOVIENAME</th>
                        <th>GENRE</th>
                        <th>RATING</th>
                        
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, index) => (
                        <tr key={ product.id }>
                            <td>{ index + 1 }</td>
                            <td><img src={ product.movieimage} alt='' width="150"/></td>
                            <td>{ product.moviename }</td>
                            <td>{ product.genre }</td>
                            <td>{ product.rating }</td>
                            <td>
                                <button id= "wishlist" onClick={ () => addtowishlist(product.id) } id="btn1"className="button is-small is-danger" title="Add to wishlist">Add to Wishlist</button>
                            </td>
                          
                        </tr>
                    )) }
                     
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default ProductList

