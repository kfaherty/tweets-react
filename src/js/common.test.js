import React from 'react';
import {Avatar,UserInfo,DropdownMenu} from './common';
import renderer from 'react-test-renderer';

const userData = {
	"id": 129175727,
	"id_str": "129175727",
	"name": "Gregorios Kythreotis",
	"screen_name": "ShedworksGreg",
	"location": "London, England",
	"description": "Cofounder + Design at Shedworks. Works with @ShedworksDan in a Shed. Architecture graduate.",
	"url": "https://t.co/ay4jDTPHV2",
	"entities": {
		"url": {
		  "urls": [
		    {
		      "url": "https://t.co/ay4jDTPHV2",
		      "expanded_url": "http://www.shed-works.co.uk",
		      "display_url": "shed-works.co.uk",
		      "indices": [
		        0,
		        23
		      ]
		    }
		  ]
		},
		"description": {
		  "urls": []
		}
	},
	"protected": false,
	"followers_count": 8623,
	"friends_count": 701,
	"listed_count": 190,
	"created_at": "Sat Apr 03 12:20:34 +0000 2010",
	"favourites_count": 18987,
	"utc_offset": 0,
	"time_zone": "London",
	"geo_enabled": true,
	"verified": false,
	"statuses_count": 8525,
	"lang": "en",
	"contributors_enabled": false,
	"is_translator": false,
	"is_translation_enabled": false,
	"profile_background_color": "C0DEED",
	"profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
	"profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
	"profile_background_tile": false,
	"profile_image_url": "http://pbs.twimg.com/profile_images/907574665543143425/8Ti_CjIB_normal.jpg",
	"profile_image_url_https": "https://pbs.twimg.com/profile_images/907574665543143425/8Ti_CjIB_normal.jpg",
	"profile_banner_url": "https://pbs.twimg.com/profile_banners/129175727/1505217608",
	"profile_link_color": "ABB8C2",
	"profile_sidebar_border_color": "C0DEED",
	"profile_sidebar_fill_color": "DDEEF6",
	"profile_text_color": "333333",
	"profile_use_background_image": true,
	"has_extended_profile": true,
	"default_profile": false,
	"default_profile_image": false,
	"following": false,
	"follow_request_sent": false,
	"notifications": false,
	"translator_type": "none"
};

test('Avatar render matches snapshot', () => {
	const component = renderer.create(
 		<Avatar user={userData} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('UserInfo render matches snapshot', () => {
	const component = renderer.create(
 		<UserInfo 
 			user={userData} 
 			onClick={(event) => console.log}  
 		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


// function VideoMedia(props) {
// 	// TODO load video's bitrate responsive to size of viewport
// 	let index = 0;
// 	const variants = props.obj.video_info.variants;
// 	const bitrate_max = 832000;
// 	// const viewport = 300;
// 	const loop = (props.obj.type === "animated_gif" ? true : false );

// 	for (var i = variants.length - 1; i >= 0; i--) {
// 		if ((variants[i].content_type === "video/mp4") && (variants[i].bitrate < bitrate_max)) {
// 			index = i;
// 		}
// 	}
// 	return (
// 		<video controls loop={loop} poster={props.obj.media_url_https + ":small"} src={variants[index].url} type={variants[index].content_type} >
// 			{ /* {obj.video_info.variants.map(source => {
// 				return (
// 		    		<source src={source.url} type={source.content_type} />
// 		    	);
// 		    } */}
// 		</video>
// 	)
// }

// function Media(props) {
// 	// TODO load image size responsive to size of viewport
// 	// const viewport = 300;
// 	// const length = props.media.length;
// 	return (
// 		<div className="media-contain">
// 	        {props.media.map(obj => {
//             	return (
//             		<div className="media-box" key={obj.id_str}>
// 						{(obj.type === "video" || obj.type === "animated_gif") && (
// 							<VideoMedia obj={obj} />
// 						)}
// 						{(obj.type === "photo") && (
// 							<img src={obj.media_url_https + ":small"} alt={obj.display_url} />	
// 						)}
// 					</div>
// 				);
// 	        })}
// 		</div>
// 	);
// }

const tweetData = 	{
	"id_str": "947972151574958081",
  	"full_text": "RT @ShedworksGreg: Spirit of the Mountain by Thomas Chamberlain https://t.co/GyqXj0uTy2",
  	user: {
	    "screen_name": "exoditedragon",
  	}
}

test('DropdownMenu tweet render matches snapshot', () => {
	const component = renderer.create(
	 	<DropdownMenu 
			visible={true}
			tweet={tweetData} 
			hideMenu={() => console.log}
		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('DropdownMenu tweet hidden render matches snapshot', () => {
	const component = renderer.create(
	 	<DropdownMenu 
			visible={false}
			tweet={tweetData} 
			hideMenu={() => console.log}
		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});


const profileData = {
	screen_name: "hannufluff"
}

test('DropdownMenu profile render matches snapshot', () => {
	const component = renderer.create(
	 	<DropdownMenu 
			visible={true}
			profile={profileData} 
			hideMenu={() => console.log}
		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('DropdownMenu profile hidden render matches snapshot', () => {
	const component = renderer.create(
	 	<DropdownMenu 
			visible={false}
			profile={profileData} 
			hideMenu={() => console.log}
		/>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});