import type { PropsWithChildren } from 'preact/compat';

class violetPhraseProps {} // for future use if necessary

export default function VioletPhrase(props: violetPhraseProps & PropsWithChildren) {
  return <span className={'font-medium text-violet-300/70'}>{props.children}</span>;
}
