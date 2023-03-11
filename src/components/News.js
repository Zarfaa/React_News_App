import React, { Component } from "react"
import { NewsItem } from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
    static defaultProps = {
        country: "sa",
        pageSize: 10,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {
        super(props)
        console.log("News Constructor")
        this.state = {
            articles: [],
            loading: false,
            totalResults: 0,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyNews`
    }


    UpdateNews = async () => {
        this.props.SetProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        this.setState({ loading: true })
        let parsedata = await data.json()
        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: true
        })
        this.props.SetProgress(100)
    }
    async componentDidMount() {
        this.UpdateNews()
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedata = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults
        })
    }
    render() {
        return (
            <>
                <h1 className="text-center">Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row" >
                            {this.state.articles.map((element) => {
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
}
