import React from 'react';
import FirstCom from './FirstCom'
import SecondCom from './SecondCom'
import About from '../search_page/About'

const HomePage = ({setSearchPlace}) => {
  return (
    <div className="App-page">
      <FirstCom setSearchPlace={setSearchPlace}/>
      <SecondCom/>
      <About/>
    </div>
  )
}

export default HomePage;