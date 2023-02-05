import { Tabs } from 'antd';
import { useState } from 'react';
import { useMeContext } from '../../contexts/meStore';
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
  const isLogggedIn = useMeContext((state) => state.isLoggedIn);
  return (
    <div className="main-menu">
      <div className="content-layer">
        <Greeter />
        <div className="galery-menu">
          <div
            className={`galery-menu-item ${page === 'All' ? 'active' : ''}`}
            onClick={() => setPage('All')}
          >
            Galeria Zdjęć
          </div>
          {isLogggedIn && <div
            className={`galery-menu-item ${page === 'My' ? 'active' : ''}`}
            onClick={() => setPage('My')}
          >
            Moje Zdjęcia
          </div>}
        </div>
        {page === 'All' ? <AllGalery /> : <MyGalery />}
      </div>
    </div>
  );
};

