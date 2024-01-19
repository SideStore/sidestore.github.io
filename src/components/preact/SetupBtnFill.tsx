import type { PropsWithChildren } from 'preact/compat';

class btnFillProps {
  extraClasses?: string;
  id?: string;
}

export default function BtnFill(props: btnFillProps & PropsWithChildren) {
  return (
    <button
      className={
        props.extraClasses +
        ' bg-[rgb(39, 32, 74)] my-2 flex w-max min-w-max items-center rounded-full border border-side-purple-400/30 px-3 py-1 text-zinc-300 shadow-md transition-colors hover:border-side-purple-400/70 hover:bg-side-purple-700'
      }
      id={props.id}
    >
      {props.children}
    </button>
  );
}
