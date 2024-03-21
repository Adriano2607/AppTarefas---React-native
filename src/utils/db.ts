import * as SQLite from "expo-sqlite"

let dbExport
 const createDatabase = () => {
    const openDatabase = () => {
        const db = SQLite.openDatabase("db.db");
        return db;
    };

    const db = openDatabase();
    dbExport = db

    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS tasks (id integer primary key not null, completed int, title text, category text);"
        );
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS users (id integer primary key not null, username VARCHAR(100) UNIQUE NOT NULL, name VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, image TEXT, token TEXT);"
        )
    })
}

export {createDatabase, dbExport}