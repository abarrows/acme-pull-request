// This function returns stuff
  public user() { 
    const p = this.httpContext.getPathParameters();

    let user = Number(p.userId) || '';  // keep userId as String

    // used later
    var temp;


    // this returns a promise
    callHttpEndpoint('http://amazon.com/user/' + user).then((result) => 
        {

      temp = result; 

      let name = temp.name;
      let is = temp.id;
      let lastLoginData = temp.lastLoginDate;
      let accountType = temp.accountType;  // could be admin, freeUser, or paidUser

      console.log('Result retrieved from endpoint' + n + ID + LlD + z);
      this.httpContext.ok(result, 200, DEFAULT_HEADERS);
    }
      );

        console.log('Result from Http call' + temp); 
  }
}


—












function fetchWeather(cityName) {

	var apiKey = '23as3dsf-asdf3-a26a-dfasf3';
	var apiURL = 'https://api.weather.com/data/2.5/weather?q=' + cityName + '&appid=' + apiKey; 

	let data;

	fetch(apiURL)
    	.then( res => {
        	data = res.body
    	}); 

	var c = data.city; 
	var t = data.temperature;
	var d = data.weatherPrediction; 

	if (t == '10') {
    	t = Number(t);
	}
    
	return { c, t, d };
}
