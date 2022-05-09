import { BigNumber } from "ethers";

export const DEV_MODE = "development";
export const PROD_MODE = "production";

export const API_URL = process.env.API_URL || 'http://localhost:8082';

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

const TEST_CONTRACT_ADDRESS  = {
    token: "0xD724AB6F01593a4C90920df67bBaB61eB6c38f30",
    marketplace: "0x228A067e235E9277c06bA6f4257f3ABf0b878c96",
    nativeToken: "0x1D1c8B4894Fe8730bA2690D1A321f199540cC967"
}
const MAIN_CONTRACT_ADDRESS  = {
    token: "0xD724AB6F01593a4C90920df67bBaB61eB6c38f30",
    marketplace: "0x228A067e235E9277c06bA6f4257f3ABf0b878c96",
    nativeToken: "0x1D1c8B4894Fe8730bA2690D1A321f199540cC967"
}

const testChainId = "";
const mainChainId = "";

export const contractAddress = config.mode == DEV_MODE ? testAddress : mainAddess;
export const CONTRACT_ADDRESS = config.mode == DEV_MODE ? TEST_CONTRACT_ADDRESS : MAIN_CONTRACT_ADDRESS;

export const ChainId = config.mode == DEV_MODE ? testChainId : mainChainId;

export const CRONOS_TEST_NET = "https://cronos-testnet-3.crypto.org:8545/";
export const CRONOS_MAIN_NET = "https://evm-cronos.crypto.org/";

export const ChainUrl = config.mode == DEV_MODE ? CRONOS_TEST_NET : CRONOS_MAIN_NET;

export const WEB3APIKEY = "dQHuqyi1lC78Lz6UodHRsl1KR9ZgvDK0lawdYIqwGoe5rM4okuCn2OVXVxj2oiux";
export const APPID = "dQHuqyi1lC78Lz6UodHRsl1KR9ZgvDK0lawdYIqwGoe5rM4okuCn2OVXVxj2oiux";
export const SERVERURL = "https://2uqjjsijzggv.usemoralis.com:2053/server";

export const PIN_API_KEY = "c846434328fd1a3b2aec";
export const PIN_SEC_KEY = "e7a58b012debf606ebea95ec6a2eb9dd6a3b5f6c5a64c9915fb1f685382e789b";
export const DECIMAL = 18;


export const RES_SUCCESS_CODE = "res_success_code";
export const RES_ERROR_REGISTER = "res_error_register";
export const RES_ERROR_LOGIN = "res_error_login";
export const RES_ERROR_LOGOUT = "res_error_logout";
export const RES_ERROR_GETUSER = "res_error_getuser";
export const RES_WRONG_PASSWORD = "res_error_wrongpassword";
export const RES_ERROR_DATABASE = "res_error_database";



export function toWEI(number){
    return new BigNumber(number).shiftedBy(DECIMAL);
}

export function fromWEI(number){
    return new BigNumber(number).shiftedBy(-1 * DECIMAL).toNumber();
}

