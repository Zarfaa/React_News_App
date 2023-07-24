import React from "react"
import  NewsItem  from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"
import { useState } from "react"
import { useEffect } from "react"

const News = (props) => {
    const [articles, setarticles] = useState([])
    const [totalResults, settotalResults] = useState(0)
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const UpdateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedata = await data.json()
        setarticles(parsedata.articles)
        setloading(true)
        settotalResults(parsedata.totalResults)
        props.setProgress(100)
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`
        UpdateNews()

    },[])

    const fetchMoreData = async () => {
        setpage(page + 1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedata = await data.json()
        setarticles(articles.concat(parsedata.articles))
        settotalResults(parsedata.totalResults)
    }
   
        return (
            <>
                <h1 className="text-center">Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row" >
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
    News.defaultProps = {
        country: "sa",
        pageSize: 10,
        category: "general"
    }

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }
export default News

