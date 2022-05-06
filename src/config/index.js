export const DEV_MODE = "development";
export const PROD_MODE = "production";

export const PUBLICROUTES = ['/', '/explore', '/login', '/register'];
export const config = {
    mode : DEV_MODE,    
}

const testAddress = {
    token: "0x70F4bEb91b47fb7d2cd632FE2A2bE9f8ED74E487",
    marketplace: "0xab2B2223fBee0F3a6442230a0823f243A707C498"
}

const mainAddess = {
    token: "",
    marketplace: ""
}

const testChainId = "";
const mainChainId = "";

export const contractAddress = config.mode == DEV_MODE ? testAddress : mainAddess;

export const ChainId = config.mode == DEV_MODE ? testChainId : mainChainId;

export const WEB3APIKEY = "dQHuqyi1lC78Lz6UodHRsl1KR9ZgvDK0lawdYIqwGoe5rM4okuCn2OVXVxj2oiux";
export const APPID = "dQHuqyi1lC78Lz6UodHRsl1KR9ZgvDK0lawdYIqwGoe5rM4okuCn2OVXVxj2oiux";
export const SERVERURL = "https://2uqjjsijzggv.usemoralis.com:2053/server";

export const PIN_API_KEY = "f716dd2e1e4c8aee91cd";
export const PIN_SEC_KEY = "c8b8ae2a57dd31c8e36449f11d2529bf98240b7a818de5291f9fa77dbdb8ec84";




