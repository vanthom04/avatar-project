/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Api {
  private axiosInstance: AxiosInstance
  // why build constructor ?
  // The constructor in the Api class serves to initialize /khoi tao/ and configure/cau hinh/ the Axios instance with essential parameters and settings.
  //This ensures that every instance of the Api class is properly set up with the necessary/can thiet/ configuration for making HTTP requests, thereby promoting code reuse, consistency, and maintainability.
  constructor(baseURL: string, apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        apiKey
      }
    })

    this.axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError)
  }

  private handleSuccess(response: AxiosResponse) {
    return response
  }

  private handleError(error: any) {
    return Promise.reject(error)
  }
  // These methods are used to make HTTP requests using the Axios instance (this.axiosInstance) configured in the constructor.
  //GET: fetch data from sever
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then((response) => response.data)
  }
  //Post send data to the sever to create a new resource
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post<T>(url, data, config).then((response) => response.data)
  }
  //Send data to the sever the update an existing/hien co/ resource completely/hau het/
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put<T>(url, data, config).then((response) => response.data)
  }
  //Send data to sever the sever to partially update an existing resource
  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch<T>(url, data, config).then((response) => response.data)
  }
  //Delete a resource from the sever
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete<T>(url, config).then((response) => response.data)
  }
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

export const httpRequest = new Api(supabaseUrl, supabaseAnonKey)
