import { ENV } from "./env";

export const API_ROUTES = {
    BREED_IMAGE: `${ENV.API_BASE_URL}/api/breed-image`,
    BREED_LIST: `${ENV.API_BASE_URL}/api/breed-list`,
    BREED_IMAGE_PROXY: `${ENV.API_BASE_URL}/api/breed-image-proxy`,
    DOG_API_URL: "https://dog.ceo/api",
};

export const API_CONFIG = {
    REVALIDATE_TIME: 3600, // ISR 重新驗證時間（秒）
    STALE_WHILE_REVALIDATE_TIME: 86400, // Stale-while-revalidate 設定
}