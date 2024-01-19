import type { PropsWithChildren } from 'preact/compat';

class violetPhraseProps {} // for future use if necessary

export default function CodeBlock(props: violetPhraseProps & PropsWithChildren) {
  return (
    <span className={'rounded-xl border border-zinc-800 bg-material/10 px-1.5 py-0.5 font-mono text-[0.825rem] leading-6'}>{props.children}</span>
  );
}
