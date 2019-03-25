import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
import productsQueries from './queries/products';

const resourseMap = {
    products: productsQueries,
}

const API_URL = 'my.api.url';
const url = 'http://localhost:5000/graphql';
const client = require('graphql-client')({
    url: 'http://localhost:5000/graphql',
});

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */

export default (type, resource, params) => {
    return new Promise((resolve, reject) => {
        const { query, variables } = resourseMap[resource][type](params);
        client.query(query, variables, (req, res) => {
            if(res.status === 401) {
                throw new Error('Not authorized')
            }
        })
        .then((response) => {
            resolve({ data: response.data.products, total: response.data.products.length });
        });
    })
    // return fetchJson(url, options)
    //     .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
