"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Form(props: any) {
    const [user, setUser] = useState({
        name: props.name || '', email: props.email || '',
        phone: '', city: ''
    }) 
    const [ cityNameMissing, setCityNameMissing ] = useState(false); 
    const [ weatherFetchingError, setWeatherFetchingError ] = useState(false); 
    const [ temperature, setTemperature ] = useState(false); 

    useEffect(() => {
        axios.post('/api/user', { email: props.email })
            .then((res) => {
                const { name, email, phone, city } = res.data.user;
                setUser({
                    ...user,
                    name, email, phone, city
                }) 

                if(city) { 
                    getWeatherData(city); 
                }
            })
            .catch((error) => console.log({ error: error.message }))
    }, []) 

    function getWeatherData(city: string) { 
        const URL = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}` 
        
        axios(URL) 
            .then((res) => { 
                setWeatherFetchingError(false); 

                let { temperature } = res.data.data.values; 
                setTemperature(temperature); 
            }) 
            .catch((error) => { 
                setWeatherFetchingError(true); 
                setTemperature(false); 
            }) 
    } 

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault(); 

        if (user.city) { 
            setCityNameMissing(false); 
            getWeatherData(user.city); 
        } 
        else { 
            setCityNameMissing(true); 
        } 

        axios.patch('/api/user', { user })
            .then((res) => { })
            .catch((error) => console.log({ error: error.message }))
    } 

    return (
        <div className='p-8 border-2 border-slate-700 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <div className='flex'>
                    <label htmlFor="name" className="mr-2 font-bold text-lg w-[70px] text-right">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border-2 border-slate-400 pl-3 h-[35px] rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={user.name}
                        onChange={(event) => setUser({
                            ...user,
                            name: event.target.value
                        })}
                    />
                </div>
                <div className='my-2 flex'>
                    <label htmlFor="email" className="mr-2 font-bold text-lg w-[70px] text-right">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        disabled
                        className="border-2 border-slate-400 pl-3 h-[35px] rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={user.email}
                    />
                </div>
                <div className='my-2 flex'>
                    <label htmlFor="phone" className="mr-2 font-bold text-lg w-[70px] text-right">
                        Phone:
                    </label>
                    <input
                        type="text"
                        id="phone"
                        className="border-2 border-slate-400 pl-3 h-[35px] rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={user.phone}
                        onChange={(event) => setUser({
                            ...user,
                            phone: event.target.value
                        })}
                    />
                </div>
                <div className='my-2 flex'>
                    <label htmlFor="city" className="mr-2 font-bold text-lg w-[70px] text-right">
                        City:
                    </label>
                    <div>
                        <input
                            type="text"
                            id="city"
                            className="border-2 border-slate-400 pl-3 h-[35px] rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={user.city}
                            onChange={(event) => setUser({
                                ...user,
                                city: event.target.value
                            })}
                        /> <br /> 
                        <p className='text-red-500 text-sm'>
                            {cityNameMissing && 'Please enter a city'}
                        </p>
                    </div>
                </div> 

                {
                    temperature && 
                    <p
                        className='my-6 bg-violet-300 font-bold text-center px-4 py-3 w-full rounded-md' 
                    > 
                        Current Temperature: {temperature} Deg
                    </p> 
                } 

                { 
                    weatherFetchingError && 
                    <p
                        className='my-6 bg-red-300 text-red-800 font-bold text-center px-4 py-3 w-full rounded-md' 
                    > 
                        Error: Too many request. <br /> 25 request per hour
                    </p>
                }

                <button
                    type='submit'
                    className='mt-6 bg-slate-800 text-white rounded-2 py-1 px-3 rounded-sm'
                >
                    Submit
                </button> 
            </form>
        </div>
    )
}

export default Form; 