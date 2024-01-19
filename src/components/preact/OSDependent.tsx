import Bowser, { OS_MAP } from 'bowser';

class OSDependentProps {
  linux?: string;
  macos?: string;
  windows?: string;
}

export default function OSDependent(props: OSDependentProps) {
  const detectedOS = Bowser.parse(navigator.userAgent).os.name?.toLowerCase();
  let textToUse = '';

  switch (detectedOS) {
    case OS_MAP.MacOS:
      textToUse = props.macos ? props.macos : '';
      break;
    case OS_MAP.Linux:
      textToUse = props.linux ? props.linux : '';
      break;
    case OS_MAP.Windows:
      textToUse = props.linux ? props.linux : '';
      break;
    case OS_MAP.WindowsPhone:
      textToUse = 'who even uses these';
      break;
    default:
      textToUse = props.macos ? props.macos : '';
  }
  return <>{textToUse}</>;
}
