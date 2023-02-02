import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PacmanLoader } from 'react-spinners';
import Modal from '../../components/Gallery/Modal';
import { useAxios } from '../../contexts/apiClientContext';
import { sleep } from '../../utils/sleep';
import { Greeter } from './Greeter/Greeter';

export interface ImagesResponse {
  id: number;
  imageFileName: string;
  created_at: string;
}

const PAGE_SIZE = 5;

export const Gallery = () => {
  const [clickedImg, setClickedImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [axios] = useAxios();
  const [pendingMoveRight, setPendingMoveRight] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    handleFetchNextPage(page);
  }, [page]);

  const fetchImages = useCallback(
    async ({ pageParam }: QueryFunctionContext) => {
      const [{ data }] = await Promise.all([
        axios.get('images/all', {
          params: {
            page: pageParam,
            pageSize: PAGE_SIZE,
          },
        }),
        sleep(1500),
      ]);

      return data;
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

  const handleClick = (imageUrl: string, index: number) => {
    setCurrentIndex(index);
    setClickedImg(imageUrl);
  };

  const hasMore = useMemo(
    () => imageData?.pages.at(-1)?.length !== PAGE_SIZE - 1,
    [imageData],
  );

  const handleNavigationRight = () => {
    console.log(
      'right',
      currentIndex,
      currentIndex! + 1 === data.length,
      !hasMore,
    );
    const totalLength = data.length;

    if (currentIndex === null || (currentIndex >= totalLength && !hasMore)) {
      setCurrentIndex(0);
      const newUrl = data[0].imageFileName;
      setClickedImg(newUrl);
      return;
    }
    if (currentIndex + 1 >= totalLength && hasMore) {
      setPendingMoveRight(true);
      setPage((page) => page + 1);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data[newIndex].imageFileName;

    setClickedImg(newUrl);
    setCurrentIndex(newIndex);
  };

  const handleNavigationLeft = () => {
    console.log('left', currentIndex, clickedImg);
    const totalLength = data.length;

    if (currentIndex === 0 || !currentIndex) {
      return;
    }

    const newIndex = currentIndex - 1;
    const newUrl = data[newIndex].imageFileName;

    setClickedImg(newUrl);
    setCurrentIndex(newIndex);
  };

  const handleFetchNextPage = useCallback(
    async (page: number) => {
      if (isFetching || !hasMore) {
        console.log(isFetching, hasMore);
        return;
      }
      console.log(2);
      await fetchNextPage({ pageParam: page });
      console.log(3);
      if (pendingMoveRight) {
        console.log(4);
        setPendingMoveRight(false);
        handleNavigationRight();
      }
    },
    [hasMore, isFetching],
  );

  return (
    <div className="main-menu">
      <div className="content-layer">
        <Greeter />
        <div className="galery-content">
          <div className="line-breaker">
            <hr></hr>
          </div>
          {isFetchedAfterMount && (
            <InfiniteScroll
              dataLength={data?.length}
              next={() => {
                setPage((page) => page + 1);
              }}
              hasMore={hasMore}
              loader={<></>}
              endMessage={<h4>Dotarłeś do końca swojej galerii!</h4>}
            >
              {/* {data.data.map((item, index) => ( */}
              <div className="photo-grid-row" key={`page-${1}`}>
                <div className="photo-grid-column">
                  {data.map((item, itemIndex) => {
                    return (
                      <div
                        className="galery-item"
                        key={`image-p${itemIndex}-i${1}`}
                      >
                        <img
                          src={item.imageFileName}
                          onClick={() =>
                            handleClick(item.imageFileName, itemIndex)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* })} */}
            </InfiniteScroll>
          )}
          {clickedImg && (
            <Modal
              clickedImg={clickedImg}
              handleNavigationLeft={handleNavigationLeft}
              handleNavigationRight={handleNavigationRight}
              setClickedImg={setClickedImg}
              hideLeft={currentIndex === 0}
              hideRight={
                !!currentIndex && currentIndex === data.length && !hasMore
              }
            />
          )}
          {(!isFetchedAfterMount || isFetching) && hasMore && (
            <PacmanLoader color="#ffff00" />
          )}
        </div>
      </div>
    </div>
  );
};

