import Header from "./Header"
import Footer from "./Footer"

export function homepage(){
    return(
        <div>
            <Header/>
            <main>
      <nav class = "navigation">
        <ul class="navlist">
          <li><a href="index.html">Login</a></li>
          <li><a href="survey.html"> Daily Survey! </a></li>
          <li><a href="homepage.html">Homepage</a></li>
          <li><a href="stats.html">View your Stats</a></li>
        </ul>
      </nav>
      <div class="about">
        <h2>About</h2>
        <div>
            <p>The happiness tracker is a website that you can use to start tracking your happiness and using thr information
                from that to improve your day to life and live life in a more happy and fulfilling way.  
            </p>
        </div>
        <h3>How do I start?</h3>
        <div>
            <p>Start by <a href="index.html">creating an account</a>. Once your account is created take your first 
            <a href="survey.html"> survey</a>. It will give you many options for things you have done today and gives the 
            option for you to add your own activities too. After doing this a couple times youll be able to view your
            <a href="stats.html"> statistics</a>. The statistics will pull from the data that is given through the daily survey
            and using this data it will give you statistics such as which activites make you happier, which make you more sad, addNew
            your average happiness.</p>
        </div>
      </div>
    </main>
            <Footer/>
        </div>
    )
}

export default homepage;