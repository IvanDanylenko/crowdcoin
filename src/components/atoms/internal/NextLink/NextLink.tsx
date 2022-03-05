import { forwardRef } from 'react';
import Link from 'next/link';
import { NextLinkProps } from './types';

const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ href, replace, scroll, shallow, prefetch, locale, ...rest }, ref) => {
    return (
      <Link
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
      >
        <a ref={ref} {...rest} />
      </Link>
    );
  },
);
NextLink.displayName = 'NextLink';

export default NextLink;
