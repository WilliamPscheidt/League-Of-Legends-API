import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Lottie from 'react-lottie-player'
import lottieJson from '../public/52871-teemo-motion.json'

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nickname, setNickname] = useState()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [region, setRegion] = useState("BR1")
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false)

  const DefineSearch = (event) => {
    setNickname(event.target.value)
  }

  const DefineRegion = (event) => {
    setRegion(event.target.value)
  }

  return (
    <>
    <Head>
      <title>PageSearch::Dev_Run_William</title>
    </Head>
    <div className='container'>
      <div>
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 300, height: 300 }}
        />
      </div>
      {loading
        ?
        <h1 className='loading_text'>Carregando Dados..</h1>
        :
        <div className='search_container'>
          <input type="text" name="nickname" onChange={DefineSearch} className="search_input" placeholder='Type your nickname' />
          <select onChange={DefineRegion} value={region} className="search_options">
            <option value="BR1">BR1</option>
            <option value="EUN1">EUN1</option>
            <option value="EUW1">EUW1</option>
            <option value="JP1">JP1</option>
            <option value="KR">KR</option>
            <option value="LA1">LA1</option>
            <option value="LA2">LA2</option>
            <option value="NA1">NA1</option>
            <option value="OC1">OC1</option>
            <option value="TR1">TR1</option>
            <option value="RU">RU</option>
          </select>
          <Link href={"/search/" + region + "/" + nickname}>
            <button src="/icons/search-svgrepo-com.svg" onClick={() => setLoading(true)} width={25} height={25} className="search_button"> Search </button>
          </Link>
        </div>
      }
    </div>
    </>
  )
}

export default index