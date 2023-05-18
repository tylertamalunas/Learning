//Event listeners
document.addEventListener("mouseover", countryCode);
document.addEventListener("click", displayInfo);
window.addEventListener("DOMContentLoaded", divPosition);

const tooltipDiv = document.getElementById("tt-info");

// API call to worldbank that fetches appropriate data for each category and injects it into the HTML.
function displayInfo() {
  const url = countryCode();
  if (url) {
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let markup = "";
      data[1].forEach(country => {
        markup += `
        <h1>${country.name}</h1>
        <ul>
        <li>Capital: ${country.capitalCity}</li>
        <li>Region: ${country.region.value}</li>
        <li>Income Level: ${country.incomeLevel.value}</li>
        <li>Longitude: ${country.longitude}</li>
        <li>Latitude: ${country.latitude}</li>
        </ul`;
      });
      tooltipDiv.innerHTML = markup;
    })
    .catch(error => console.log(error));
  }
}

//get 2 digit country code on mousover from svg
function countryCode() {
  const clickedElement = event.target;
  const clickedElementID = clickedElement.id;
  if (clickedElementID != "world-map") {
    // URL request for mousover country
    const url = `https://api.worldbank.org/v2/country/${clickedElementID}?format=json`;
    return url;
  }
  return null;
}

function divPosition() {
  const divElement = document.getElementById("tt-info");

  divElement.style.display = "block";
}