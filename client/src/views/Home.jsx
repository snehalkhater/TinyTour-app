import Navbar from "./../components/Navbar"
import ImgHero from "./../assets/home-hero.png"

function Home() {
  return (
    <div>
      <Navbar />

      <img 
        src={ImgHero} 
        alt="home hero image"  
        className="w-100 block mx-auto"
      />

      <h1 className="text-center text-4xl playpen-sans">Tiny Tours</h1>
      <p className="text-center playpen-sans">Travel the world, discover new places, and collect beautiful memories along the Tiny Tours.</p>
    </div>
  )
}

export default Home