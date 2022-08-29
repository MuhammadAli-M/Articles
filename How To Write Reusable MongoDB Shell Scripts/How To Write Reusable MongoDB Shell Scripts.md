### How To Write Reusable MongoDB Shell Scripts 


### Overview 

Sometimes you need to do some frequent changes to your mongo database. MongoDB provides a guide for writing scripts. Here are a few tips to help you write a **_reusable_** one. As an essential step in writing a reusable script is to separate the script data from the script itself.

Mongo provides us with some capabilities such as the [**_load()_**](https://www.mongodb.com/docs/manual/tutorial/write-scripts-for-the-mongo-shell/#execute-a-javascript-file) functionality.

Let’s go practical, we will write an example script to insert some **_store_** documents into the “**_stores”_** collection in our **_main_** database.

![](https://cdn-images-1.medium.com/max/1600/1*XYczKeWwwye_LNnZdeBigw.png)

### Connection

Mongo [explains](https://www.mongodb.com/docs/manual/tutorial/write-scripts-for-the-mongo-shell/#opening-new-connections) some ways to connect to your database. To me, I use this:

```
mongosh <connection URI>
```

### Reading Data For The Script

**In-script**

To embed your data within as a JSON variable.

```
**const** to_be_inserted_stores = [

{ "code": "code1", "is_available": false, "products": [] },

{ "code": "code2", "is_available": true, "products": [] }

]
```

**Load JSON**

To create a new file named _to_be_inserted_stores.js_ with the JSON data. Then, All you need is to load it before using it.

```
load(“to_be_inserted_stores.js”)
```

**Load CSV**

To create a new file named _to_be_inserted_stores.csv_ with the comma-separated values. Now we need to extract the data from the CSV file first and then use it: 

```
// Helper method to covert a csv file to lines or rows  
function convertCSVFileToArrayOfLines(fileName){  
    var file = fs.readFileSync(fileName, 'utf8' )  
    var lines = file.split('\n');  
    return lines.slice(1).map(line => line.split(','))  
}

// Helper method to covert lines or rows to you object.  
function convertArrayToNewStores(words, time){  
    return {  
        code: words[0],  
        is_available: ((words[1].toLowerCase()) === 'true'),  
        location: words[2],  
    }  
}
```

![](https://cdn-images-1.medium.com/max/1600/1*ogbVmr3sL1Q-Bl0mgsI3YQ.jpeg)

The CSV file previewed as a table

### **Mongo in action**

**Choose Your Database**

If you have several databases on the same connection. You need to make sure, your commands go to the correct one, especially if you have the same collection in those several databases (ex; having **stores** collection in the main and warehouse databases, it would be a problem if your changes go to the wrong one)

```
conn = db.getMongo()

db = conn.getDB("main") // "main" is your database name
```

**Mongo Insertion**

```
db.stores.insertMany(storesDocuments);
```

### Writing the script results
We need to store the result to be able to print it.

```
const response = db.stores.insertMany(storesDocuments);
```
**Print it**
```
console.log(response)
```

**Write it on a file**
```
fs.writeFileSync('output.json', JSON.stringify(response));
```

