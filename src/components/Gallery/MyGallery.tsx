import {
  QueryFunctionContext,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useAxios } from '../../contexts/apiClientContext';
import { sleep } from '../../utils/sleep';
import { GalleryContent } from './GaleryContent/GalleryContent';
import { ImagesResponse } from './Gallery';
import CloseViewModal from './CloseViewModal';
import { useGalleryData } from './useGaleryData';
import { Modal } from 'antd';
import { errorAlert, successAlert } from '../../utils/alerts';
const PAGE_SIZE = 5;
export const MyGalery = () => {
  const [axios] = useAxios();
  const queryClient = useQueryClient();

  const [isDeletionModalOpen, setDeletionModelIsOpen] = useState(false);
  const [chosenImageIndex, setChosenImageIndex] = useState<
    number | undefined
  >();

  const removeImage = useMutation<unknown, unknown, number>({
    mutationFn: (id: number) => axios.delete(`images/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });

  const handleOk = () => {
    if (chosenImageIndex === undefined) {
      return;
    }

    removeImage.mutate(data[chosenImageIndex].id, {
      onSuccess: () => {
        successAlert('Usunięto zdjęcie!');
      },
      onError: () => {
        errorAlert('Błąd podczas usuwania zdjęcia!');
      },
    });
    setDeletionModelIsOpen(false);
  };

  const handleCancel = () => {
    setDeletionModelIsOpen(false);
  };

  const handleImageClick = (imageUrl: string, index: number) => {
    setDeletionModelIsOpen(true);
    setChosenImageIndex(index);
  };

  const fetchMyImages = useCallback(
    async ({ pageParam }: QueryFunctionContext): Promise<ImagesResponse[]> => {
      const [{ data }] = await Promise.all([
        axios.get('images/my', {
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

  const { fetchNextPage, hasMore, isFetchedAfterMount, data, isFetching } =
    useGalleryData(fetchMyImages, PAGE_SIZE, 'myGallery');

  return (
    <div className="galery-content">
      <div className="line-breaker">
        <hr></hr>
      </div>
      {isFetchedAfterMount && (
        <GalleryContent
          data={data}
          handleClick={handleImageClick}
          hasMore={hasMore}
          handleLoadMore={fetchNextPage}
        />
      )}
      {(!isFetchedAfterMount || isFetching) && hasMore && (
        <PacmanLoader color="#ffff00" />
      )}

      <Modal
        title="Do you want to delete chosen image?"
        open={isDeletionModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </div>
  );
};

