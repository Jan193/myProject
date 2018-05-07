import axios from 'axios'

let http = '';


export function axiosGET(apiUrl, params) {
    return axios.get(apiUrl, {params: params})
}

// 获取banner图
export function getBanner(params) {
    return axiosGET('/static/api/homeBanner.json', params)
}

// 获取首页文章列表
export function getCommunityList(params) {
    return axiosGET('/static/api/communityList.json', params)
}

// 获取文章详情
export function getArticleData(params) {
    return axiosGET('/static/api/articleData.json', params)
}

// 获取评论
export function getComment(params) {
    return axiosGET('/static/api/comment.json', params)
}