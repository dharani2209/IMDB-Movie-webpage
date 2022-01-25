/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [products, setProduct] = useState([]);
    const history = useHistory();

    useEffect(() => {
        refreshToken();
        getUsers();
        getProducts();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }
    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/getmovie');
        setProduct(response.data);
    }
    
    const addtowishlist = async (id) => {
        console.log(name,id)
        await axios.put(`http://localhost:5000/like`,{
            name:name,
            movieid:id
        });
        // getProducts();
    }
    const Watchlist = async () => {
        console.log(name);
        const response = await axios.get('http://localhost:5000/getwatchlist?name='+name);
        setProduct(response.data);
    }

    return (
        <div className='dashboard'>
         <div className="container mt-5">
            <h1>Welcome Back: {name}</h1>
            <button onClick={Watchlist} id="btnwish" className="button is-light">
                                    My Watchlist
                                </button>
                                
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
                                <button id= "wishlist" onClick={ () => addtowishlist(product.id) } id="btn1"className="button is-small is-danger" title="Add to wishlist">Add to wishlist</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
        </div>
    
    )
}

export default Dashboard
