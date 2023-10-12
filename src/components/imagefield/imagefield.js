import React from "react";
import './imagefield.css'


const ImageField = ({ url, concept }) => {

    const concept_array_name = concept.map((c,i) => {
        return <li className="list_items" key={i}>{c.name}</li>
                
    })

    const concept_array_value = concept.map((c,i) => {
        return <li className="list_items" key={i}>{c.value}</li>
                
    })

    

    return(
        <div className="imageField">
            <img alt="image_detection" src={url}></img>  

            <div className="concept_container">
                <ul className="name_concept">
                 
                    {concept_array_name}
                </ul>
                <ul className="value_concept">
                 
                    {concept_array_value}
                </ul>
            </div>
        </div>

    );
}


export default ImageField