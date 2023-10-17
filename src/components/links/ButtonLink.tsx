import { LinkProps } from 'next/link';
import * as React from 'react';

import Button, { ButtonProps } from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';

type ButtonLinkProps = {
  href: string;
  openNewTab?: boolean;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & ButtonProps &
  React.ComponentPropsWithRef<'a'>;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, openNewTab, nextLinkProps, children, target, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        href={href}
        target={target}
        openNewTab={openNewTab}
        nextLinkProps={nextLinkProps}
      >
        <Button {...rest}>{children}</Button>
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
