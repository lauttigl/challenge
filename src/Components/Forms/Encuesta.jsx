import { addDoc, getFirestore , collection,} from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { preguntas } from '../../DataBase/preguntas'
import Swal from 'sweetalert2'




const Encuesta = () => { 
  const [seleccionados, setSeleccionados] = useState([])



  //esta funcion maneja el evento para cuando se cambie el valor de un campo 
const handleInputChange = e => {
  const {  value,name } = e.target
  setSeleccionados([...seleccionados, {respuesta:value, question:name}])
}

// esta funcion maneja el evento cuando se envia el formulario a firebase
const handleSubmit = e => {
  e.preventDefault()
  const db = getFirestore()
  const orderCollection = collection(db, 'futbol')
  seleccionados.forEach(seleccionado => {
    addDoc(orderCollection, seleccionado)
  });
  console.log(seleccionados)
  setSeleccionados([])
}

const mostrarAlerta = (e) => {
  Swal.fire({
      title: 'Encuesta enviada con éxito!',
      text: 'Gracias por participar, por favor, continúa con el formulario.',
      icon: 'success',
      confirmButtonText: 'Continuar'
  })
}

return (
  <div className='bg-pink-300'>
  <div className="flex justify-center">
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-stone-800 shadow-md rounded-lg px-8 py-6 font-light m-10 " >
      {preguntas.map((pregunta, i) => (
        <div key={pregunta.pregunta} className="mb-4" >
          <p className="text-pink-300 text-xl font-light mb-2" >{pregunta.pregunta}</p>
          {pregunta.respuestas.map(respuesta => (
            <label key={respuesta.valor} className="inline-flex items-center" >
              <input
                type="radio"
                name={pregunta.pregunta}
                value={respuesta.valor}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="p-4 text-pink-300 " >{respuesta.opcion}</span>
            </label>
          ))}
        </div>
      ))}
      <button
        onChange={handleSubmit}
        onClick={mostrarAlerta}
        type="submit"
        className="w-full bg-fuchsia-900 hover:bg-fuchsia-400 text-white font-light p-4 m-4 rounded-full focus:outline-none focus:shadow-outline-blue "
      >
        Enviar respuestas de la encuesta
      </button>
    </form>
  </div>
  </div>
)}  
export default Encuesta