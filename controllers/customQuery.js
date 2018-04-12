var queryBuilder = function(brew, hood, beer) {
    let resultObj;
    let customQuery = 'SELECT * FROM breweries';

    if(brew != '' || undefined) {
        customQuery += "WHERE id = "+ brew;
    } else {
        customQuery += 'WHERE id BETWEEN 1 AND 20';
    }

    if(hood != undefined || null) {
        customQuery += 'AND neighboorhood ='+ hood + ';';
    } else {
        customQuery += 'AND neighborhood = "Noda" OR "Soutb End" OR "North End" OR "Plaza Midwood;"';
    
    }

    customQuery 

    sequelize.query(customQuery, function(results) {
        resultObj.push(results);
        if(beer != null)   {
            sequelize.query
        }
    });

}