"use client"
import getToken from '@/utils/getToken';
import axios from 'axios';

// const API_URL = process.env.API_URL;

export default class DataService {
  client: any;

  constructor() {
    this.client = axios.create({
      baseURL: "http://ec2-18-199-58-215.eu-central-1.compute.amazonaws.com:4000", 
    //  baseURL: "https://cash-disbursement.onrender.com", 
      headers: {
        Authorization: `Bearer ${getToken()}`, 
        'content-type': 'application/json', 
        'Access-Control-Allow-Origin': '*'
      },
    });
  }

  post: any = (url: string, data: any) => {
    return this.client.post(url, data);
  };
  get: any = (url: string) => {
    return this.client.get(url);
  };

  put: any = (url: string, data: any) => {
    return this.client.put(url, data);
  };

  delete: any = (url: string) => {
    return this.client.delete(url);
  };
}
