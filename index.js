function App() {

    const [quotes, setQuotes] = React.useState([])
    const [randomQuote, setRandomQuote] = React.useState({})
    const [color, setColor] = React.useState('#16a085')

    React.useEffect(() => {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(res => res.json())
            .then(data => {
                setQuotes(data.quotes)
                let randomIndex = Math.floor(Math.random() * data.quotes.length)
                let quoteData = data.quotes[randomIndex]
                setRandomQuote({
                    quote: quoteData.quote,
                    author: quoteData.author
                })
        })
    }, [])

    function getRandomQuote() {
        const colors = [
            '#16a085',
            '#27ae60',
            '#2c3e50',
            '#f39c12',
            '#e74c3c',
            '#9b59b6',
            '#FB6964',
            '#342224',
            '#472E32',
            '#BDBB99',
            '#77B1A9',
            '#73A857'
          ];
        const randomIndex = Math.floor(Math.random() * quotes.length)
        const randomColorIndex = Math.floor(Math.random() * colors.length)
        setRandomQuote(quotes[randomIndex])
        setColor(colors[randomColorIndex])
    }
    return(
        <div className="container text-center" style={{backgroundColor: color}}>
            <div class="card" id="quote-box" style={{color: color}}>
                <div class="card-body">
                    <h5 class="card-title">
                        <h3 id="text">
                            <i className="fa-sharp fa-solid fa-quote-left"></i> {randomQuote.quote}
                        </h3>
                    </h5>
                    <p class="card-text" id="author"> - {randomQuote.author}</p>
                    <div className="btn-container">
                        <a href={encodeURI(`https://twitter.com/intent/tweet?text=
                            "${randomQuote.quote}" - ${randomQuote.author}`)} target="_blank" id="tweet-quote">
                            <i className="fa-brands fa-square-twitter" style={{color: color}}></i>
                        </a>
                        <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                            encodeURIComponent(randomQuote.author) + '&content=' +
                            encodeURIComponent(randomQuote.quote) +
                            "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}
                            target="_blank">
                            <i className="fa-brands fa-square-tumblr" style={{color: color}}></i>
                        </a>
                    <button id="new-quote" onClick={getRandomQuote} style={{backgroundColor: color}}>New Quote</button>
                    </div>
                </div>
           </div>                
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))