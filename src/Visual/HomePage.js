import React from 'react';
import FirstCom from './FirstCom'
import SecondCom from './SecondCom'
import ThirdCom from './ThirdCom'

const HomePage = ({setSearchPlace}) => {
  return (
    <div className="App-page">
      <FirstCom setSearchPlace={setSearchPlace}/>
      <SecondCom/>
      <ThirdCom/>
    </div>
  )
}

export default HomePage;