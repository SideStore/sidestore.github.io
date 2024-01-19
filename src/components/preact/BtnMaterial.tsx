import type { PropsWithChildren } from 'preact/compat';

class btnMaterialProps {
  extraClasses?: string;
  id?: string;
}

export default function BtnMaterial(props: btnMaterialProps & PropsWithChildren) {
  return (
    <button className={props.extraClasses + ' border-zinc-800 bg-material/40 text-zinc-300 hover:bg-material'} id={props.id}>
      {props.children}
    </button>
  );
}
