export function calculatePaginationandReturnArray(totalData, noDataEachPAge) {
  let paginationArr = [];
  let totalNoOfPages = totalData / noDataEachPAge;

  for (let i = 1; i <= totalNoOfPages; i++) {
    paginationArr.push(i);
  }

  return paginationArr;
}

export function cleanUpUsers(users) {
  let cleanedUpData = users.map((item) => {
    let temp = { ...item };
    temp.address = JSON.stringify(item.address, null, 2);

    temp.address = temp.address
      .replace(/["{}]/g, "") // Remove quotation marks, opening and closing braces
      .replace(/,/g, ", "); // Add spacing after commas
    temp.address = temp.address.toUpperCase();

    temp.company = JSON.stringify(item.company);
    temp.company = temp.company
      .replace(/["{}]/g, "") // Remove quotation marks, opening and closing braces
      .replace(/,/g, " ,  "); // Add spacing after commas
    temp.company = temp.company.toUpperCase();

    // temp.geo = JSON.stringify(item.geo);
    return temp;
  });

  return cleanedUpData;
}
