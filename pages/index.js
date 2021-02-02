import Image from 'next/image'
import { useState, useRef } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

export default function Home({ data }) {
  const mapRef = useRef(null)
  const [initialData, setData] = useState({
    ip: data.ip,
    isp: data.isp,
    location: data.location,
    latitude: data.location.lat,
    longitude: data.location.lng
  })
  const {ip, isp, location, latitude, longitude} = initialData
  const [inputIp, setIpValue] = useState(ip)
  const [viewport] = useState({
    latitude,
    longitude,
    zoom: 11,
  })
  return (
    <div className='absolute h-full w-full'>
      {/* Bg Image Container */}
      <div className="fixed w-full h-2/5 -z-1">
        <Image
          alt="background"
          src="/pattern-bg.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <h1 className="mt-6 text-2xl font-medium text-white text-center tracking-wide">IP Address Tracker</h1>
      {/* Ip Address Input */}
      <div className="flex pb-10 justify-center items-center mt-7">
        <input className="w-9/12 h-14 px-6 rounded-l-xl text-lg font-normal tracking-wide focus:outline-none" value={inputIp} readOnly />
        <span className="bg-black h-14 w-14 flex items-center justify-center rounded-r-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" /></svg>
        </span>
      </div>
      {/* Map Container */}
      <div className="absolute w-full h-screen -z-2">
        <ReactMapGL
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          {...viewport}
          width='100%'
          height='100%'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          ref={(instance) => (mapRef.current = instance)}
        >
          <Marker latitude={latitude} longitude={longitude} >
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fillRule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>
          </Marker>
        </ReactMapGL>
      </div>
      <div className="realtive z-20 w-11/12 mt-6 p-6 bg-white text-center mx-auto rounded-xl">
        <div>
          <p className="text-darkGray text-xs font-bold tracking-extra">IP ADDRESS</p>
          <p className="text-veryDarkGray text-2xl font-medium mt-2">{ip}</p>
        </div>
        <div className="mt-5">
          <p className="text-darkGray text-xs font-bold tracking-extra">LOCATION</p>
          <p className="text-veryDarkGray text-2xl font-medium mt-2">{`${location.city}, ${location.country}`}</p>
        </div>
        <div className="mt-5">
          <p className="text-darkGray text-xs font-bold tracking-extra">TIMEZONE</p>
          <p className="text-veryDarkGray text-2xl font-medium mt-2">{location.timezone}</p>
        </div>
        <div className="mt-5">
          <p className="text-darkGray text-xs font-bold tracking-extra">ISP</p>
          <p className="text-veryDarkGray text-2xl font-medium mt-2">{isp}</p>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.IP_GEOLOCATION_API_KEY}`)
  const data = await res.json()
  return {
    props: { data }
  }
}
