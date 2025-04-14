

export function Header(){

    return(  
       <header className="w-full relative flex ">
       <h1 className="w-1/3 bg-amber-200" >awee</h1>
         <nav className="w-2/3 flex justify-end">
              <ul className="flex gap-10 text-white font-bold text-lg">
                <li>Home</li>
                <li>About</li>
                <li>Rooms</li>
                <li>Contact</li>
            
              </ul>
            </nav>
       </header>
    )
}