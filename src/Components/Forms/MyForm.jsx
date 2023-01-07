import React from 'react'
import { useState } from 'react'
import db from '../../DataBase/db.json'
import {collection, getFirestore, addDoc, } from 'firebase/firestore'
import Encuesta from './Encuesta'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


    const MyForm = (props) => {
        // en este estado se guardan los datos ingresados al formulario
        const [formData, setFormData] = useState({})

        //esta funcion maneja el evento para cuando se cambie el valor de un campo
        const handleInputChange = e => {
        e.preventDefault()
        const { name, value } = e.target
        setFormData({...formData, [name]:value})
        console.log(setFormData)
        }

        const mostrarAlerta = (e) => {
            Swal.fire({
                title: 'Formulario enviado con éxito!',
                text: 'Dirígete a ver mis respuestas.',
                icon: 'success',
                confirmButtonText: 'Continuar'
            })
        }

        // esta funcion maneja el evento cuando se envia el formulario
        const handleSubmit = e => {
        e.preventDefault()
        const db = getFirestore()
        const orderCollection = collection(db, 'respuestas')
        const respuestas = addDoc(orderCollection, formData)
        // //  cuando se envia el formulario se imprime los datos ingresados en el formulario, los datos estan en el estado formdata, que son modificados y guardados en setformdata
        console.log(formData)
        setFormData({...formData})
        };

        

    return (
            <div className='bg-pink-300'>
            <Encuesta/>
            <div className="flex justify-center  p-10">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-stone-800 shadow-md rounded-lg px-8 py-6 font-light" >
            <h1 className='text-pink-300  text-lg font-light mb-2'>Para continuar, por favor completa este formulario.</h1>
                {db.items.map((item) => {
                if (item.type === 'submit') {
                    return (
                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        onClick={mostrarAlerta}
                        className="w-full bg-fuchsia-900 hover:bg-fuchsia-400 m-4 text-white font-light p-4 rounded-full focus:outline-none focus:shadow-outline-blue">{item.label}
                        </button>
                    );}
                return item.type === 'text' || item.type === 'email' || item.type === 'date' ? (
                    <div key={item.name} className="mb-4" >
                    <label htmlFor={item.name} className="block text-pink-300 text-lg font-light mb-2" >{item.label}</label>
                    <input
                        type={item.type}
                        name={item.name}
                        required={item.required}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    </div>
                ) : item.type === 'select' ? (
                    <div key={item.name} className="mb-4" >
                    <label htmlFor={item.name} className="block text-pink-300  text-lg font-light mb-2" >{item.label}</label>
                    <select
                        name={item.name}
                        required={item.required}
                        onChange={handleInputChange}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        {item.options.map((option) => (
                        <option key={option.value} value={option.value} className="font-light" >
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                    </div>
                ) : item.type === 'checkbox' ? (
                    <div key={item.name} className="mb-4 flex items-center" >
    <input
        type="checkbox"
        name={item.name}
        required={item.required}
        onChange={handleInputChange}
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
    />
    <label htmlFor={item.name} className="ml-2 block text-pink-300  text-lg font-light" >{item.label}</label>
    </div>
    ):null
    })}
            <Link to={`/respuestas`}>
                <button className="w-full bg-fuchsia-900 hover:bg-fuchsia-400 text-white font-light p-4 rounded-full focus:outline-none focus:shadow-outline-blue" >
                Ver mis respuestas
                </button>
            </Link></form>
    </div>
    </div>)
    }

export default MyForm



