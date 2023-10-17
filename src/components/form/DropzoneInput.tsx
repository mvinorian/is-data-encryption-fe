import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import {
  Controller,
  get,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import ErrorMessage from '@/components/form/ErrorMessage';
import FilePreview from '@/components/form/FilePreview';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';
import { FileWithPreview } from '@/types/dropzone';

export type DropzoneInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  accept?: Accept;
  acceptTypes?: string;
  maxFiles?: number;
  className?: string;
};

export default function DropzoneInput({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  accept = { 'image/*': ['.jpg', '.jpeg', '.png'] },
  acceptTypes = 'JPG, JPEG, atau PNG',
  maxFiles = 1,
  className,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  const dropzoneRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);

  const [files, setFiles] = React.useState<FileWithPreview[]>(
    getValues(id) || []
  );

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ?? [...files]);
        setError(id, {
          type: 'manual',
          message:
            rejectedFiles &&
            `${
              rejectedFiles[0].errors[0].code === 'file-too-large'
                ? 'File tidak boleh lebih dari 1MB'
                : rejectedFiles[0].errors[0].code === 'file-invalid-type'
                ? 'Tipe file tidak didukung'
                : rejectedFiles[0].errors[0].message
            }`,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          { shouldValidate: true }
        );

        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);

    setFiles(newFiles.length > 0 ? newFiles : []);
    setValue(id, newFiles.length > 0 ? newFiles : null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 1000000,
  });

  return (
    <div className='w-full space-y-1.5'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography className='font-semibold text-base-primary'>
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-red-200'>*</Typography>
          )}
        </label>
      )}

      {files?.length < maxFiles && (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={() => (
            <div
              ref={dropzoneRef}
              className='focus:outline-none group'
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div
                className={clsxm(
                  'w-full cursor-pointer bg-base-light rounded-md',
                  'flex flex-col items-center space-y-2 px-3 py-8',
                  'border-dashed border-2 border-base-icon',
                  error
                    ? 'border-red-200 group-focus:border-red-200'
                    : 'group-focus:border-teal-600',
                  className
                )}
              >
                <div className='w-8 h-8 text-base-icon'>
                  <MdOutlineAddPhotoAlternate className='w-full h-full' />
                </div>

                <div className='flex flex-col items-center'>
                  <Typography className='text-center text-base-primary'>
                    <span className='font-semibold underline text-teal'>
                      Klik untuk upload
                    </span>{' '}
                    atau drag and drop
                  </Typography>
                  <Typography className='text-center text-base-icon'>
                    {acceptTypes}
                  </Typography>
                </div>

                <Typography className='text-xs font-semibold text-center text-base-icon'>
                  Tersisa {maxFiles - files?.length} file lagi
                </Typography>
              </div>
            </div>
          )}
        />
      )}

      <div className='divide-y divide-base-outline'>
        {files.map((file, index) => (
          <FilePreview key={index} file={file} deleteFile={deleteFile} />
        ))}
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
