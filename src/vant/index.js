import {
  Button,
  Image as VanImage,
  ImagePreview,
  Icon,
  Overlay,
  Popup
} from 'vant';

export function vant(app) {
  app.use(ImagePreview);
  app.use(VanImage);
  app.use(Button);
  app.use(Icon);
  app.use(Overlay);
  app.use(Popup);
}
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  }
};
