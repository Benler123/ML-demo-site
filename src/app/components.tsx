import React from 'react'
import ColourfulText from '@/components/ui/colourful-text'

export function Landing() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">      
      <h1 className="text-4xl">Welcome to the <span className='text-primary'>Georgia Tech </span>            
      </h1>
      <div className=" text-4xl">
        <ColourfulText text="Machine Learning "/>      
        Projects Page!
      </div>          
      <div className="text-md mt-4">
        <p>Checkout the past projects from the students of the Machine Learning course</p> 
      </div>          
    </div>    
  )
}


