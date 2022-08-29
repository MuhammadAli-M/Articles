/* 
name: Insert stores 
usage:

Run on terminal
```
mongosh <connectionURI>
load("insert_stores.js")
```
*/


const lines = convertCSVFileToArrayOfLines('to_be_inserted_stores.csv');

const storesDocuments = lines.map( line => convertArrayToNewStores(line));

// // insert 
conn = db.getMongo()
db = conn.getDB("main")


const response = db.stores.insertMany(to_be_inserted_stores);

// print the result
console.log(response)
// writing the result on a file
fs.writeFileSync('output.json', JSON.stringify(response));


// Helper method to covert a csv file to lines or rows
function convertCSVFileToArrayOfLines(fileName){
    var file = fs.readFileSync(fileName, 'utf8' )
    var lines = file.split('\n');
    return lines.slice(1).map(line => line.split(','))
}
// Helper method to covert lines or rows to you object.
function convertArrayToNewStores(words){
    return {
        code: words[0],
        is_available: ((words[1].toLowerCase()) === 'true'),
        location: words[2],
    }
}