import React, { useState } from 'react';
import data from '../../data/images.json';
import Modal from '../../components/Gallery/Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Greeter } from './Greeter/Greeter';
import { useAxios } from '../../contexts/apiClientContext';

export const Gallery = () => {
  const [clickedImg, setClickedImg] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState<any | null>(null);
  const [axios] = useAxios();

  const handleClick = (item: any, index: any) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
  };

  const handleNavigationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handleNavigationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data.data[totalLength - 1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const [dataSource, setDataSource] = useState(Array.from({ length: 2 }));

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (dataSource.length < 10) {
      //API CALL TUTAJ
      setTimeout(() => {
        setDataSource(dataSource.concat(Array.from({ length: 2 })));
      }, 1000);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div className="main-menu">
      <div className="content-layer">
        <Greeter />

        <div className="line-breaker">
          <hr></hr>
        </div>

        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Ładowanie...</h4>}
          endMessage={<h4>Dotarłeś do końca swojej galerii!</h4>}
        >
          {dataSource.map((item, index) => {
            return (
              <div className="photo-grid-row" key={`pgr-${index}`}>
                <div className="photo-grid-column">
                  {data.data.map((item, index) => (
                    <div key={index}>
                      <img
                        src={item.link}
                        alt={item.alt}
                        onClick={() => handleClick(item, index)}
                      />
                    </div>
                  ))}

                  {clickedImg && (
                    <Modal
                      clickedImg={clickedImg}
                      handleNavigationLeft={handleNavigationLeft}
                      handleNavigationRight={handleNavigationRight}
                      setClickedImg={setClickedImg}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

