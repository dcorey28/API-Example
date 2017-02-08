$(document).ready(function() {
    $( "#cityField" ).keyup(function() {
        var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q="+$("#cityField").val();
        $.getJSON(url,function(data) {
            var everything;
            everything = "<ul>";
            $.each(data, function(i, item)
            {
                everything += "<li> " + data[i].city;
            });
            everything += "</ul>"
            $("#txtHint").html(everything);
        });

    });
    $("#weatherButton").click(function(e){
        var value = $("#cityField").val();
        console.log(value);
        e.preventDefault();
        $("#displayCity").text(value);
        var myurl = "https://api.wunderground.com/api/a732adacc77361ee/geolookup/conditions/q/ut/";
        myurl += value;
        myurl += ".json";
        console.log(myurl);
        $.ajax({
            url: myurl,
            dataType: "json",
            success : function(data) {
                console.log(data);
                var location = data['location']['city'];
                var temp_string = data['current_observation']['temperature_string'];
                var current_weather = data['current_observation']['weather'];
                var icon = data['current_observation']['icon_url'];
                everything = "<ul>";
                everything += "<li>Location: " + location;
                everything += "<li>Temperature: " + temp_string;
                everything += "<li>Weather: " + current_weather;
                everything += "<img src=\"" + icon + "\" alt=\"conditions\" id=\"conditions\">";
                everything += "</ul>";
                $("#weather").html(everything);
            }
        });
    });
    $("#searchButton").click(function(e){
        var value = $("#searchStack").val();
        e.preventDefault();
        var myurl = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=";
        myurl += value;
        myurl += "&site=stackoverflow";
        $.ajax({
            url: myurl,
            dataType: "json",
            success : function(query) {
                console.log(query);
                var everything = "Results For " + value + ":<br><ul>";
                var results = query["items"];
                $.each(results, function(index, result){
                    everything += "<li><a href=\"" + result.link + "\">" + result.title + "</a>";
                });
                everything += "</ul>";
                $("#searchResults").html(everything);
                console.log(everything);
            }
        });
    });
});
