import React, { Component } from 'react';

function Avatar(props) {
	return (
		<img className="Avatar"
  			src={props.user.profile_image_url_https}
  			alt={props.user.screen_name}
		/>
	);
}
 
function UserInfo(props){
	// console.log(props);
	return(
		<div className="tweet-user">
			<div className="user-avatar">
		        <Avatar user={props.user} />
		    </div>

			<span className="name">{props.user.name}</span>
			<span className="screenName">@{props.user.screen_name}</span>
		</div>
	);
}

function OiginalUser(props) { // this is a retweet
	return (
		<div className="show-retweet" data-userid="{props.originalUser.id}">
			<div className="fi-loop"></div>

			<div className="retweet-user-avatar">
		        <Avatar user={props.originalUser} />
			</div>
			<span>{props.originalUser.name}</span>
		</div>
	)
}

function Media(props) {
	return (
		<div className="media-contain">
	        {props.media.map(obj => {
            	<div className="media-box image{{@index}}">
					<img src="{{obj.media_url_https}}:small" />	
				</div>
	        })}
		</div>
	);
}

function QuotedStatus(props) {
	return(
		<div className="quoted-tweet" data-id="{props.id}" data-userid="{props.user.id}">
			<UserInfo user={props.retweeted_status.user} />
			<span className="tweet-date">{props.retweeted_status.relativeTime}</span>
			<span className="tweet-text">{props.retweeted_status.text}</span>
			{(props.retweeted_status.entities.media) &&
				<Media media={props.retweeted_status.entities.media} />
			}
		</div>
	);
}

class RelativeTime extends Component {
	relativeTime() {
		// console.log(this.props);
		let time = this.props.created_at;

	 	if (!time) return;

	    let day,month,year;
	    let date = new Date(time),
	        diff = ( (( new Date().getTime() ) - date.getTime()) / 1000),
	        // day_diff = ( new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime() - new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() ) / 1000 / 86400, //
	        day_diff = Math.floor(diff / 86400);
	    
	    if (isNaN(day_diff) || diff <= 0)
	        return (
	            year.toString()+'-'+
	            ((month<10) ? '0'+month.toString() : month.toString())+'-'+
	            ((day<10) ? '0'+day.toString() : day.toString())
	        );
	    
	    var r = (
	        diff > 0 &&
	        (
	            day_diff === 0 &&
	            (
	                (
	                    (diff < 60 && Math.ceil(diff) + "s") ||
	                    (diff < 3600 && Math.ceil(diff / 60)  + "m") ||
	                    (diff < 7200 && "1h") ||
	                    (diff < 86400 && Math.floor(diff / 3600) + "h")
	                )
	            ) ||
	            (day_diff === 1 && "1d") ||
	            (Math.ceil(day_diff) + "d")
	        )
	    );
	    // console.log(r);
	    return r;
	}
   	render() {
   		// console.log(this);
		return (
			<span className="tweet-date">{this.relativeTime()}</span>
		) // 
   	}
}

class TweetControls extends Component {
  	constructor(props) {
    	super(props);
    	// this.state = {showButtons: false};

    	// This binding is necessary to make `this` work in the callback
    	this.handleClick = this.handleClick.bind(this);
  	}
  	handleClick() {
    	this.setState(prevState => ({
      		isToggleOn: !prevState.isToggleOn
    	}));
  	}
	render() {
		console.log(this.props);
		return (
			<div className="tweet-controls">
				<button className="reply" onClick={this.handleClick}>
					<div className="fi-comment-quotes"></div>
				</button>
				<button className="favorite" onClick={this.handleClick}>
					<div className="fi-star"></div>
				</button>
				<button className="retweet" onClick={this.handleClick}>
					<div className="fi-loop"></div>
				</button>
				<button className="details" onClick={this.handleClick}>
					<div className="fi-magnifying-glass"></div>
				</button>
			</div>
		)
	}
}

class Tweet extends Component {
	render() {
		// console.log(this.props);
		// console.log(this.props.data);
		// console.log(this.props.data.user);
		return (
			<div className={"tweet-contain " + this.props.data.selected} id={this.props.data.id_str} userid={this.props.data.user.id_str} onClick={() => this.props.onClick()}>
				<div className="tweet-body">
				    <UserInfo user={this.props.data.user} />

					<span className="tweet-text">{this.props.data.text}</span>

					<div className="status-contain">
						<RelativeTime created_at={this.props.data.created_at} />
						<div className={"fi-star " + (this.props.data.favorited ? "active" : "")}></div>
						<div className={"fi-loop " + (this.props.data.retweeted ? "active" : "")}></div>						
					</div>

					{ this.props.data.entities.media && <Media media={this.props.data.entities.media} /> }
					{ this.props.data.retweeted_status && <QuotedStatus retweeted_status={this.props.data.retweeted_status} />}
				</div>
				<TweetControls props={this.props.data} />
			</div>
		);
	}
}

export default Tweet;