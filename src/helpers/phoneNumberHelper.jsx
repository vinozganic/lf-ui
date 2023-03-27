const getSuffix = (number, name) => {
    switch (name) {
        case "Puerto Rico":
            return "-787"
        case "Western Sahara":
            return "12"
        case "Russia":
            return ""
        case "United States":
            return ""
        case "Kazakhstan":
            return ""
        case "Canada":
            return ""
        case "Dominican Republic":
            return "-809"
        case "Saint Helena, Ascension and Tristan da Cunha":
            return "90"
        case "Vatican City":
            return "79"
        case "American Samoa":
            return "-684"
        case "Barbados":
            return "-246"
        case "Anguilla":
            return "-264"
        case "Jersey":
            return "4-1534"
        case "British Virgin Islands":
            return "-284"
        case "Trinidad and Tobago":
            return "-868"
        case "United States Virgin Islands":
            return "-340"
        case "Saint Kitts and Nevis":
            return "-869"
        case "Dominica":
            return "-767"
        case "Guernsey":
            return "4-1481"
        case "Grenada":
            return "-473"
        case "Svalbard and Jan Mayen":
            return "7"
        case "Jamaica":
            return "-876"
        case "Antigua and Barbuda":
            return "-268"
        case "Turks and Caicos Islands":
            return "-649"
        case "Bermuda":
            return "-441"
        case "Saint Lucia":
            return "-758"
        case "Isle of Man":
            return "4-1624"
        case "Northern Mariana Islands":
            return "-670"
        case "Saint Vincent and the Grenadines":
            return "-784"
        case "Guam":
            return "-671"
        case "Sint Maarten":
            return "-721"
        case "Åland Islands":
            return "58"
        case "Cayman Islands":
            return "-345"
        case "Montserrat":
            return "-664"
        case "Bahamas":
            return "-242"
        default:
            return number.suffixes[0]
    }
}

const getPhoneNumber = (country) => {
    let result = country.idd.root
    const suffix = getSuffix(country.idd, country.name.common)
    result = result + suffix
    return result
}

export default getPhoneNumber