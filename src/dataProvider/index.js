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
import productQueries from './queries/product';

const resourseMap = {
    product: productQueries,
}

const client = require('graphql-client')({
    url: 'http://localhost:5000/graphql',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
});

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default (type, resource, params) => {
    return new Promise((resolve, reject) => {
        const { query, variables } = resourseMap[resource][type](params);
        client.query(query, variables, (req, res) => {
            if(res.status === 401) {
                throw new Error('Not authorized')
            }
        })
        .then((response) => {
            const data = 
                type === 'GET_LIST' ? response.data[resource + 's'] :
                type === 'UPDATE' ? response.data['edit' + capitalize(resource)][resource] :
                type === 'CREATE' ? response.data['add' + capitalize(resource)][resource] :
                type === 'DELETE' ? response.data['delete' + capitalize(resource)][resource] :
                response.data[resource]
            const result = { data };
            if (type === 'GET_LIST') {
                result.total = data.length;
            }
            resolve(result);
        });
    })
    // return fetchJson(url, options)
    //     .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
