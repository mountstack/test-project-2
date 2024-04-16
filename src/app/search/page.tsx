"use client"
import React, { useState, useEffect } from 'react'; 
import Select from 'react-select'; 
import axios from 'axios'; 

function page() { 
    const [ weatherFetchingError, setWeatherFetchingError ] = useState(false); 
    const [ temperature, setTemperature ] = useState(false); 

    const [ names, setNames ] = useState([]); 
    const [ user, setUser ] = useState({ 
        name: '', email: '', 
        phone: '', city: '' 
    }); 

    useEffect(() => { 
        axios.get('/api/user') 
            .then(res => setNames(res.data.names)) 
            .catch(err => console.error(err)) 
    }, []) 

    function getWeatherData(city: string) { 
        const URL = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}` 
        
        axios(URL) 
            .then((res) => { 
                let { temperature } = res.data.data.values; 
                setWeatherFetchingError(false); 
                setTemperature(temperature); 
            }) 
            .catch((error) => { 
                setWeatherFetchingError(true); 
                setTemperature(false); 
            }) 
    } 


    function getSelectedUser(data: any) { 
        axios.post('/api/user/search', { name: data.value }) 
            .then(res => { 
                const { name, email, phone, city } = res.data.user; 
                setUser({ name, email, phone, city }); 

                if(city) { 
                    getWeatherData(city); 
                }
            }) 
            .catch(err => console.log(err)) 
    } 

    return ( 
        <div className='flex flex-col items-center'> 
            <div className='rounded-sm max-w-[500px] min-w-[400px] my-10'> 
                <Select 
                    options={names} 
                    onChange={(data) => getSelectedUser(data)} /> 
            </div> 

            { 
                user?.email && 
                <div className='p-4 rounded-sm min-w-[400px] border-2 border-slate-700/40'>
                    <h1 className='text-2xl font-bold'> 
                        User Details 
                    </h1>
                    <div className='flex flex-wrap gap-[10px] my-2'>
                        <label>
                            Name:
                        </label>
                        <p>
                            {user.name}
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-[10px] my-2'>
                        <label>
                            Email:
                        </label>
                        <p>
                            {user.email}
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-[10px] my-2'> 
                        <label>
                            Phone:
                        </label>
                        <p>
                            {user.phone || '-'} 
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-[10px] my-2'> 
                        <label>
                            City:
                        </label>
                        <p>
                            {user.city || '-'} 
                        </p>
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
                </div>
            }
        </div> 
    ) 
} 

export default page; 