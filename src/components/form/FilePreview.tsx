import 'yet-another-react-lightbox/styles.css';

import * as React from 'react';
import { HiOutlineExternalLink, HiOutlineTrash } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { TbFileText } from 'react-icons/tb';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/typography/Typography';
import { FileWithPreview } from '@/types/dropzone';

type FilePreviewProps = {
  file: FileWithPreview;
  deleteFile?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => void;
  readOnly?: boolean;
};

export default function FilePreview({
  file,
  deleteFile,
  readOnly,
}: FilePreviewProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const imageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  const zoomRef = React.useRef(null);
  return (
    <li
      key={file.name}
      className='w-full flex items-center space-x-2 p-3 bg-base-light rounded-md'
    >
      <div className='w-6 h-6'>
        <TbFileText className='w-full h-full text-base-icon' />
      </div>

      <Typography variant='c' className='flex-1 text-base-primary truncate'>
        {file.name}
      </Typography>

      {imageTypes.includes(file.type) ? (
        <Button
          icon={IoMdEye}
          size='base'
          variant='primary'
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <ButtonLink
          href={file.preview}
          icon={HiOutlineExternalLink}
          size='base'
          openNewTab={true}
          target='_blank'
          variant='primary'
        />
      )}

      {!readOnly && (
        <Button
          icon={HiOutlineTrash}
          size='base'
          variant='danger'
          onClick={handleDelete}
        />
      )}

      <Lightbox
        open={isOpen}
        slides={[{ src: file.preview }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
        zoom={{ ref: zoomRef }}
        close={() => setIsOpen(false)}
      />
    </li>
  );
}
