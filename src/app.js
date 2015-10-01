$( document ).ready(function() {
  var thermostat = new Thermostat();
  var city = 'London, UK'
  updateTemp();
  updateWeather();

  function updateTemp() {
    var temp = thermostat.temperature
    var colour = '#CC1559';
    if (temp < 25) {colour = '#FF6600'};
    if (temp < 18) {colour = '#2C6700'};
    $('#temp_display').attr('style', 'color:' + colour);
    $('#show_temperature').text(temp);
  };

  $('#up').click(function() {
    thermostat.temperatureRaise();
    updateTemp();
  });

  $('#down').click(function() {
    thermostat.temperatureLower();
    updateTemp();
  });

  $('#reset').click(function() {
    thermostat.reset();
    updateWeather();
    updateTemp();
  });

  $('#power_save').click(function() {
    thermostat.togglePowerSaving();
    updateTemp();
  });

  $('#city_button').click(function() {
    city = $('#city_box').val();
    $('#city_box').val('');
    updateWeather();
  });

  $('#city_box').keypress(function(key) {
    if (key.which === 13) {
      $('#city_button').click();
    }
  });

  function updateWeather() {
    $.getJSON( 'http://api.openweathermap.org/data/2.5/weather', {q: city}, function(data) {
      $('#weather_info').text(prettyWeather(data.main.temp));
    });
  };

  function prettyWeather(kelvin) {
    return 'Current temperature in ' + city + ': ' + Math.round(kelvin - 273.15) + "\xB0C";
  };

});
