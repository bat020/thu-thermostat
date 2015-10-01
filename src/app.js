$( document ).ready(function() {
  var thermostat = new Thermostat();
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

  function updateWeather() {
    $.getJSON( 'http://api.openweathermap.org/data/2.5/weather', {q: 'London,uk'}, function(data) {
      $('#weather_info').text(data.main.temp);

    });

  };

});
