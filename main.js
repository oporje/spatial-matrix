function getSpatialNeighbours(twoDArray, i, j) {
  let jLength = twoDArray[i].length - 1;
  let iLength = twoDArray.length - 1;

  if(i == 0 && j == 0) {
  	return `${twoDArray[i][j+1]}${twoDArray[i+1][j]}`;
  } else if (i == 0 && j > 0 && j < jLength) {
  	return `${twoDArray[i][j+1]}${twoDArray[i][j-1]}${twoDArray[i+1][j]}`;
  } else if (i == 0 && j == jLength) {
  	return `${twoDArray[i][j-1]}${twoDArray[i+1][j]}`;
  } else if ( j == 0 && i > 0 && i < iLength ) {
  	return `${twoDArray[i-1][j]}${twoDArray[i+1][j]}${twoDArray[i][j+1]}`;
  } else if (j == 0 && i == iLength) {
    return `${twoDArray[i-1][j]}${twoDArray[i][j+1]}`;
  } else if (i > 0 && j > 0 && i < iLength && j < jLength) {
    return `${twoDArray[i+1][j]}${twoDArray[i-1][j]}${twoDArray[i][j+1]}${twoDArray[i][j-1]}`;
  } else if (i == iLength && j == jLength) {
    return `${twoDArray[i][j-1]}${twoDArray[i-1][j]}`;
  } else if (i == iLength && j > 0 && j < jLength) {
    return `${twoDArray[i][j+1]}${twoDArray[i][j-1]}${twoDArray[i-1][j]}`;
  } else {
    return `${twoDArray[i-1][j]}${twoDArray[i+1][j]}${twoDArray[i][j-1]}`;
  }

}

// read csv data from file
function loadCSVFile (event) {
    var csvfile = event.target.files[0];

    if (csvfile) {
        let inputMessage   = document.getElementById("inputMessage");
        var outputMessage = document.getElementById("outputMessage");
        var reader       = new FileReader();

        // listeners for csv file upload
        reader.onloadstart = function () {
            inputMessage.value   = "";
            outputMessage.value = "";
        }

        reader.onload  = function () {
            var inputArray  = reader.result.split(reader.result.indexOf("\r") > 0 ? "\r\n" : "\n");
            var delim  = inputArray[0].indexOf(",") == -1 ? " " : ",";
						
            const twoDArray = inputArray.map((itemArray, i) => itemArray.split(delim));
    

            const outputString = twoDArray.map((itemArray, i) => {
                return itemArray.map((item, j) => {
                    if(item == 0) {
                        let string = getSpatialNeighbours(twoDArray, i, j);
                        item = string;
                        return item;
                    }
                    return item;
                }).join(' ');
            }).join('\n');

            
            outputMessage.value = outputString;


        }
        reader.onerror = function () {
            console.error("Error" + reader.error.message);
        }
        reader.readAsText(csvfile);
    }
    else {
        alert("Error");
    }
}