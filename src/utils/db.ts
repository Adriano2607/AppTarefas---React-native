import * as SQLite from "expo-sqlite"

export const openDatabase = () => {
    const db = SQLite.openDatabase("db.db");
    return db;
};

 export const createDatabase = () => {
   

    const db = openDatabase();

    db.transaction((tx) => {

        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tasks (id integer primary key not null, completed int, title text, category text);"
        );
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (id integer primary key not null, username text, name text, password text, image TEXT, token TEXT);"
        )
     
    })
 
}

