import { useToken } from "../../contexts/authTokenContext"
import React, { useState } from "react";
import data from "../../data/images.json"
import Modal from "../../components/Gallery/Modal"

export const Gallery = () => {
    const[token ]= useToken()

    const[clickedImg, setClickedImg] = useState< any | null>(null);
    const[currentIndex, setCurrentIndex] = useState< any | null>(null);

    const handleClick = (item: any, index: any) => {
        setCurrentIndex(index);
        setClickedImg(item.link);
    };

    const handleNavigationRight = () => {
       const totalLength = data.data.length;
       if(currentIndex +1 >= totalLength) {
        setCurrentIndex(0);
        const newUrl = data.data[0].link;
        setClickedImg(newUrl);
        return;
       }
       const newIndex = currentIndex+1;
       const newUrl = data.data.filter((item) => {
        return data.data.indexOf(item) === newIndex;
       });
       const newItem = newUrl[0].link;
       setClickedImg(newItem);
       setCurrentIndex(newIndex);
    };

    const handleNavigationLeft = () => {
        const totalLength = data.data.length;
       if(currentIndex === 0) {
        setCurrentIndex(totalLength-1);
        const newUrl = data.data[totalLength-1].link;
        setClickedImg(newUrl);
        return;
       }
       const newIndex = currentIndex-1;
       const newUrl = data.data.filter((item) => {
        return data.data.indexOf(item) === newIndex;
       });
       const newItem = newUrl[0].link;
       setClickedImg(newItem);
       setCurrentIndex(newIndex);
    };

    return (
        <div className="main-menu">
            <div className="content-layer">

            <div className="about">
                <h3>👋 Cześć user!</h3>
                <h4>Galeria zdjęć</h4>
            </div>

            <div className="line-breaker">
                <hr></hr>
            </div>  

            <div className="photo-grid-row">
                
                <div className="photo-grid-column">
                {data.data.map((item, index) => (
                    <div key={index}>
                    <img src={item.link} alt={item.alt} onClick={() => handleClick(item, index)}/>
                    </div>
                ))}
                {clickedImg && <Modal clickedImg={clickedImg} handleNavigationLeft={handleNavigationLeft} handleNavigationRight={handleNavigationRight} setClickedImg={setClickedImg}/>}
                </div> 
                             
                    
            </div> 
            </div>
        </div>
    )
}