import { translate } from '~/language';

export default function getPageTitle(key) {
  const hasKey = translate(`${key}`);
  if (hasKey) {
    const pageName = translate(`${key}`);
    return `${pageName}`;
  }
}
