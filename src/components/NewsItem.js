import React,{Component} from "react"

export class NewsItem extends Component{
    render(){
        let {title, description , imageUrl , newsUrl,author,date,source} = this.props
        return( <div>
            <div className="card">
  <img src={!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/CD02/production/_128828425_gettyimages-1242312962.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5><span className="badge rounded-pill bg-success">{source}</span>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} className="btn btn-dark">Load More</a>
  </div>
</div>
        </div>
        )
    }
}