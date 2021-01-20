import React from 'react';
import './App.css';
import {gql, useQuery} from '@apollo/client' ;
import {SaleIndicator, Circle} from './components/SaleIndicator';
import Banksy from './components/Banksy';
import { Popup} from 'semantic-ui-react'

export const query = gql`
query {
  popular_artists(size: 3) {
    artists {
      name
      	artworks {
      	  id
          title
          is_for_sale
          price
          	image {
              image_url
              
          	}
      	}
    }
  }
}
`

function App() {
  const {loading, data} = useQuery(query)
 
 if (loading) return <p>Loading Masterpieces...</p>

const pablo = data.popular_artists.artists[0].name
// eslint-disable-next-line
const banksy = data.popular_artists.artists[1].name

  return (
    <>
    <section className="App">
    <h1>lol Art Galleria 🎨</h1>

    <div id="sale-legend">
      <h5>Legend</h5>
      <Circle color="green" selected={ true}/><p>For Sale</p>
      <Circle color="red" selected={true}/><p>Not For Sale</p>
    </div>

    <div id="pablo">
    <h2>{pablo}</h2>
    
    <div class="ui raised cards">
    {data.popular_artists.artists[0].artworks.map(work => (
      <Popup
      content="Click to View Details"
      position='top center'
      trigger={
        // eslint-disable-next-line
      <a id="pablo-card" class="ui card" href={`https://www.artsy.net/artwork/${work.id}`} target="_blank">
  <div class="content">
    <div class="ui large header">{work.title}</div>
    <SaleIndicator is_for_sale={work.is_for_sale}/>
    <div class="description">{work.is_for_sale && work.price === "" ? "Contact for Price" : null}</div>
    <div class="description">{work.price}</div>
  </div>
</a>
    }/>   
    ))} 
     </div>
    </div>
    <Banksy />
     </section>
     
     
     <footer>
     <h6> © lol Art Galleria 👩‍🎨</h6>
   </footer>
   </>
      );
    }
      
export default App;