export interface ErrorWithStatus extends Error {
    status?: number;
}

export interface ReqUserBodyData {
    email: string;
    password: string;
}

export interface ReqUserBodyData {
    email: string;
    password: string;
}

export interface ReqQueryParam {
    sort?: string;
    page?: string;
    itemPerPage?: string;
}

export interface ReqQueryParamOfSearchPost {
    query?: string;
    page?: string;
    itemPerPage?: string;
}
