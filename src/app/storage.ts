import { getBucket } from '@extend-chrome/storage';

type StyleConfig = {
  targetStyle: string;
};

export const getStyleConfigBucket = () => getBucket<StyleConfig>('styleConfigKey', 'sync');
