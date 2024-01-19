import type { PropsWithChildren } from 'preact/compat';

class gLinkProps {
  extraClasses?: string;
  id?: string;
  href: string = '';
}

export default function GLink(props: gLinkProps & PropsWithChildren) {
  return (
    <a className={props.extraClasses + ' text-violet-300/70 transition-colors hover:text-violet-300'} id={props.id} href={props.href}>
      {props.children}
    </a>
  );
}
