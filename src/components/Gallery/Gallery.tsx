import { Tabs } from 'antd';
import { useState } from 'react';
import { AllGalery } from './AllGallery';
import { Greeter } from './Greeter/Greeter';
import { MyGalery } from './MyGallery';

export interface ImagesResponse {
  id: number;
  imageFileName: string;
  created_at: string;
}

const PAGE_SIZE = 5;

export const Gallery = () => {
  const [page, setPage] = useState<string>('All');
  return (
    <div className="main-menu">
      <div className="content-layer">
        <Greeter />
        <Tabs
          type="card"
          onChange={setPage}
          items={[
            {
              label: `Galeria Zdjęć`,
              key: 'All',
              children: <></>,
            },

            {
              label: `Moje Zdjęcia`,
              key: 'My',
              children: <></>,
            },
          ]}
        />

        {page === 'All' ? <AllGalery /> : <MyGalery />}
      </div>
    </div>
  );
};

