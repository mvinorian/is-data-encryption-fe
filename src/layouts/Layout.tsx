import * as React from 'react';

import BaseDialog from '@/components/dialog/BaseDialog';
import Navbar from '@/layouts/Navbar';
import useDialogStore from '@/store/useDialogStore';

type LayoutOpt = {
  children: React.ReactNode;
  withNavbar?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({ children, withNavbar = false }: LayoutOpt) {
  //#region  //*=========== Store ===========
  const open = useDialogStore.useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========

  return (
    <div className='overflow-hidden'>
      {withNavbar && <Navbar />}
      {children}
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
    </div>
  );
}
