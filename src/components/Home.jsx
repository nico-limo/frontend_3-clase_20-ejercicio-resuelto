import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { API_POKEMONS } from '../utils/apis';
import "../styles/Home.css"

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(API_POKEMONS)
        setPokemons(result.data.results)
      } 
      catch (error) {setErrorMessage(error.message)}
      finally {setLoading(false)}
    };
    fetchData();
    return () => {
      setPokemons([]);
      setLoading(true);
      setErrorMessage("");
    }
  }, [])


  if(errorMessage) return <p>{errorMessage}</p>
  return (
    <div className="container">
      <h1>Bienvenido a <span className="dh">Digital</span><span className="pk">Poke</span><span className="dh">House</span> </h1>
      <div>
        <h4>Elige un pokemon para ver sus datos</h4>
        {loading ? <p>Loading Data...</p> :
          <div className="list">
            {pokemons.map((pokemon, index) => (
              <Link key={index} to={`/pokemon/${index + 1}`} >{pokemon.name}</Link>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Home


