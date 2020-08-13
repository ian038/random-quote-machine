import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardActions, Button, Typography, makeStyles, Grid, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const useStyles = makeStyles({
    author: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    actions: {
        marginTop: 5,
        display: "flex",
        justifyContent: "flex-end"
    }
})

const LIST_OF_QUOES_URL = 'http://api.quotable.io/quotes'

export default function QuotesCard() {
    const classes = useStyles()
    const [randQuote, setRandQuote] = useState({
        quote: 'TOday is victory over yourself of yesterday, today is your victory over lesser men.',
        author: 'Miyamoto Musashi'
    })
    const [allQuotesInfo, setAllQuotesInfo] = useState([])

    useEffect(() => {
        const getQuotes = async() => {
            await axios.get(LIST_OF_QUOES_URL).then(res => {
                setAllQuotesInfo(res.data.results)
            })
        } 
        getQuotes()
    }, [])
    
    const newQuote = e => {
        e.preventDefault()
        // Get random quote from array
        const randNum = Math.floor(Math.random() * allQuotesInfo.length)
        // Set as curren random quote value
        setRandQuote({ quote: allQuotesInfo[randNum].content, author: allQuotesInfo[randNum].author })
    }

    return (
        <Grid   
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: '80vh' }}>
            <Card variant="outlined">
                <CardContent>
                    <div>
                        <Typography id="text" variant="h6">
                            "{randQuote.quote}"
                        </Typography>
                        <div>
                            <Typography id="author" className={classes.author} variant="body1">
                                - {randQuote.author}
                            </Typography>
                        </div>
                    </div>
                    <CardActions className={classes.actions}>
                        <IconButton href={`https://twitter.com/intent/tweet?text=${randQuote.quote}`} id="tweet-quote">
                            <FontAwesomeIcon icon={faTwitter} /> 
                        </IconButton>
                        <Button 
                        variant="outlined" 
                        color="primary" 
                        id="new-quote" size="small" 
                        onClick={newQuote}
                        className={classes.actions}
                        >
                            New Quote
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid>
    )
}
