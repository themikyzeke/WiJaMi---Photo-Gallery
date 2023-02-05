import { QueryFunctionContext } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useAxios } from '../../contexts/apiClientContext';
import { sleep } from '../../utils/sleep';
import { GalleryContent } from './GaleryContent/GalleryContent';
import { ImagesResponse } from './Gallery';
import CloseViewModal from './CloseViewModal';
import { useGalleryData } from './useGaleryData';
const PAGE_SIZE = 5;
export const AllGalery = () => {
  const [axios] = useAxios();

  const fetchAllImages = useCallback(
    async ({ pageParam }: QueryFunctionContext): Promise<ImagesResponse[]> => {
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
    handleClick,
    fetchNextPage,
    handleNavigationLeft,
    handleNavigationRight,
    hasMore,
    clickedImg,
    currentIndex,
    isFetchedAfterMount,
    data,
    setClickedImg,
    isFetching,
  } = useGalleryData(fetchAllImages, PAGE_SIZE, 'allGallery');

  return (
    <div className="galery-content">
      <div className="line-breaker">
        <hr></hr>
      </div>
      {isFetchedAfterMount && (
        <GalleryContent
          data={data}
          handleClick={handleClick}
          hasMore={hasMore}
          handleLoadMore={fetchNextPage}
        />
      )}
      {clickedImg && (
        <CloseViewModal
          clickedImg={clickedImg}
          handleNavigationLeft={handleNavigationLeft}
          handleNavigationRight={handleNavigationRight}
          setClickedImg={setClickedImg}
          hideLeft={currentIndex === 0}
          hideRight={
            !!currentIndex && currentIndex === data.length - 1 && !hasMore
          }
        />
      )}
      {(!isFetchedAfterMount || isFetching) && hasMore && (
        <PacmanLoader color="#ffff00" />
      )}
    </div>
  );
};

