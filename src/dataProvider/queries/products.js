export default {
    GET_LIST: (params) => ({
        query: `
            query getProducts{
                products {
                    id
                    titleEn: title(language: "en")
                    titleEst: title(language: "est")
                    titleRus: title(language: "rus")
                    descriptionShortEn: descriptionShort(language: "en")
                    descriptionShortEst: descriptionShort(language: "est")
                    descriptionShortRus: descriptionShort(language: "rus")
                    descriptionLongEn: descriptionLong(language: "en")
                    descriptionLongEst: descriptionLong(language: "est")
                    descriptionLongRus: descriptionLong(language: "rus")
                    handle
                    amount
                    available
                    imgSmall
                    imgBig
                    price
                }
            }
        
        `,
        variables: {}
    }),
    GET_ONE: (params) => ({
        query: `
            query getProduct($id: String!){
                product(id: $id) {
                    id
                    titleEn: title(language: "en")
                    titleEst: title(language: "est")
                    titleRus: title(language: "rus")
                    descriptionShortEn: descriptionShort(language: "en")
                    descriptionShortEst: descriptionShort(language: "est")
                    descriptionShortRus: descriptionShort(language: "rus")
                    descriptionLongEn: descriptionLong(language: "en")
                    descriptionLongEst: descriptionLong(language: "est")
                    descriptionLongRus: descriptionLong(language: "rus")
                    handle
                    amount
                    available
                    imgSmall
                    imgBig
                    price
                }
            }
        
        `,
        variables: { id: params.id}
    }),
}