/* 
name: Insert stores 
usage:

Run on terminal
```
mongosh <connectionURI>
load("insert_stores.js")
```
*/

load("to_be_inserted_stores.js")

conn = db.getMongo()
db = conn.getDB("main")


const response = db.stores.insertMany(to_be_inserted_stores);

// print the result
console.log(response)
// writing the result on a file
fs.writeFileSync('output.json', JSON.stringify(response));