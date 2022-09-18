import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card';
import axios from './axios';
import './TinderCards.css'

function TinderCards() {
    const [people, setPeople] = useState([]);

    //its the same as componentDidMount
    useEffect(() => {
        //common pattern for async await functions
        async function fetchData() {
            //our baseurl is already set in axios.js
            let req = await axios.get('/tinder/cards')
            console.log(req)
            setPeople(req.data)
        }
        fetchData()
    }, [])

	const swiped = (direction, nameToDelete) => {
		console.log('removing: ' + nameToDelete);
	};

	const outOfFrame = name => {
		console.log('removing: ' + name);
    };

    return (
        <div className="tinderCard">
            <div className="tinderCard__cardContainer">
                {people.map(person => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, person.name)}
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div style={{ backgroundImage: `url(${person.imgUrl})` }} className="card">
							<h3>{person.name}</h3>
						</div>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards;
