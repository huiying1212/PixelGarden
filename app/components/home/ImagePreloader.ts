import { Asset } from "expo-asset";
import { PRELOAD_IMAGES } from "./constants";

// 预加载所有图片资源
export const preloadImages = async (): Promise<void> => {
  await Promise.all(
    PRELOAD_IMAGES.map(image => Asset.fromModule(image).downloadAsync())
  );
};

// 安全的图片预加载函数，包含错误处理
export const loadImagesWithErrorHandling = async (): Promise<boolean> => {
  try {
    await preloadImages();
    return true;
  } catch (error) {
    console.error("图片预加载失败:", error);
    // 即使加载失败也返回true，让应用可以继续使用
    return true;
  }
}; 