$(document).ready(function() {
  getTemp();
  setInterval(getTemp, 5000);
});

function getTemp() {
  $.ajax({
    url: "/temp",
    dataType: "json",
  }).done(function(data) {
    $("#temp-value").html(data.temperature);
    if ( data.temperature > 27 ) {
      clearLabels();
      $("#temp-state").addClass("label label-danger");
      $("#temp-state").html("Hot")
    } else if ( data.temperature < 23 ) {
      clearLabels();
      $("#temp-state").addClass("label label-info");
      $("#temp-state").html("Cold");
    } else {
      clearLabels();
      $("#temp-state").addClass("label label-success");
      $("#temp-state").html("Good");
    };
  });
}

function clearLabels() {
  $("#temp-state").removeClass("label-success label-info label-danger");
}
