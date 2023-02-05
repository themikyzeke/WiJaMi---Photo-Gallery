import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ImagesResponse } from './Gallery';

export const useGalleryData = (
  fetchImages: ({
    pageParam,
  }: QueryFunctionContext) => Promise<ImagesResponse[]>,
  pageSize: number,
  queryKey: string,
) => {
  const [clickedImg, setClickedImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [pendingMoveRight, setPendingMoveRight] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    handleFetchNextPage(page);
  }, [page]);

  useEffect(() => {
    console.log('changing fetching method');
    setClickedImg(null);
    setCurrentIndex(null);
    setPendingMoveRight(false);
    setPage(1);
    refetch();
  }, [fetchImages, pageSize]);

  const {
    fetchNextPage: fetchNextPageInInfiniteQuery,
    data: imageData,
    isFetching,
    isFetchedAfterMount,
    refetch,
  } = useInfiniteQuery<ImagesResponse[]>({
    queryKey: ['images', queryKey, fetchImages],
    queryFn: fetchImages,
  });

  const data = useMemo(() => imageData?.pages?.flat() ?? [], [imageData]);

  const handleClick = (imageUrl: string, index: number) => {
    setCurrentIndex(index);
    setClickedImg(imageUrl);
  };

  const hasMore = useMemo(() => {
    const lastPageLength = imageData?.pages.at(-1)?.length;
    const pageCount = imageData?.pages?.length;

    console.log('lpl', lastPageLength);
    console.log('Pc', pageCount);
    if (pageCount === 1 && lastPageLength === 0) {
      return false;
    }

    if (lastPageLength !== pageSize) {
      return false;
    }

    return true;
  }, [imageData]);

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

  const fetchNextPage = () => {
    setPage((page) => page + 1);
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
      await fetchNextPageInInfiniteQuery({ pageParam: page });
      console.log(3);
      if (pendingMoveRight) {
        console.log(4);
        setPendingMoveRight(false);
        handleNavigationRight();
      }
    },
    [hasMore, isFetching],
  );

  return {
    fetchNextPage,
    handleNavigationLeft,
    handleNavigationRight,
    hasMore,
    handleClick,
    isFetchedAfterMount,
    clickedImg,
    currentIndex,
    data,
    setPage,
    setClickedImg,
    isFetching,
  };
};

