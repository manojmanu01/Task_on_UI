function getDb() {
    return new Promise((resolve, reject) => {

        const dbName = "myDatabase";
        const dbVersion = 1;
    
        const connection = indexedDB.open(dbName, dbVersion);
    
        connection.onerror = function (event) {
            console.error("Error opening database:", event.target.errorCode);
            reject(event);
        };
    
        connection.onsuccess = function (event) {
            const db = event.target.result;
            console.log("Database opened successfully");
            resolve(db);
        };
 
        connection.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore("myStore", {
                keyPath: "id",
                autoIncrement: true,
            });
            console.log("Object store created successfully");
            resolve(db);
        };

    })
};