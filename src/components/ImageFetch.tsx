import 'yet-another-react-lightbox/style.css';

import Image from 'next/legacy/image';
import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import api from '@/lib/api';

type ImageFetchProps = {
  imgPath: string;
  label: string;
  width?: number;
  height?: number;
  alt: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ImageFetch = ({
  imgPath,
  label,
  alt,
  width = 300,
  height = 160,
  ...props
}: ImageFetchProps) => {
  const [imgSrc, setImgSrc] = React.useState<string>();
  const [isOpen, setIsOpen] = React.useState(false);

  const zoomRef = React.useRef(null);

  const getImageURL = React.useCallback(async ({ url }: { url: string }) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const base64string = Buffer.from(
          new Uint8Array(res.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''),
          'binary'
        ).toString('base64');

        const contentType = res.headers['content-type'];
        return {
          data: `data:${contentType};base64,${base64string}`,
        };
      })
      .then((res) => {
        setImgSrc(res.data);
      });
  }, []);

  React.useEffect(() => {
    if (imgPath) {
      getImageURL({ url: `/stream_image?path=${imgPath}` });
    }
  }, [getImageURL, imgPath]);

  return (
    <>
      <div {...props} className='cursor-pointer'>
        {imgSrc && (
          <div className=''>
            <label className='block font-bold text-lg pb-2'>{label}</label>
            <Image
              src={imgSrc as string}
              layout='responsive'
              width={width}
              height={height}
              alt={alt}
              objectFit='contain'
              onClick={() => setIsOpen(true)}
            />
          </div>
        )}
        {isOpen && (
          <Lightbox
            open={isOpen}
            slides={[{ src: imgSrc as string }]}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
            plugins={[Zoom]}
            zoom={{ ref: zoomRef }}
            close={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default ImageFetch;
