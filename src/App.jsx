import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { motion } from 'motion/react';
function App() {
  const [advice,setAdvice]=useState("")
  const [question,setQuestion]=useState("")
  const [loading,setLoading]=useState(false)

  const getAdvice=async ()=>{
    if(!question.trim()) return;
    setLoading(true)
    setAdvice('')

    try{
      const res=await fetch("http://localhost:5000/api/advicegen",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({question},)
      });

      const data=await res.json();
      console.log(data)
      setAdvice(data.oneLine)
    }catch(e){
      setAdvice("Your question caused the AI to require therapy.Try again later.");
    }
    setLoading(false);
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 flex flex-col items-center px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
      {/* Header Section */}
      <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-10 lg:mb-16 px-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <img 
            // src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
            src="../1.png"
            alt="Blabasaur Logo" 
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transform hover:scale-105 transition-transform duration-300"
          />
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-serif tracking-wide text-center sm:text-left'>
            Blabasaur
          </h1>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] max-w-4xl mx-auto backdrop-blur-sm bg-black/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-purple-500/20 flex flex-col items-center mt-auto mb-auto">
        <h2 className='pb-4 sm:pb-6 lg:pb-8 text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-center leading-relaxed w-full'>
          Helping Big Dawgs with Fruitful Advices
        </h2>

        <div className="relative group w-full">
          <textarea 
            rows={3} 
            className="w-full p-3 sm:p-4 lg:p-5 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg text-sm sm:text-base"
            placeholder="Don't be shy mf. Feel free to ask it out dawg !"
            value={question}
            onChange={(e)=>{
              setQuestion(e.target.value)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10"></div>
        </div>

        <motion.button
          whileTap={{
            rotate: 5,
            scale: 1.05
          }}
          onClick={getAdvice}
          className="group relative mt-4 sm:mt-6 w-full px-8 sm:px-10 lg:px-14 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-purple-500/25"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating chaos....
            </span>
          ) : (
            "Ask me out daddy"
          )}
          <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent w-3/4 mx-auto"></span>
          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-white to-transparent h-[4px] w-full mx-auto blur-sm"></span>
        </motion.button>

        {advice && (
          <div className="mt-6 sm:mt-8 w-full bg-white/10 backdrop-blur-sm text-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg border border-purple-500/20 transform transition-all duration-300 hover:scale-[1.02]">
            <p className="text-sm sm:text-base leading-relaxed">{advice}</p>
          </div>
        )}

        <footer className='mt-8 sm:mt-10 lg:mt-12 text-xs sm:text-sm lg:text-base text-center text-gray-300 w-full'>
          With Love from <a href="https://twitter.com/offsidedebugger" className='text-purple-400 hover:text-pink-400 transition-colors duration-300 font-medium'>@offsidedebugger</a>
        </footer>
      </div>
    </div>
    </>
  )
}

export default App
