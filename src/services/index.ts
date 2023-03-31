import axios from 'axios'
import { config } from '../config/config'

const header = () => {
  return {
    'content-type': 'application/json',
  }
}

export const listPokemon = async (param: any) => {
  try {
    const configure = {
      method: "GET",
      url: param ? param : config.apiUrl + "?limit=21",
      headers: header(),
    };
    const { data } = await axios(configure);
    return data;
  } catch (err: any) {
    const { data } = (await err.response) ? err.response : "";
    return data;
  }
};

export const pokemonById = async (url: any) => {
  try {
    const configure = {
      method: "GET",
      url: url,
      headers: header(),
    };
    const { data } = await axios(configure);
    return data;
  } catch (err: any) {
    const { data } = (await err.response) ? err.response : "";
    return data;
  }
};

export const searchTypePokemon = async (param: any) => {
  try {
    const configure = {
      method: "GET",
      url: "https://pokeapi.co/api/v2/type/" + param,
      headers: header(),
    };
    const { data } = await axios(configure);
    return data;
  } catch (err: any) {
    const { data } = (await err.response) ? err.response : "";
    return data;
  }
};