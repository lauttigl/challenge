import React from 'react'
import { getFirestore , collection, getDocs, getDoc} from 'firebase/firestore'
import { useState,  } from 'react'
import Swal from 'sweetalert2'


const Respuestas = () => {

    const [answers, setAnswers] = useState([])
    const [forms, setForm] = useState([])



    
    const showResponse = async () => { 
        const dataBase = getFirestore()
        const collectionRef = collection(dataBase, 'futbol',)
        const snapshot = await getDocs(collectionRef)
        //para mostrar el contenido dentro de cada documento de la coleccion use el mapeo en el documento y para mostrarlo use d.data()
        setAnswers(snapshot.docs.map(d => d.data()))
        }
    
        const showForm = async() =>{
            const dataBase= getFirestore()
            const collectionForm = collection(dataBase, 'respuestas')
            const snapshot= await getDocs(collectionForm)
            setForm(snapshot.docs.map(d => d.data()))
        }

        const showAll = () => { 
            showForm()
            showResponse()
        }

    //si quisiera mostrar los datos al inciar el componente, tendria que activar el useffect, como quiero mostrarlos nada mas cuando toco el boton, lo dejo desactivado
    // useEffect(() => {
    //     showResponse()
    //   }, [])

    const mostrarAlert = () => {
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Respuestas cargadas.'
      })}
        

    return (
    <div className="bg-pink-300" >
        <div className="flex justify-center p-10 text-pink-300 " >
            <div className="w-full max-w-lg  shadow-md rounded-lg px-8 py-6 font-light bg-stone-800 " >
                <div className="flex justify-center bg-stone-800" >
                    <button onClick={() => {showAll()
                        mostrarAlert()}}  className="btn bg-fuchsia-900 hover:bg-fuchsia-400 text-white font-light py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-pink " >  Ver mis respuestas </button>
                </div>
            <h2 className="font-light text-lg text-pink-300 " >Tus respuestas de la encuesta</h2>
                {answers.map((answer) => (
                    <div key={answer.id} className="mb-4" >
                        <p className="block  text-lg font-light mb-2 text-pink-300 " > {answer.question}: </p>
                        <p className='font-light text-lg text-pink-300 '>{answer.respuesta}</p>
                        </div>))}
                        <h2 className='font-light text-lg text-pink-300 '>Datos del formulario</h2>
                        {forms.map((form) => (
                            <div key={form.id}>
                            <p className='font-light text-lg text-pink-300 '> Nombre completo: {form.full_name}</p>
                            <p className='font-light text-lg text-pink-300 '>Email: {form.email}</p>
                            <p className='font-light text-lg text-pink-300 '>Fecha de nacimiento: {form.birth_date}</p>
                            </div>
                            ))}
                            </div>
                            </div>
                            </div>)}
                            
export default Respuestas