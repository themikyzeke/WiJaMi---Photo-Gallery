import React, { useCallback, useMemo, useState } from 'react';
import data from '../../data/images.json';
import Modal from '../../components/Gallery/Modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Greeter } from './Greeter/Greeter';
import { useAxios } from '../../contexts/apiClientContext';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

export interface ImagesResponse {
  id: number;
  imageFileName: string;
  created_at: string;
}

const PAGE_SIZE = 5;

export const Gallery = () => {
  const [clickedImg, setClickedImg] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState<any | null>(null);
  const [axios] = useAxios();

  const [page, setPage] = useState(1);
  const fetchImages = useCallback(
    async ({ pageParam }: QueryFunctionContext) => {
      return (
        await axios.get('images/all', {
          params: {
            page: pageParam,
            pageSize: PAGE_SIZE,
          },
        })
      ).data;
    },
    [axios],
  );

  const {
    fetchNextPage,
    data: imageData,
    isFetching,

    isFetchedAfterMount,
  } = useInfiniteQuery<ImagesResponse[]>({
    queryKey: ['images'],
    queryFn: fetchImages,
  });

  const data = useMemo(() => imageData?.pages?.flat() ?? [], [imageData]);

  const handleClick = (item: any, index: any) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
  };

  const handleNavigationRight = () => {
    // const totalLength = data.data.length;
    // if (currentIndex + 1 >= totalLength) {
    //   setCurrentIndex(0);
    //   const newUrl = data.data[0].link;
    //   setClickedImg(newUrl);
    //   return;
    // }
    // const newIndex = currentIndex + 1;
    // const newUrl = data.data.filter((item) => {
    //   return data.data.indexOf(item) === newIndex;
    // });
    // const newItem = newUrl[0].link;
    // setClickedImg(newItem);
    // setCurrentIndex(newIndex);
  };

  const handleNavigationLeft = () => {
    // const totalLength = data.data.length;
    // if (currentIndex === 0) {
    //   setCurrentIndex(totalLength - 1);
    //   const newUrl = data.data[totalLength - 1].link;
    //   setClickedImg(newUrl);
    //   return;
    // }
    // const newIndex = currentIndex - 1;
    // const newUrl = data.data.filter((item) => {
    //   return data.data.indexOf(item) === newIndex;
    // });
    // const newItem = newUrl[0].link;
    // setClickedImg(newItem);
    // setCurrentIndex(newIndex);
  };

  // const [dataSource, setDataSource] = useState(Array.from({ length: 2 }));

  const [hasMore, setHasMore] = useState(true);

  // const fetchMoreData = () => {
  //   if (dataSource.length < 10) {
  //     //API CALL TUTAJ
  //     setTimeout(() => {
  //       setDataSource(dataSource.concat(Array.from({ length: 2 })));
  //     }, 1000);
  //   } else {
  //     setHasMore(false);
  //   }
  // };

  return (
    <div className="main-menu">
      <div className="content-layer">
        <Greeter />

        <div className="line-breaker">
          <hr></hr>
        </div>

        <InfiniteScroll
          dataLength={data?.length}
          next={async () => {
            const currPage = page + 1;
            setPage(currPage);
            await fetchNextPage({ pageParam: currPage });
          }}
          hasMore={imageData?.pages.at(-1)?.length !== PAGE_SIZE - 1}
          loader={<Spin />}
          endMessage={<h4>Dotarłeś do końca swojej galerii!</h4>}
        >
          {/* {data.data.map((item, index) => ( */}

          {console.log(imageData)}
          {isFetchedAfterMount && (
            <div className="photo-grid-row" key={`page-${1}`}>
              <div className="photo-grid-column">
                {data.map((item, pageIndex) => {
                  console.log(data);
                  return (
                    <div key={`image-p${pageIndex}-i${1}`}>
                      <img
                        src={item.imageFileName}
                        onClick={() => handleClick(item, pageIndex)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {clickedImg && (
            <Modal
              clickedImg={clickedImg}
              handleNavigationLeft={handleNavigationLeft}
              handleNavigationRight={handleNavigationRight}
              setClickedImg={setClickedImg}
            />
          )}

          {/* })} */}
        </InfiniteScroll>
      </div>
    </div>
  );
};

