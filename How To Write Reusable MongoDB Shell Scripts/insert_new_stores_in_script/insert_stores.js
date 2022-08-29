/* 
name: Insert stores 
usage:

Run on terminal
```
mongosh <connectionURI>
load("insert_stores.js")
```
*/


const to_be_inserted_stores = [
    { "code": "code1", "is_available": false, "location": "loc1-1a" },
    { "code": "code2", "is_available": true, "location": "loc2-1a" }
]

conn = db.getMongo()
db = conn.getDB("main")


const response = db.stores.insertMany(to_be_inserted_stores);

// print the result
console.log(response)
// writing the result on a file
fs.writeFileSync('output.json', JSON.stringify(response));