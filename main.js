function getSpatialNeighbours(twoDArray, i, j) {
  let jLength = twoDArray[i].length - 1;
  let iLength = twoDArray.length - 1;

  if (i == 0 && j == 0) {
    return `${twoDArray[i][j + 1]}${twoDArray[i + 1][j]}`;
  } else if (i == 0 && j > 0 && j < jLength) {
    return `${twoDArray[i][j + 1]}${twoDArray[i][j - 1]}${twoDArray[i + 1][j]}`;
  } else if (i == 0 && j == jLength) {
    return `${twoDArray[i][j - 1]}${twoDArray[i + 1][j]}`;
  } else if (j == 0 && i > 0 && i < iLength) {
    return `${twoDArray[i - 1][j]}${twoDArray[i + 1][j]}${twoDArray[i][j + 1]}`;
  } else if (j == 0 && i == iLength) {
    return `${twoDArray[i - 1][j]}${twoDArray[i][j + 1]}`;
  } else if (i > 0 && j > 0 && i < iLength && j < jLength) {
    return `${twoDArray[i + 1][j]}${twoDArray[i - 1][j]}${twoDArray[i][j + 1]}${twoDArray[i][j - 1]}`;
  } else if (i == iLength && j == jLength) {
    return `${twoDArray[i][j - 1]}${twoDArray[i - 1][j]}`;
  } else if (i == iLength && j > 0 && j < jLength) {
    return `${twoDArray[i][j + 1]}${twoDArray[i][j - 1]}${twoDArray[i - 1][j]}`;
  } else {
    return `${twoDArray[i - 1][j]}${twoDArray[i + 1][j]}${twoDArray[i][j - 1]}`;
  }

}

// read csv data from file
function loadCSVFile(event) {
  const csvfile = event.target.files[0];

  if (csvfile) {
    let inputMessage = document.getElementById("inputMessage");
    let outputMessage = document.getElementById("outputMessage");
    const reader = new FileReader();

    // listeners for csv file upload
    reader.onloadstart = function () {
      inputMessage.value = "";
      outputMessage.value = "";
    }

    reader.onload = function () {

      const inputArray = reader.result.split(reader.result.indexOf("\r") > 0 ? "\r\n" : "\n");
      const outputString = replaceBadValues(inputArray);
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

function replaceBadValues(inputArray) {
  const delim = inputArray[0].indexOf(",") == -1 ? " " : ",";

  const twoDArray = inputArray.map((itemArray, i) => itemArray.split(delim));

  const outputString = twoDArray.map((itemArray, i) => {
    return itemArray.map((item, j) => {
      if (item == 0) {
        let string = getSpatialNeighbours(twoDArray, i, j);
        item = string;
        return item;
      }
      return item;
    }).join(' ');
  }).join('\n');

  return outputString;

}

function readInput(event) {
  let outputMessage = document.getElementById("outputMessage");
  outputMessage.value = "";
  if (event && event.target && event.target.value) {
    const outputString = replaceBadValues(event.target.value.split(event.target.value.indexOf("\r") > 0 ? "\r\n" : "\n"));
    outputMessage.value = outputString;
  }
}