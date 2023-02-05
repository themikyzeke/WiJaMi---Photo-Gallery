import { FC, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImagesResponse } from '../Gallery';

export interface GalleryContentProps {
  hasMore: boolean;
  data: ImagesResponse[];
  handleClick: (link: string, index: number) => void;
  handleLoadMore: () => void;
}
const COLUMN_COUNT = 2;

export const GalleryContent: FC<GalleryContentProps> = ({
  hasMore,
  data,
  handleClick,
  handleLoadMore,
}) => {
  const columnedData = useMemo(
    () =>
      data.reduce<Array<ImagesResponse[]>>((result, image, index) => {
        const columnIndex = index % COLUMN_COUNT;

        result[columnIndex] ??= [];
        result[columnIndex].push(image);

        return result;
      }, []),
    [data, COLUMN_COUNT],
  );

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={handleLoadMore}
      hasMore={hasMore}
      loader={<></>}
      endMessage={<h4>Dotarłeś do końca swojej galerii!</h4>}
    >
      {/* {data.data.map((item, index) => ( */}
      <div className="photo-grid-row" key={`page-${1}`}>
        {columnedData.map((columnData, columnIndex) => (
          <div className="photo-grid-column">
            {columnData.map((item, itemIndex) => (
              <div
                className="galery-item"
                key={`image--c${columnIndex}-p${itemIndex}-i${1}`}
              >
                <img
                  src={item.imageFileName}
                  onClick={() =>
                    handleClick(
                      item.imageFileName,
                      COLUMN_COUNT * itemIndex + columnIndex,
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

