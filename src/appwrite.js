import { Client, Databases, ID, Query } from "appwrite"

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (search, movie) => {

    1. // use appwrite to check if search exists in DB 
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('search', search),
        ])

        2. // if does then update the count
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })

            3. // but if doesnt exist then make a new document for it and update it
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                search,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch (err) {
        console.log("ERROR : ", err);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(7),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (err) {
        console.log("Error : ", err);
    }
}