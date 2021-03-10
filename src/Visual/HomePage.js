import React from 'react';
import FirstCom from './FirstCom'
import SecondCom from './SecondCom'
// import ThirdCom from './ThirdCom'
import About from '../search_page/About'

const HomePage = ({setSearchPlace}) => {
  return (
    <div className="App-page">
      <FirstCom setSearchPlace={setSearchPlace}/>
      <SecondCom/>
      {/* <ThirdCom/> */}
      <About/>
    </div>
  )
}

export default HomePage;